####
MSON
####

.. contents: add a colon to turn contents back on

THIS PAGE IS A STUB. 

Though there isn't much information here at the moment, this page will be the main point
for *reference* information about MSON. information
on classes, functions, ways of making MSON do certain things. It will be documented here.



CollectionField
===============

The CollectionField is a very useful component in mson. It supports the store component, which means it 
can automatically store the objects it holds, in any mson store. It has add, remove, get, and update
capability (CRUD). It supports re-ordering, so it is great for orderable lists.

With a CollectionField you can:

- create an instance of the CollectionField using a mson definition.
- use addForm to add one object to the list of items in the CollectionField
- use removeForm to remove an object

----

Class and Function Definitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. js:autoclass:: CollectionField
  :members:

  .. js:attribute:: schema.fields
    
    The fields property is an array of objects describing the CollectionField

    .. code-block:: js

      {
        name: 'formFactory',
        component: 'Field',
        required: true
      },
      {
        // Note: this prop is automatically generated using the formFactory and can be read, but
        // should not be be set
        name: 'form',
        component: 'Field'
      },
      {
        name: 'forbidCreate',
        component: 'BooleanField'
      },
      {
        name: 'forbidUpdate',
        component: 'BooleanField'
      },
      {
        name: 'forbidDelete',
        component: 'BooleanField'
      },
      {
        name: 'forbidViewArchived',
        component: 'BooleanField'
      },
      {
        name: 'forbidSearch',
        component: 'BooleanField'
      },
      {
        name: 'forbidSort', // set to true to lock items and forbid sorting
        component: 'BooleanField'
      },
      {
        name: 'forbidOrder', // set to true to lock items and forbid ordering
        component: 'BooleanField'
      },
      {
        name: 'minSize',
        component: 'IntegerField'
      },
      {
        name: 'maxSize',
        component: 'IntegerField'
      },
      {
        /** 
         * What the objects in the CollectionField are called when referred to
         * in the singular. If the CollectionField holds a list of contacts,
         * for instance, the singularLabel would be **Contact**
         */
        name: 'singularLabel',
        component: 'TextField'
      },
      {
        /**
         * The store that is used to store the data held in the CollectionField.
         */
        name: 'store',
        component: 'Field'
      },
      {
        name: 'scrollThreshold',
        component: 'IntegerField'
      },
      {
        name: 'itemsPerPage',
        component: 'IntegerField'
      },
      {
        name: 'maxBufferPages',
        component: 'IntegerField'
      },
      {
        name: 'spacerHeight',
        component: 'IntegerField'
      },
      {
        name: 'spacerId',
        component: 'TextField'
      },
      {
        name: 'bufferTopId',
        component: 'TextField'
      },
      {
        name: 'isLoading',
        component: 'BooleanField'
      },
      {
        name: 'order',
        component: 'Field'
      },
      {
        name: 'currentForm',
        component: 'Field'
      },
      {
        name: 'mode',
        component: 'TextField'
      },
      {
        name: 'noResults',
        component: 'BooleanField'
      },
      {
        name: 'pristine',
        component: 'BooleanField'
      },
      {
        name: 'change',
        component: 'Field'
      },
      {
        name: 'maxColumns',
        component: 'IntegerField'
      },
      {
        name: 'skipRead',
        component: 'BooleanField'
      },
      {
        name: 'includeExtraneous',
        component: 'BooleanField'
      }


    .. js:attribute:: formFactory

      The formFactory component that is used to generate the Form objects that
      the CollectionField holds


    .. js:attribute:: form

      A readonly property. this prop is automatically generated using
      the formFactory and can be read, but should not be be set. 


    .. js:attribute:: forbidCreate

      A BooleanField property. When set to true, the CollectionField may not be used
      to create new records.


    .. js:attribute:: forbidUpdate

      A BooleanField property. When set to true, the CollectionField will not update records. 

    .. js:attribute:: fields


----

(manualy generated doc)

.. js:function:: addForm(object)

  :param object: A plain javascript object as described below
  :param object.values: A javascript object with the form you're adding.
  :param object.synchronous: Whether the function should run synchronously or should be ran with the javascript async keyword.
    This param blah blah

  **Example:**
  

  .. code-block:: js

    collectionFieldInstance.addForm({
      values: {id: '123', firstName: 'John', lastName: 'Doe'} ,
      synchronous: true
    })


  * For more examples, take a look at the `tests`_
  .. _Example link: http://google.com


.. js:function:: removeForm(formId)

  :param formId: The id of the document you want to remove from the CollectionField's store

  **Example:**
  

  .. code-block:: js

    collectionFieldInstance.removeForm( form.getValue('id') );

Miscellaneous Notes
===================

.. code-block:: js

  CollectionField.get('form') // Gets the underlying mson object for the mson component in question. In this case, a CollectionField
  form.setValues // function to set fields on a document
  restore // restores an archived document?
  await CollectionField.setValues // what does this do? 
  form.getValues(); // get all fields for a document
  form.getValue('key'); // get one field from a document
  .get(form.fields); // get all the fields of a mson component (the field of its underlying object)
  mson-react/src/attach // attaches props to react UI rendering component








