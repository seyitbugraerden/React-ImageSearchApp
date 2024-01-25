import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <App />
    <img
      className="bg"
      src="https://www.66pixel.com/wp-content/uploads/camera-1067853_1280.jpg"
      alt=""
    />
  </PrimeReactProvider>
);
