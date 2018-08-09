import React from 'react';

/* Stateless component, only state in App.js. the event handling
 * is just passed down but is being performed in App.js, same as
 * the selected value */
function SelectField(props) {
  return (
    <select onChange={props.onChange} value={props.value}>
      <option value=""> All </option>
      <option value="Drama"> Drama </option>
      <option value="Action"> Action </option>
      <option value="Crime"> Crime </option>
      <option value="Adventure"> Adventure </option>
    </select>
  );
}

export default SelectField;