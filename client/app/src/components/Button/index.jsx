import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string,
  dataAction: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  style: PropTypes.object,
};

Button.defaultProps = {
  type: 'text',
  disabled: false,
  children: '',
  id: '',
  icon: ''
};
/**It returns a button component
 *
 *
 * @param {string}  className - button class name
 * @param {string}   type - button type
 * @param {string}   dataAction
 * @param {boolean}    disabled - button atribute that sets to true or false
 * @param {string}  children - button text
 * }
 * @returns {object} jsx
 */
function Button({
  className,
  type,
  dataAction,
  disabled,
  children,
  id,
  onClick,
  icon,
  style,
}) {
  return (
    <button
      className={className}
      type={type}
      data-action={dataAction}
      disabled={disabled}
      onClick={onClick}
      style={style}
      id={id}
    >
      <i className="material-icons">{icon}</i>
      {children}</button>
  );
}
Button.propTypes = propTypes;
export default Button;
