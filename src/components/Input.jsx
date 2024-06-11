import React, { useState } from "react";

// Properties
const Input = ({ goiy }) => {
  const [age, setAge] = useState(0);

  const [name, setName] = useState("Thanh");

  return (
    <>
      <button onClick={() => setAge(20)}>Click me</button>
      <span>Tuoi: {age}</span>
      <button onClick={() => setName("Vy")}>Click me</button>
      <span>Ten: {name}</span>
      <input placeholder={goiy}></input>
    </>
  );
};

export default Input;
