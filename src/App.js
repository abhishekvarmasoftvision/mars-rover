import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/appRoute";
import "./App.css";

function InnerApp() {
  return <RouterProvider router={appRouter} />;
}

function App() {
  return (
    <React.StrictMode>
      <InnerApp />
    </React.StrictMode>
  );
}

export default App;
