import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
TextFieldGroup.defaultProps = {
  type: 'text',
  id: '',
  field: '',
  icon: ''
};
/**
 *
 *
 * @param {type}  id
 *  @param {type}  field
 *  @param {type}  value
 *  @param {type}   label
 *  @param {type}  errors
 *  @param {type}   type
 *  @param {type}   icon
 *  @param {type}   handleChange
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
  handleChange
}) {
  return (
    <div >
      <div className="input-field col.s5">
        <label htmlFor={id}>
          <i className="material-icons">{icon}</i> {label}
        </label>
        <input
          name={field}
          id={id}
          type={type}
          className="validate"
          value={value}
          onChange={handleChange}
        />
        <span className="error-block">
          {error}
        </span>
      </div>
    </div>
  );
}

TextFieldGroup.propTypes = propTypes;
export default TextFieldGroup;
