// TODO:
//   - On mobile when using search bar, display title and search icon. When user clicks icon then
//     hides title and allows for search string to be entered.

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from './icon';
import Menu from './menu';
import SearchBar from './search-bar';
import { Switch, Route } from 'react-router-dom';
import Component from './component';
// import compiler from 'mson/lib/compiler';
import { withRouter } from 'react-router';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import attach from './attach';
import globals from 'mson/lib/globals';
import Snackbar from './snackbar';
import ConfirmationDialog from './confirmation-dialog';
import MUISwitch from '@material-ui/core/Switch';
// import UserMenu from './user-menu';
import Action from 'mson/lib/actions/action';
import CollectionField from 'mson/lib/fields/collection-field';
import Form from 'mson/lib/form';
import access from 'mson/lib/access';
import registrar from 'mson/lib/compiler/registrar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    // height: 430,
    // marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth
  },
  appBarResponsive: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    padding: '0px', // padding
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    },

    // Disable Chrome's Scroll Anchoring as it causes problems with inifinite scrolling when
    // scrolling up. Specifically, the scroll location is locked after items are prepended to the
    // top of the list before the spacer is resized.
    overflowAnchor: 'none'
  },
  contentResponsive: {
    // Also needed to extend menu vertically
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth
    }
  },
  alignRight: {
    marginLeft: 'auto' // right align
  }
});

// TODO: break up into components for header, menu, body, etc...
class App extends React.PureComponent {
  state = {
    mobileOpen: false,
    menuItem: null,
    snackbarOpen: false,
    snackbarMessage: '',
    confirmationOpen: false,
    nextMenuItem: null,
    showArchivedToggle: false,

    // Note: we need both searchStringInput and globals.searchString as searchStringInput is the
    // controlled value for the text input and globals.searchString is the actual string with which
    // we are searching. These values not the same as we expect the user to submit the search before
    // it is performed so that we don't search on every keystroke. FUTURE: wait a little bit after
    // characters have been entered and then automatically search.
    searchStringInput: '',
    showSearch: false,

    showSearchOnMobile: false

    // isLoggedIn: false
  };

  form = null;

  path = null;

  constructor(props) {
    super(props);
    this.setGlobalOnNavigate();
  }

  onNavigate = callback => {
    // We don't warn about discarding changes when fullScreen, e.g. a login page
    const menuItem = this.state.menuItem;
    if (
      menuItem &&
      menuItem.content.has('dirty') &&
      menuItem.content.get('dirty') &&
      !menuItem.fullScreen
    ) {
      // Show a confirmation dialog to see if the user wants to continue
      globals.displayConfirmation({
        title: 'Discard changes?',
        callback
      });
    } else {
      // Nothing is dirty so allow the navigation to continue
      callback(true);
    }
  };

  setGlobalOnNavigate() {
    globals.setOnNavigate(this.onNavigate);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  redirect(path) {
    const { history } = this.props;

    // Clear the redirectPath so that back-to-back redirects to the same route are considered
    // unique, e.g. if / routes to /somepage and then the user hits back.
    globals.set({ redirectPath: null });

    history.push(path);
  }

  navigateTo(path) {
    const { menuItem } = this.state;
    const { component } = this.props;
    const menu = component.get('menu');

    // if (path === '/home') {
    //   // Redirect so that user sees the actual path and not /home
    //   history.push(menu.getFirstItem().path);
    // } else
    if (!menuItem || path !== menuItem.path) {
      // if (this.requireAccess(menu.get('roles'))) {
      // The route is changing
      const item = menu.getItemAndParsePath(path);
      return this.switchContent(item.item, item.params);
      // }
    }
  }

  handleNavigate = async (menuItem, force) => {
    // Is the next item just an action?
    if (menuItem.content instanceof Action) {
      // Execute the actions
      await menuItem.content.run();
    } else {
      this.props.history.push(menuItem.path);
    }
  };

  handleConfirmationClose = async yes => {
    const { confirmation } = this.props;
    if (confirmation.callback && yes) {
      // Allow/prohibit the route change
      confirmation.callback(yes);
    }
    this.setState({ confirmationOpen: false });
  };

  //TODO: Update this for the custom CollectionFields
  canArchive() {
    let canArchive = false;
    let canSearch = false;
    if (this.component && this.component instanceof Form) {
      for (const field of this.component.getFields()) {
        if (field instanceof CollectionField) {
          canArchive =
            !field.get('forbidViewArchived') &&
            access.canArchive(field.get('form'));
          canSearch = !field.get('forbidSearch');
        }
      }
    }
    return {
      canArchive,
      canSearch
    };
  }

  emitLoggedOut() {
    globals.set({ redirectAfterLogin: this.props.location.pathname });
    this.props.component.emitLoggedOut();
  }

  requireAccess(roles) {
    const canAccess =
      !roles || (registrar.client && registrar.client.user.hasRole(roles));
    if (!canAccess) {
      this.emitLoggedOut();
    }
    return canAccess;
  }

  switchContent = async (menuItem, parameters) => {
    // Prevent inifinite recursion when menuItem is null by making sure that the menuItem is
    // changing before changing anything, especially the state
    if (menuItem !== this.state.menuItem) {
      if (this.component) {
        // Emit an unload event so that the component can unload any data, etc...
        this.component.emitUnload();
      }

      // Note: menuItem can be null if there is no content on the landing page
      const isAction = menuItem && menuItem.content instanceof Action;

      // Note: menuItem.content can be an action if the user goes directly to a route where the
      // content is an action
      if (menuItem && menuItem.content) {
        const { location, component } = this.props;
        const menu = component.get('menu');
        globals.set({
          route: menu.toRoute({
            parameters,
            queryString: location.search.substr(1),
            hash: location.hash.substr(1)
          })
        });

        const parentItem = menu.getParent(menuItem.path);
        if (
          this.requireAccess(menuItem.roles) &&
          (!parentItem || this.requireAccess(parentItem.roles))
        ) {
          if (isAction) {
            // Execute the actions
            await menuItem.content.run();
          } else {
            // Instantiate form
            // this.component = compiler.newComponent(menuItem.content.component);
            this.component = menuItem.content;

            // Emit a load event so that the component can load any initial data, etc...
            this.component.emitLoad();

            const { canArchive, canSearch } = this.canArchive();

            globals.set({ searchString: null });

            // Set showArchived to false whenever we change the route
            this.setState({
              menuItem,
              showArchived: false,
              showArchivedToggle: canArchive,
              searchStringInput: '',
              showSearch: canSearch
            });
          }
        }
      } else {
        this.component = null;
      }
    }
  };

  onLocation = location => {
    globals.set({ path: location.pathname });
    globals.set({ queryString: location.search }); // this may be the place to add queryString parameters
  };

  // TODO: move logic to componentDidUpdate
  componentWillUpdate(props) {
    const snackbarMessage = globals.get('snackbarMessage');
    if (snackbarMessage) {
      this.displaySnackbar(snackbarMessage);
      globals.set({ snackbarMessage: null });
    }

    if (globals.get('queryString')) {
      console.log(globals.get('queryString'));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.redirectPath &&
      this.props.redirectPath !== prevProps.redirectPath
    ) {
      this.redirect(this.props.redirectPath);
    }

    if (this.props.path !== prevProps.path) {
      this.navigateTo(this.props.path);
    }

    if (this.props.confirmation !== prevProps.confirmation) {
      // Show the popup if any of the confirmation info has changed
      this.setState({ confirmationOpen: true });
    }

    if (this.props.searchString !== prevProps.searchString) {
      // Pass search string down to current component
      const menuItem = this.state.menuItem;
      if (menuItem && menuItem.content.has('searchString')) {
        menuItem.content.set({
          searchString: this.props.searchString
        });
      }
    }
  }

  componentDidMount() {
    // TODO: is this too inefficient in that it cascades a lot of unecessary events? Instead, could:
    // 1. move more logic to app layer so that only cascade when need new window 2. use something
    // like a global scroll listener that the component can use when it is active
    window.addEventListener('scroll', e => {
      if (this.state.menuItem) {
        this.state.menuItem.content.emit('scroll', e);
      }
    });

    // Handle immediate redirects, e.g. if user is not logged in
    if (this.props.redirectPath) {
      this.redirect(this.props.redirectPath);
    }
  }

  componentWillMount() {
    // Allows us to listen to back and forward button clicks
    this.unlisten = this.props.history.listen(this.onLocation);

    Promise.resolve()
      .then(() => {
        if (registrar.client) {
          // Wait for the session to load before loading the initial component so that we can do things
          // like route based on a user's role
          registrar.client.user.awaitSession();
        }
      })
      .then(() => {
        // Load the correct component based on the initial path
        this.onLocation(this.props.location);
      });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  displaySnackbar(message) {
    this.setState({ snackbarOpen: true, snackbarMessage: message });
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleArchivedChange = event => {
    this.setState({ showArchived: event.target.checked });

    const { menuItem } = this.state;

    if (menuItem) {
      menuItem.content.set({ showArchived: event.target.checked });

      // Scroll to the top of the page as otherwise it is confusing to the user as to why they are
      // dumped in some random place within the newly queried data.
      window.scrollTo({
        top: 0
      });
    }
  };

  handleSearchStringInputChange = searchStringInput => {
    this.setState({
      searchStringInput
    });
  };

  handleSearch = searchStringInput => {
    this.setState(
      {
        searchStringInput
      },
      () => {
        globals.set({
          searchString: searchStringInput ? searchStringInput : null
        });
      }
    );
  };

  archivedToggle() {
    const { showArchived, showArchivedToggle } = this.state;

    // A component must not switch from controlled to uncontrolled so we need to avoid setting
    // checked=undefined
    const showArchivedChecked = showArchived ? true : false;

    let archivedToggle = null;
    if (showArchivedToggle) {
      archivedToggle = (
        <Tooltip title={showArchived ? 'Show Active' : 'Show Deleted'}>
          <MUISwitch
            onChange={this.handleArchivedChange}
            checked={showArchivedChecked}
          />
        </Tooltip>
      );
    }

    return archivedToggle;
  }

  searchBox(fullWidth) {
    const { classes } = this.props;
    const { searchStringInput, showSearch } = this.state;

    let searchBox = null;
    if (showSearch) {
      searchBox = (
        <SearchBar
          fullWidth={fullWidth}
          className={classes.alignRight}
          searchString={searchStringInput}
          onChange={this.handleSearchStringInputChange}
          onSearch={this.handleSearch}
        />
      );
    }
    return searchBox;
  }

  toggleShowSearch = () => {
    this.setState({ showSearchOnMobile: !this.state.showSearchOnMobile });
  };

  menuButton() {
    const { classes } = this.props;
    const responsive = this.isResponsive();
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.handleDrawerToggle}
        className={responsive ? classes.navIconHide : ''}
      >
        <Icon icon="Menu" />
      </IconButton>
    );
  }

  title() {
    const { menuItem } = this.state;
    return (
      <Typography variant="h6" color="inherit" noWrap>
        {menuItem ? menuItem.label : ''}
      </Typography>
    );
  }

  appBar() {
    const { classes, width } = this.props;
    const { showSearchOnMobile } = this.state;

    const onMobile = isWidthDown('sm', width);
    const responsive = this.isResponsive();

    let bar = null;

    if (onMobile) {
      if (showSearchOnMobile) {
        bar = (
          <React.Fragment>
            <IconButton
              color="inherit"
              aria-label="close search"
              onClick={this.toggleShowSearch}
            >
              <Icon icon="ArrowBack" />
            </IconButton>
            {this.searchBox(true)}
          </React.Fragment>
        );
      } else {
        bar = (
          <React.Fragment>
            {this.menuButton()}
            {this.title()}
            {this.archivedToggle()}
            <IconButton
              color="inherit"
              aria-label="toggle search"
              onClick={this.toggleShowSearch}
              className={classes.alignRight}
            >
              <Icon icon="Search" />
            </IconButton>
          </React.Fragment>
        );
      }
    } else {
      bar = (
        <React.Fragment>
          {this.menuButton()}
          {this.title()}
          {this.archivedToggle()}
          {this.searchBox()}
        </React.Fragment>
      );
    }

    return (
      <AppBar
        elevation={1} // tone down the elevation
        className={
          classes.appBar + (responsive ? ` ${classes.appBarResponsive}` : '')
        }
      >
        <Toolbar>{bar}</Toolbar>
      </AppBar>
    );
  }

  isResponsive() {
    return !this.props.menuAlwaysTemporary;
  }

  render() {
    const { classes, component, confirmation } = this.props;
    const {
      mobileOpen,
      menuItem,
      snackbarOpen,
      snackbarMessage,
      confirmationOpen
    } = this.state;

    const responsive = this.isResponsive();

    const menu = component.get('menu');

    // Use the path from the location prop as this.state.path may not be up to date
    const path = this.props.location.pathname;

    const comp = this.component ? (
      <Component component={this.component} />
    ) : null;

    const appBar = this.appBar();

    const menuSidebar = (
      <Menu
        component={menu}
        onDrawerToggle={this.handleDrawerToggle}
        mobileOpen={mobileOpen}
        onNavigate={this.handleNavigate}
        path={path}
        responsive={responsive}
      />
    );

    let fullScreenStyle = null;
    if (menuItem && menuItem.fullScreen) {
      fullScreenStyle = {
        marginLeft: 0,
        marginTop: 0
      };
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {menuItem && menuItem.fullScreen ? null : appBar}
          {menuItem && menuItem.fullScreen ? null : menuSidebar}
          <main
            className={
              classes.content +
              (responsive ? ` ${classes.contentResponsive}` : '')
            }
            style={fullScreenStyle}
          >
            <Switch>
              {/* Omitting path so that all paths are matched */}
              <Route />
            </Switch>

            {comp}

            <Snackbar
              open={snackbarOpen}
              message={snackbarMessage}
              onClose={this.handleSnackbarClose}
            />
            <ConfirmationDialog
              open={confirmationOpen}
              onClose={this.handleConfirmationClose}
              title={confirmation ? confirmation.title : null}
              text={confirmation ? confirmation.text : null}
              alert={confirmation ? confirmation.alert : null}
            />
          </main>
        </div>
      </div>
    );
  }
}

App = withStyles(styles, { withTheme: true })(App);
App = withWidth()(App);
App = withRouter(App);
App = attach(['menuAlwaysTemporary'])(App);
App = attach(
  ['path', 'redirectPath', 'snackbarMessage', 'confirmation', 'searchString'],
  globals
)(App);
export default App;
