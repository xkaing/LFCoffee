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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      {
        path: "/welcome",
        element: <EmptyPage />,
      },
      {
        path: "/calendar",
        element: <App />,
      },
      {
        path: "/chart",
        element: <EmptyPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
