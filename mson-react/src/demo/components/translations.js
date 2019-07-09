export default {
  name: 'app.Translations',
  component: 'Form',
  schema: {
    component: 'Form',
    fields: [
      {
        name: 'store',
        component: 'Field'
      }
    ]
  },
  fields: [
    {
      component: 'CollectionField',
      name: 'translations',
      label: 'Translations',
      hideLabel: true,
      // forbidCreate: true,
      // forbidUpdate: true,
      // forbidDelete: true,
      // forbidViewArchived: true,
      // forbidSearch: true,
      // forbidSort: true,

      maxColumns: 1,
      formFactory: {
        component: 'Factory',
        product: {
          component: 'Form',
          fields: [
            {
              name: 'fromWord',
              component: 'TextField',
              label: 'From Word',
              required: true,
              block: false
            },
            {
              name: 'toWord',
              component: 'TextField',
              label: 'To Word',
              required: true
            },
            {
              component: 'CollectionField',
              name: 'meanings',
              label: 'Meanings',
              maxColumns: 1,
              formFactory: {
                component: 'Factory',

                product: {
                  component: 'Form',
                  fields: [
                    {
                      name: 'meaning',
                      component: 'TextField',
                      label: 'Meaning',
                      required: true,
                      block: false
                    },
                    {
                      name: 'language',
                      component: 'TextField',
                      label: 'Language',
                      required: true
                    }
                  ]
                }
              }
            },
            {
              component: 'CollectionField',
              name: 'examples',
              label: 'Examples',
              maxColumns: 1,
              formFactory: {
                component: 'Factory',

                product: {
                  component: 'Form',
                  fields: [
                    {
                      name: 'text',
                      component: 'TextField',
                      label: 'Text',
                      required: true,
                      block: false
                    },
                    {
                      name: 'language',
                      component: 'TextField',
                      label: 'Language',
                      required: true
                    }
                  ]
                }
              }
            }
          ]
        }
      },
      store: {
        component: 'PouchDBStorageStore',
        storeName: 'translationsPouchDBStorage'
      }
    }
  ]
};
