import React from "react";

const MyButton = (props) => {
  return (
    <button
      href={props.link}
      target={props.target}
      variant="contained"
      size="large"
      style={{
        background: props.bck,
        color: props.color,
        margin: "20px",
        padding: "10px",
      }}
    >
      {props.text}
    </button>
  );
};

export default MyButton;
