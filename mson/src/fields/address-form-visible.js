export default {
  component: 'Form',
  fields: [
    {
      name: 'addressLine1',
      component: 'TextField',
      label: 'Address Line 1',
      maxLength: 100,
      required: true,

      /** The hidden property determines
       *  the initial state of the field -
       *  hidden or visible
       */
      hidden: false
    },
    {
      name: 'addressLine2',
      component: 'TextField',
      label: 'Address Line 2',
      maxLength: 100,
      required: false,
      hidden: false
    },
    {
      name: 'city',
      component: 'CityField',
      label: 'City',
      required: true,
      block: false,
      hidden: false
    },
    {
      name: 'stateProvince',
      component: 'ProvinceField',
      label: 'State/Province',
      required: true,
      block: false,
      hidden: false
    },
    {
      name: 'postalCode',
      component: 'PostalCodeField',
      label: 'Postal Code',
      required: true,
      hidden: false
    },
    {
      name: 'country',
      component: 'CountryField',
      label: 'Country',
      required: false
    }
  ],
  listeners: [
    {
      event: 'fields.country.value',
      actions: [
        {
          component: 'Action',
          if: {
            'fields.country.value': {
              $ne: null
            }
          },
          actions: [
            {
              component: 'Emit',
              event: 'adjustFields'
            },
            {
              component: 'Emit',
              event: 'setHidden',
              value: false
            }
          ],
          else: [
            {
              component: 'Emit',
              event: 'setHidden',
              value: true
            },
            {
              // Avoid showing errors when the value is cleared
              component: 'Set',
              name: 'clearErrs',
              value: true
            }
          ]
        }
      ]
    },
    {
      event: 'setHidden',
      actions: [
        {
          component: 'Set',
          name: 'component',
          value: {
            'fields.addressLine1.hidden': '{{arguments}}',
            'fields.addressLine2.hidden': '{{arguments}}',
            'fields.city.hidden': '{{arguments}}',
            'fields.stateProvince.hidden': '{{arguments}}',
            'fields.postalCode.hidden': '{{arguments}}'
          }
        }
      ]
    },
    {
      event: 'adjustFields',
      actions: [
        {
          component: 'Action',
          if: {
            'fields.country.value': 'US'
          },
          actions: [
            {
              // Pipe the existing stateProvince so that we can preserve the value. TODO: is there
              // an easier way?
              component: 'Action',
              if: {
                'fields.stateProvince.value': {
                  $ne: null
                }
              },
              actions: [
                {
                  component: 'Set',
                  value: '{{fields.stateProvince.value}}'
                }
              ],
              else: [
                {
                  component: 'Set',
                  value: null
                }
              ]
            },
            {
              component: 'Set',
              name: 'component',
              value: {
                fields: [
                  {
                    name: 'stateProvince',
                    component: 'StateField',
                    label: 'State',
                    required: true,
                    block: false
                  }
                ],
                'fields.stateProvince.value': '{{arguments}}',
                'fields.postalCode.label': 'Zip Code'
              }
            }
          ],
          else: [
            {
              // Pipe the existing stateProvince so that we can preserve the value. TODO: is there
              // an easier way?
              component: 'Action',
              if: {
                'fields.stateProvince.value': {
                  $ne: null
                }
              },
              actions: [
                {
                  component: 'Set',
                  value: '{{fields.stateProvince.value}}'
                }
              ],
              else: [
                {
                  component: 'Set',
                  value: null
                }
              ]
            },
            {
              component: 'Set',
              name: 'component',
              value: {
                fields: [
                  {
                    name: 'stateProvince',
                    component: 'ProvinceField',
                    label: 'State/Province',
                    required: true,
                    block: false
                  }
                ],
                'fields.stateProvince.value': '{{arguments}}',
                'fields.postalCode.label': 'Postal Code'
              }
            }
          ]
        }
      ]
    }
  ]
};
