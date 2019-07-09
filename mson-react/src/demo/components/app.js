export default {
  name: 'app.App',
  component: 'App',
  // menuAlwaysTemporary: true,
  //basename: '/mson-react', // Root of site is https://redgeoff.github.io/mson-react
  basename: '/',
  menu: {
    component: 'Menu',
    items: [
      {
        path: '/',
        label: 'Home',
        content: {
          component: 'app.Home'
        }
      },
      {
        path: '/fields',
        label: 'Fields',
        content: {
          component: 'app.FieldsScreen'
        }
      },
      {
        path: '/translations',
        label: 'Translations',
        content: {
          component: 'app.Translations'
        }
      },
      {
        path: '/dictionary',
        label: 'Dictionary',
        content: {
          component: 'app.DictionaryEntries'
        }
      },
      {
        path: '/contacts',
        label: 'Contacts',
        items: [
          {
            path: '/contacts',
            label: 'Contacts LocalStorage',
            content: {
              component: 'app.ContactsLocalStorage'
            }
          },
          {
            path: '/contacts-firebase',
            label: 'Contacts Firebase',
            content: {
              component: 'app.ContactsFirebase'
            }
          },
          {
            path: '/contacts-pouch',
            label: 'Contacts Pouch',
            content: {
              component: 'app.ContactsPouchDBStorage'
            }
          }
        ]
      },
      {
        path: '/tasks',
        label: 'Tasks',
        items: [
          {
            path: '/tasks',
            label: 'Tasks LocalStorage',
            content: {
              component: 'app.TasksLocalStorage'
            }
          },
          {
            path: '/tasks-firebase',
            label: 'Tasks Firebase',
            content: {
              component: 'app.TasksFirebase'
            }
          }
        ]
      },
      {
        path: '/form-builder',
        label: 'Form Builder',
        content: {
          component: 'app.FormBuilder'
        }
      },
      {
        path: '/contact/edit',
        label: 'Edit Contact',
        content: {
          component: 'app.EditContact'
        }
      },
      {
        path: '/contact-no-mson',
        label: 'Contact No MSON',
        content: {
          component: 'app.ContactNoMSON'
        }
      },
      {
        path: '/grid',
        label: 'Grid',
        content: {
          component: 'app.Grid'
        }
      },
      {
        path: '/login',
        label: 'Login',
        content: {
          component: 'Login'
        }
      },
      {
        path: '/signup',
        label: 'Sign Up',
        content: {
          component: 'app.EmployeeSignup'
        }
      }
    ]
  }
};
