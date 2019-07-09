import MemoryStore from './memory-store';
import cloneDeep from 'lodash/cloneDeep';

import PouchDB from 'pouchdb';

export default class PouchDBStorageStore extends MemoryStore {
  _className = 'PouchDBStorageStore';

  /**
   * Loads the _docs variable from localStorage, one document at a time.
   *
   * @storeName The name of the store to look up in _localStorage
   */
  async _loadDocs(storeName) {
    try {
      var result = await this._pouchDB.allDocs({ include_docs: true });
      result.rows.forEach(row => {
        this._docs.set(row.id, row.doc);
      });
    } catch (err) {
      console.log(err);
    }
  }

  // For mocking
  _getLocalStorage() {
    return this._global.window.localStorage;
  }

  async _create(props) {
    super._create(props);

    // For mocking
    //this._global = global;
    //this._localStorage = this._getLocalStorage();
    this._pouchDB = new PouchDB(props && props.storeName);

    this.set({
      schema: {
        component: 'Form',
        fields: [
          {
            name: 'storeName',
            component: 'TextField',
            required: true
          }
        ]
      }
    });

    await this._loadDocs(props && props.storeName);
  }

  async _saveDocs() {
    const docs = this._docs.map(doc => {
      let pdoc = cloneDeep(doc);
      pdoc._id = doc.id;
      pdoc.key = doc.id;

      return pdoc;
    });

    try {
      var result = await this._pouchDB.bulkDocs(docs);
    } catch (err) {}
  }

  async _doAndSave(promiseFactory) {
    const response = await promiseFactory();
    this._saveDocs();
    return response;
  }

  async _createDoc(props) {
    return this._doAndSave(() => super._createDoc(props));
  }

  async _updateDoc(props) {
    return this._doAndSave(() => super._updateDoc(props));
  }

  async _archiveDoc(props) {
    return this._doAndSave(() => super._archiveDoc(props));
  }

  async _restoreDoc(props) {
    return this._doAndSave(() => super._restoreDoc(props));
  }
}
