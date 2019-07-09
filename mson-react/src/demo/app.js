import compiler from 'mson/lib/compiler';
import * as components from './components'; // import all js modules (files) from the sibling components directory
import * as auxuicomponents from './components/ui-components';
import globals from 'mson/lib/globals';
import uiComponents from '../components'; // import UI components from the components.js file located in the parent directory
import FieldEditorForm from 'mson/lib/form/field-editor-form';
import FieldEditorFormUI from '../field-editor-form';
import FormEditor from 'mson/lib/form/form-editor';
import FormEditorUI from '../form-editor';
import FormBuilder from 'mson/lib/form/form-builder';

// Set the site key when using the ReCAPTCHAField
globals.set({ reCAPTCHASiteKey: '6LdIbGMUAAAAAJnipR9t-SnWzCbn0ZX2myXBIauh' });

// Register optional core components
compiler.registerComponent('FieldEditorForm', FieldEditorForm);
uiComponents.FieldEditorForm = FieldEditorFormUI;
compiler.registerComponent('FormEditor', FormEditor);
uiComponents.FormEditor = FormEditorUI;
compiler.registerComponent('FormBuilder', FormBuilder);

// Register all the components
for (let name in components) {
  let component = components[name];
  console.log('Registering component: ' + name);
  compiler.registerComponent(component.name, component);
}

// Instantiate the app
const app = compiler.newComponent({
  component: 'app.App'
});

export default app;
