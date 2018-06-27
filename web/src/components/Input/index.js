import React from 'react';
import propTypes from "prop-types"


const Input = ({ input, label, type, placeholder, style, meta }: Props) =>
  <div style={{ marginBottom: '1rem' }}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
      style={style && style}
    />
    {meta.touched && meta.error &&
      <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
    }
  </div>;

Input.propTypes = {
  input: propTypes.shape(),
  label: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  style: propTypes.shape(),
  meta: propTypes.shape(),
}

Input.defaultProps = {
  input: {
    name: 'input'
  },
  label: '',
  type: '',
  placeholder: '',
  style: {},
  meta: {},
}

export default Input;