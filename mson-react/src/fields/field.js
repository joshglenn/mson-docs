import React from 'react';
import componentUtils from '../component-utils';
import attach from '../attach';
import FlexBreak from '../flex-break';
import utils from '../utils';

// Use MSON React Component instead?
class Field extends React.PureComponent {
  render() {
    const {
      component, // QUESTION: Where does the component prop come from? ANSWER: I think it comes from https://github.com/redgeoff/mson-react/blob/f0f6aef795188ecf4516a8dc31ef1de6065dbd76/src/component.js#L10
      hidden,
      block,
      accessEditable,
      didCreate,
      noBlock,
      disabled
    } = this.props;

    // Don't show the component until didCreate is true as we may need to wait for fields to be
    // hidden or otherwise modified by listeners
    if (hidden || !didCreate) {
      return null;
    } else if (component.getClassName() === 'Field') {
      // Prevent an infinite loop caused by trying to render component=Field
      return null;
    } else {
      // Get corresponding UI component
      const Field = componentUtils.getUIComponent(component); //TODO-JG: Document how this code ties mson and mson-react together

      // Note: we use React.Fragment over a span as spans can cause issues with the flexbox layout
      // when displaying a nested form
      return (
        <React.Fragment>
          <Field
            component={component}
            accessEditable={accessEditable}
            block={block}
            {...utils.getIfDefined({ disabled })}
          />
          {!noBlock && block ? <FlexBreak /> : null}
        </React.Fragment>
      );
    }
  }
}

export default attach(['hidden', 'block', 'didCreate'])(Field);
