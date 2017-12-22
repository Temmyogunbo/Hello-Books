import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  textArea: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
TextFieldGroup.defaultProps = {
  type: 'text',
  id: '',
  field: '',
  icon: ''
};
/**It either returns input field or textarea
 *
 *
 * @param {string}  id
 *  @param {string}  field
 *  @param {string}  value
 *  @param {string}   label
 *  @param {object}  errors
 *  @param {string}   type
 *  @param {string}   icon
 *  @param {function}   handleChange
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
  handleChange
}) {
  return (
    <div >
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
    </div>
  );
}

TextFieldGroup.propTypes = propTypes;
export default TextFieldGroup;
