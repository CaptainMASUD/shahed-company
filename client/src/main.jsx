import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { store, persistor } from "./App/store";
import "./index.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import LoginForm from "./Components/Login/Login";
import RegistrationForm from "./Components/Register/Register";
import About from "./Components/Aboutus/Aboutus";
import Contact from "./Components/Contactus/Contactus";
import Services from "./Components/Services/Services";
import Profile from "./Components/Profile/Profile";
import EmployeeDashboard from "./Components/DashBoard/EmplyeeDashboard/EmployeeDashboard";
import Admin from "./Components/DashBoard/AdminDashboard/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegistrationForm />,
      },
      {
        path: "aboutus",
        element: <About />,
      },
      {
        path: "contactus",
        element: <Contact />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "emplyeeDashboard",
        element: <EmployeeDashboard />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
