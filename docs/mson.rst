.. toctree::
   :maxdepth: 2
   :caption: Contents:


======
MSON
======


CollectionField
===========

The CollectionField is a very useful component in mson. It supports the store component, which means it 
can automatically store the objects it holds, in any mson store. It has add, remove, get, and update
capability (CRUD). It supports re-ordering, so it is great for orderable lists.

With a CollectionField you can:

- create an instance of the CollectionField using a mson definition.
- use addForm to add one object to the list of items in the CollectionField
- use removeForm to remove an object

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
  