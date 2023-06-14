import React from "react";
import { createGlobalStyle } from "styled-components";
import HelmetComponent from "./helmet";
import ToDoList from "./components/ToDoList";

function App() {
  const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:#272c2e;
  color:#eaeff1;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
li {
list-style-type: none;
}
  `;
  return (
    <>
      <HelmetComponent />
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
