export default {
  name: 'RecordEditor',
  component: 'Form',
  schema: {
    component: 'Form',

    /** THIS fields property here defines the fields of this RecordEditor's schema */
    // The schema defines properties that are unique to this component.
    fields: [
      {
        /**
         *  The baseForm field is defined here so that components which use this (the RecordEditor component)
         *  as their *component:* property can pass in their fields to be wrapped by the fields of this component
         *  (which you will find below). This component's fields are not to be confused
         *  with *these* fields - the fields of the RecordEditor's schema.
         *
         */
        name: 'baseForm',
        component: 'Field',
        required: true
      },
      {
        name: 'label',
        component: 'TextField'
      },
      {
        // define the store field where we will save the information in this form
        name: 'store',
        component: 'Field'
      },
      {
        // define a where field so that we can store the contents of this form in
        // a specific location in the store
        // QUESTION: Where is the logic for storeWhere defined?
        name: 'storeWhere',
        component: 'WhereField'
      },
      {
        name: 'preview',
        component: 'BooleanField'
      },
      {
        // QUESTION: where is the action of the hideCancel field defined?
        name: 'hideCancel',
        component: 'BooleanField'
      }
    ]
  },
  // baseForm... is that what is defined in edit-contact.js that gets wrapped by this
  // record-editor component? yes. baseForm is one of the props of the EditContact component,
  // and it gets passed in to the RecordEditor.componentToWrap property here.
  componentToWrap: '{{baseForm}}',

  // This fields property defines the actual fields which will be visible
  // when this components is displayed to the user
  fields: [
    {
      component: 'ButtonField',
      name: 'edit',
      label: 'Edit',
      icon: 'Edit',
      hidden: true
    },
    {
      component: 'ButtonField',
      type: 'submit',
      name: 'save',
      label: 'Save',
      icon: 'Save'
    },
    {
      component: 'ButtonField',
      name: 'cancel',
      label: 'Cancel',
      icon: 'Cancel',
      hidden: true
    }
  ],
  listeners: [
    {
      event: 'load',
      actions: [
        {
          component: 'Set', // set is the name of an action component which sets a property
          name: 'isLoading', // isLoading is a boolean property
          value: true // the value which we want to set the isLoading property to
        },
        {
          component: 'Action',
          if: {
            storeWhere: {
              $ne: null
            }
          },
          actions: [
            {
              component: 'GetDoc',
              store: '{{store}}',
              where: '{{storeWhere}}'
            },
            {
              component: 'SetFromDoc',
              if: {
                arguments: {
                  $ne: null
                }
              },
              name: 'value',
              doc: '{{arguments}}'
            }
          ]
        },
        {
          component: 'Set',
          name: 'pristine',
          value: true
        },
        {
          if: {
            preview: {
              $ne: false
            }
          },
          component: 'Emit',
          event: 'read'
        },
        {
          if: {
            preview: false
          },
          component: 'Emit',
          event: 'edit'
        },
        {
          component: 'Set',
          name: 'isLoading',
          value: false
        }
      ]
    },
    {
      event: 'read',
      actions: [
        {
          component: 'Set',
          name: 'mode',
          value: 'read'
        },
        {
          component: 'Set',
          name: 'editable',
          value: false
        },
        {
          component: 'Set',
          name: 'component',
          value: {
            'fields.save.hidden': true,
            'fields.edit.hidden': false,
            'fields.cancel.hidden': true
          }
        },
        {
          component: 'Emit',
          event: 'didRead'
        }
      ]
    },
    {
      event: 'edit',
      actions: [
        {
          component: 'Set',
          name: 'mode',
          value: 'update'
        },
        {
          component: 'Set',
          name: 'editable',
          value: true
        },
        {
          component: 'Set',
          name: 'component',
          value: {
            'fields.save.hidden': false,
            'fields.save.disabled': true,
            'fields.edit.hidden': true
          }
        },
        {
          if: {
            hideCancel: {
              $ne: true
            }
          },
          component: 'Set',
          name: 'fields.cancel.hidden',
          value: false
        },
        {
          component: 'Emit',
          event: 'didEdit'
        }
      ]
    },
    {
      event: 'canSubmit',
      actions: [
        {
          component: 'Set',
          name: 'fields.save.disabled',
          value: false
        },
        {
          component: 'Emit',
          event: 'didCanSubmit'
        }
      ]
    },
    {
      event: 'cannotSubmit',
      actions: [
        {
          component: 'Set',
          name: 'fields.save.disabled',
          value: true
        },
        {
          component: 'Emit',
          event: 'didCannotSubmit'
        }
      ]
    },
    {
      event: 'save',
      actions: [
        {
          component: 'UpsertDoc',
          store: '{{store}}'
        },
        {
          // Needed or else will be prompted to discard changes
          component: 'Set',
          name: 'pristine',
          value: true
        },
        {
          component: 'Snackbar',
          message: '{{label}} saved'
        },
        {
          // Needed to restore read data/format as it may be different than that for updating
          if: {
            preview: {
              $ne: false
            }
          },
          component: 'Emit',
          event: 'load'
        },
        {
          component: 'Emit',
          event: 'didSave'
        }
      ]
    },
    {
      event: 'cancel',
      actions: [
        {
          component: 'Emit',
          event: 'load'
        },
        {
          component: 'Emit',
          event: 'didCancel'
        }
      ]
    },
    {
      // Get real-time updates from store
      event: 'store.updateDoc',
      actions: [
        {
          component: 'SetFromDoc',
          name: 'value',
          doc: '{{arguments.value}}'
        },
        {
          // Disable the save button so that a save, followed by an immediate updateDoc, e.g.
          // Firebase, keeps the save button disabled.
          component: 'Set',
          name: 'fields.save.disabled',
          value: true
        }
      ]
    }
  ]
};
