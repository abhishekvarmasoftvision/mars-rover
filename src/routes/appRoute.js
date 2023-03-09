import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MarsRover from "../Components/Views/MarsRover/MarsRover";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MarsRover />,
  }
]);
