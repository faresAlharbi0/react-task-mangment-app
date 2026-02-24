import React from "react";
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header";
import TasksBoard from "./TasksBoard";

const App = () => {
  return (
    <>
      <Header></Header>
      <TasksBoard></TasksBoard>
    </>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
