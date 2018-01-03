import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  textArea: PropTypes.string,
  items: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};
SelectFieldGroup.defaultProps = {
  field: '',
  items: [],
};
/**It returns select component
 *
 *
 *  @param {string}  field - field string
 *  @param {string}  value - value string
 *  @param {string}   label - label string
 *  @param {object}  errors - errors object
 *  @param {function}   handleChange - handleChange function
 * @returns {object} jsx
 */
function SelectFieldGroup({
  field,
  value,
  label,
  error,
  items,
  handleChange,
}) {
  const selectList = items.map(eachItem => (
    <option
      key={eachItem.id}
    >
      {eachItem.category}
    </option>
  ));
  return (
    <div className="row">
      <label>{label}</label>
      <select
        className="browser-default"
        onChange={handleChange}
        name={field}
        value={value}>
        <option>Select a {field}</option>
        {selectList}
      </select>
      <span className="error-block">
        {error}
      </span>
    </div>
  );
}

SelectFieldGroup.propTypes = propTypes;
export default SelectFieldGroup;
