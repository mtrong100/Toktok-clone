import store from "./redux/store";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
import { AuthProvider } from "./context/auth-context";
/* ====================================================== */

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
