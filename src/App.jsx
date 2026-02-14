import React from "react";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header";

const App = () => {
  return <Header></Header>;
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
