.. mson-docs documentation master file, created by
   sphinx-quickstart on Wed Jul  3 13:24:00 2019.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.


###################################
MSON: Build Web Apps In Record Time
###################################

MSON is a system that promises to let you create data-driven web applications quickly and easily,
even if you aren't the most experienced programmer. Actually, the goal of MSON is to allow you to
create data-driven web apps without knowing how to code at all. Every day, we get closer to achieving
that goal.

The future vision is that you will be able to design your web app on screen with a drag-and-drop
builder, then get up-and-running with basic functionality in minutes.

For now though, there is some "coding" involved, albeit minimal for a basic application.

A Simple App
--------------

For example, this example app was created with very little user code (~41 lines). Open up the code sandbox
and take it for a spin.


.. raw:: html

  <iframe src="https://codesandbox.io/embed/o584w8k67z?fontsize=14" 
  title="MSON 01.1: Simple App" 
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" 
  style="width:100%; height:750px; border:0; border-radius: 4px; overflow:hidden;" 
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
  <br /><br /><br />




MSON Components
---------------

Everything in MSON is based on Components, the building blocks of the MSON architecture.
To define the structure of your app (or a portion of it), you have to create what is called a MSON component definition.
For instance, the definition for a simple to-do list app would look like this:


.. code-block:: js

  {
    component: "Form",
    fields: [
      {
        component: "Text",
        name: "header",
        text: "(drag to reorder)"
      },
      {
        component: "CollectionField",
        name: "tasks",
        label: "Tasks",
        hideLabel: true,
        forbidOrder: false,
        formFactory: {
          component: "Factory",
          product: {
            component: "Form",
            fields: [
              {
                name: "task",
                component: "TextField",
                label: "Task",
                multiline: true,
                required: true
              },
              {
                name: "due",
                component: "DateField",
                label: "Due"
              }
            ]
          }
        },
        store: {
          component: "LocalStorageStore",
          storeName: "contacts"
        }
      }
    ]
  }

And with that component definition, the entire functionality is defined for a basic app
that lets you manage a to-do list.






.. dfsdfs NOTE: This documentation is in its infancy. Please bear with us as we work to make it more complete.




.. toctree::
   :hidden:
   :maxdepth: 1
   :caption: Contents:

   what-is-mson
   what-can-mson-do-for-me
   Read the README <https://github.com/redgeoff/mson>
   Why MSON? <https://hackernoon.com/creating-a-new-programming-language-that-will-allow-anyone-to-make-software-7a8c73238dc2>
   live-examples
   learn
   the-mson-stack
   mson
   mson-react
   custom-components
   suggested_reading
   indices
   //page_1
   //rst_cheatsheet

.. _`Geoff Cox`: https://github.com/redgeoff

.. _`MSON-React`: https://github.com/redgeoff/mson-react

.. _`MSON`: https://github.com/redgeoff/mson

