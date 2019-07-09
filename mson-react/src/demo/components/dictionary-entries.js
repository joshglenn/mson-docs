// TODO: Get parent id passed down from the example sentences to the translatedExample sentences

export default {
  name: 'app.DictionaryEntries',
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
      component: 'DictionaryEntryCollectionField',
      name: 'dictionaryEntries',
      label: 'Dictionary Entries',
      skipRead: true, // when we click the item, go straight to editing
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
              name: 'term',
              component: 'TextField',
              label: 'Term',
              required: true,
              block: false
            },
            {
              name: 'language',
              component: 'TextField',
              label: 'Language',
              required: true,
              block: false
            },
            {
              component: 'DictionaryEntryCollectionField',
              name: 'meanings',
              label: 'Meanings',
              maxColumns: 1,
              skipRead: true,
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
                    },
                    {
                      component: 'DictionaryEntryCollectionField',
                      name: 'examples',
                      label: 'Examples',
                      skipRead: true,
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
                            },
                            {
                              component: 'DictionaryEntryCollectionField',
                              name: 'translations',
                              label: 'Translations',
                              maxColumns: 1,
                              skipRead: true,
                              formFactory: {
                                component: 'Factory',

                                product: {
                                  component: 'Form',
                                  fields: [
                                    {
                                      name: 'parent', // the parent example sentence
                                      component: 'TextField',
                                      label: 'Parent ID',
                                      required: true,
                                      //hidden: true,
                                      block: false
                                    },
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
                              // I had to add the store value here, otherwise
                              // the translated example sentences weren't saving
                              // store: {
                              //   component: 'LocalStorageStore',
                              //   storeName: 'dictionaryTranslatedExamples'
                              // }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      },
      store: {
        component: 'LocalStorageStore',
        storeName: 'dictionaryEntries'
      }
    }
  ]
};
