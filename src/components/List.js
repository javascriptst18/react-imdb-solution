import React from "react";

/* List is in charge of just mapping through the array
 * passed to it */
function List(props) {
  const list = props.data.map((item, index) => {
    return <p key={index}>{item.title} </p>
  });
  return <section>{list}</section>;
}
export default List;
