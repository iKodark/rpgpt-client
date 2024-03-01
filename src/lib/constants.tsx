import { Dices, Users, Home } from "lucide-react";

export const routes = {
  signin: {
    path: "/"
  },
  signup: {
    path: "/register"
  },
  dashboard: {
    path: "/dashboard",
    children: {
      home: {
        path: "",
        label: "Início",
        icon: Home
      },
      users: {
        path: "/users",
        label: "Usuários",
        icon: Users
      },
      rpg: {
        path: "/rpg",
        label: "RPG",
        icon: Dices
      },
    }
  }
}