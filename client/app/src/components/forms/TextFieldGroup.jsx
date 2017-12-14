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
  textArea,
  handleChange
}) {
  return (
    <div >
      <div className="row input-field col.s5">
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
            style={{ padding: ".7rem 0 1.4rem 0" }}
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
