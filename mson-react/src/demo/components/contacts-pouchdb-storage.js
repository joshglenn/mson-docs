export default {
  name: 'app.ContactsPouchDBStorage',
  component: 'app.Contacts',
  store: {
    component: 'PouchDBStorageStore',
    storeName: 'contactsPouchDBStorage'
  }
};
