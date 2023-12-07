import { createBrowserRouter } from "react-router-dom";
import App from "../app/index";
import Details from "../app/details";
import Main from "../app/main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '', element: <Main />},
      { path: "details/:id", element: <Details />}
    ]
  }
]);