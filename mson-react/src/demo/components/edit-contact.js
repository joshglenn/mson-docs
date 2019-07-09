const getIdFromQueryString = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  //console.log('queryString id is',id);
  return id;
};

export default {
  name: 'app.EditContact', // the name were giving to *this* component
  component: 'RecordEditor', // the component that will show when an app.EditContact component gets rendered
  baseForm: {
    component: 'Form',
    fields: [
      {
        name: 'firstName',
        component: 'TextField',
        label: 'First Name',
        required: true,
        block: false
      },
      {
        name: 'lastName',
        component: 'TextField',
        label: 'Last Name'
      },
      {
        name: 'email',
        component: 'EmailField',
        label: 'Email'
      }
    ],
    listeners: [
      {
        event: 'load',
        actions: [
          {
            // Default the id to '1' so that we can edit the doc later. Usually, this id would come
            // from the route or the user's session
            component: 'Set',
            name: 'fields.id.value',
            value: getIdFromQueryString()
          }
        ]
      }
    ]
  },
  label: 'Contact',
  store: {
    component: 'LocalStorageStore',
    storeName: 'contactsLocalStorage'
  },
  storeWhere: {
    id: getIdFromQueryString()
  }
};
