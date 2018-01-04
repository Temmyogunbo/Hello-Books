import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string,
    PropTypes.number]),
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  textArea: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
TextFieldGroup.defaultProps = {
  type: 'text',
  id: '',
  field: '',
  icon: '',
};
/**It either returns input field or textarea
 *
 *
 * @param {string}  id - textFieldGroup id
 *  @param {string}  field - field string for textFieldGroup
 *  @param {string}  value - value string for textFieldGroup
 *  @param {string}   label - label string for textFieldGroup
 *  @param {object}  errors - errors object for textFieldGroup
 *  @param {string}   type - type of textFieldGroup
 *  @param {string}   icon - textFieldGroup icon if available
 *  @param {function}   handleChange - function for textFieldGroup
 * }
 * @returns {object} jsx
 */
function TextFieldGroup({
  field,
  id,
  value,
  label,
  error,
  type,
  icon,
  textArea,
  handleChange,
}) {
  return (
    <div className="input-field">
      <label htmlFor={id}>
        <i className="material-icons">{icon}</i> {label}
      </label>{textArea ?
        <textarea
          className="materialize-textarea"
          value={textArea}
          onChange={handleChange}
          name={field}
        /> :
        <input
          name={field}
          id={id}
          type={type}
          className="validate"
          value={value}
          onChange={handleChange}
        />}

      <span className="error-block">
        {error}
      </span>
    </div>
  );
}

TextFieldGroup.propTypes = propTypes;
export default TextFieldGroup;
