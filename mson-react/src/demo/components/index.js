import App from './app';
import './contact-no-mson';
import Contacts from './contacts';
import ContactsLocalStorage from './contacts-local-storage';
import ContactsPouchDBStorage from './contacts-pouchdb-storage';
import ContactsFirebase from './contacts-firebase';
import EditContact from './edit-contact';
import FieldsScreen from './fields-screen';
import Fields from './fields';
import FormBuilder from './form-builder';
import Grid from './grid';
import Editable from './react-text-mson';
//import ReactText from './reacttext';
import CustomText from './custom-text-mson';
//import CustomTextRenderer from './custom-text-react'; //wont work in here. the modules have to have the same name

import Home from './home';

import Tasks from './tasks';
import TasksLocalStorage from './tasks-local-storage';
import TasksFirebase from './tasks-firebase';
import Translations from './translations';
import DictionaryEntries from './dictionary-entries';

const EmployeeSignup = {
  name: 'app.EmployeeSignup',
  component: 'SignupEditor',
  baseForm: {
    component: 'User',
    fields: [
      {
        component: 'Field',
        name: 'roles'
      }
    ]
  },
  store: {
    component: 'MemoryStore'
  }
};

export {
  App,
  Contacts,
  ContactsLocalStorage,
  ContactsPouchDBStorage,
  ContactsFirebase,
  EditContact,
  EmployeeSignup,
  FieldsScreen,
  Fields,
  FormBuilder,
  Grid,
  CustomText,
  //CustomTextRenderer,
  Editable, // load before home?
  Home,
  Tasks,
  TasksLocalStorage,
  TasksFirebase,
  Translations,
  DictionaryEntries
};
