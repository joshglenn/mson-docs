// NOTE: this file should only contain the component registrations

import ButtonField from './fields/button-field';
import BooleanField from './fields/boolean-field';
import Card from './card';
import ComponentField from './fields/component-field';
import CompositeField from './fields/composite-field';
import DateField from './fields/date-field';
import Field from './fields/field';
import Form from './form';
import FormField from './fields/form-field';
import Grid from './grid';
import GridItem from './grid-item';
import CollectionField from './fields/collection-field';
import DictionaryEntryCollectionField from './fields/collection-field-dictionary-entry';
import ListField from './fields/list-field';
import ReCAPTCHAField from './fields/re-captcha-field';
import SelectField from './fields/select-field';
import Tabs from './tabs';
import TimeField from './fields/time-field';
import Text from './text';

// import the CustomText UI component
//import CustomText from './demo/components/custom-text-react';

// import Editable from './react-text-mson';
// import ReactText from './reacttext';
import CustomText from './demo/components-ui/custom-text-react';
import TextField from './fields/text-field';
import URLField from './fields/url-field';

export default {
  ButtonField,
  BooleanField,
  Card,
  ChainedSelectField: CompositeField,
  ChainedSelectListField: ListField,
  ComponentField,
  CompositeField,
  DateField,
  Field,
  Form,
  FormField,
  Grid,
  GridItem,
  CollectionField,
  DictionaryEntryCollectionField,
  IdField: TextField,
  IntegerField: TextField,
  ListField,
  MoneyField: TextField,
  NumberField: TextField,
  PhoneField: TextField,
  ReCAPTCHAField,
  SelectField,
  SelectListField: ListField,
  Tabs,
  TimeField,
  Text,
  CustomText, // export the CustomText react UI component
  // Editable, // custom mson component
  // ReactText, // UI component for custom mson component
  TextField,
  TextListField: ListField,
  URLField,
  User: Form
};
