import {
  Outlet,
  createBrowserRouter
} from "react-router-dom";

import {
  Auth as AuthTemplate,
  Dashboard as DashboardTemplate
} from "./templates";

import {
  Auth
} from "./pages";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthTemplate />,
    children: [
      {
        path: "",
        element: <Auth.Signin />
      },
      {
        path: "/register",
        element: <Auth.Signup />
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardTemplate />,
    children: [
      {
        path: "",
        element: <>Home</>
      },
      {
        path: "users",
        element: <>Users</>
      },
      {
        path: "rpg",
        element: <>RPG</>
      },
      {
        path: "profile",
        element: <>Profile</>
      }
    ]
  },
]);

export default Routes;