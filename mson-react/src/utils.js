import each from 'lodash/each';

/**
 * I think this is used to get properties from MSON components
 */
class Utils {
  getIfDefined(props) {
    const definedProps = {};
    each(props, (value, name) => {
      if (value !== undefined) {
        definedProps[name] = value;
      }
    });
    return definedProps;
  }
}
export default new Utils();
