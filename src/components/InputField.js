import React from "react";

/* The input has no state, state is handled in App.js
 * controlled component, but the control is in App.js */
function InputField(props) {
  return (
    <input
      type="text"
      name={props.name}
      onChange={props.onChange}
      value={props.value}
    />
  );
}
export default InputField;