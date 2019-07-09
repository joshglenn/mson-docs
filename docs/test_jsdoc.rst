.. toctree::
   :maxdepth: 2
   :caption: Contents:

==============
Notes on JSDoc
==============


JSDoc outputs just the classname if you specify like this:

.. code-block:: js

  .. js:autoclass:: MyClass
    :members:

gives the result:

  js:autoclass:: MyClass
  :members:

----

But, if you use the path (for instance, if you have multiple files or modules
with the same name), then it will output the entire path tree in the docs. 

.. code-block:: js

  .. js:autoclass:: ./mson-react/MyClass.module:MyClass
    :members:

gives the result:

js:autoclass:: ./mson-react/MyClass.module:MyClass
  :members:


This looks very cluttered. It would be nice if we could take the path prefix 
off, display it once, maybe in a footer something like:

.. code-block:: none

  File location: /path/to/said/files/parent/folder

----

js:autoclass:: ./mson-react/MyClass.module.exports
  :members:

.. js:autoclass:: mson/src/fields/collection-field.CollectionField
  :members:


.. js:autoclass:: CollectionField
  :members:




References:

https://jsdoc.app/about-namepaths.html

