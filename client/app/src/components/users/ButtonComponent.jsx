import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button className="button-color">
        {this.props.name}
      </button>
    );
  }
}

export default Button;
