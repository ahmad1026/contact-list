import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import AddUserPage from "../Pages/AddUser";
import ListUsers from "../Pages/ListUsers";

const websiteRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AddUserPage />,
      },
      {
        path: "/users",
        element: <ListUsers />,
      },
    ],
  },
];

const Routes = createBrowserRouter([...websiteRoutes]);

export default function index() {
  return <RouterProvider router={Routes} />;
}
