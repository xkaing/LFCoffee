import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import HomeLayout from "./Layout/HomeLayout.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import EmptyData from "./components/EmptyData";
import EmptyPage from "./components/EmptyPage.jsx";
import RoutesIndex from "./Layout/RoutesIndex.jsx";
import Welcome from "./Welcome/Welcome.jsx";
import XKTrophies, { XKTrophiesShigong } from "./XKTrophies/XKTrophies.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/calendar",
        element: <App />,
      },
      {
        path: "/chart",
        element: <EmptyPage />,
      },
      {
        path: "/xk-trophies",
        element: <XKTrophiesShigong />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
