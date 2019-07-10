Using Query Parameters with MSON-React
--------------------------------------

Define the Route with a Menu Item

.. code-block:: js

    {
      path: '/contacts/edit/:id',
      label: 'Edit Contact w Id',
      content: {
        component: 'app.EditContact'
      },
      hidden: true
    },

If you add a menu item like this to a mson menu component (e.g. the one used at mson-react/src/demo/app.js),
the menu item will match this route to the EditContact component and the query parameter named `id` will be
available for your use in the globals object.

You can access it like this:

.. code-block:: js

  render() {
    /** get the route out of the globals */
    const route = globals.get('route');


And somewhere in the render function (e.g. in the return function of the react component),
do something like this:

.. code-block:: js

  <div>{ route !== undefined ? 'Requested contact id: ' + route.parameters.id : 'no id found'}</div>


And we get the id output to our app:

.. image:: mson-react/query-params-mson-react.png
    :width: 400px
    :align: left
    :target: https://codesandbox.io/s/mson-07-simple-app-w-custom-action-l5mij
    :alt: query parameters with mson-react

.. raw:: html

   <div style="clear:both;">

Why did we make the menu item hidden?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Let's take a look at that menu item definition again:

.. code-block:: js

    {
      path: '/contacts/edit/:id',
      label: 'Edit Contact w Id',
      content: {
        component: 'app.EditContact'
      },
      hidden: true
    },

Why did we add `hidden: true` to that definition? It is expected that this route will not be
from direct clicks on a menu item, but through other means. There would also be a clickable menu
item intended to take a person to the main contacts page.

.. note:: 

  `hidden: true` is added so that this does not appear in the menu as a clickable menu item, but 
  does get created as a route and matched to a component for display. 

  If we removed the `hidden: true`, the app would take you to
  a page, but the id would be `:id` (instead of `123` for example), and that would be of no use to anyone.



