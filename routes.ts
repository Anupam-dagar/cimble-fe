const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: `<SunIcon color="inherit" />`,
    layout: "/",
    separator: false,
  },
  {
    path: "/organisations",
    name: "Organisations",
    icon: `<SunIcon color="inherit" />`,
    layout: "/admin",
    separator: false,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: `<SunIcon color="inherit" />`,
    layout: "/admin",
    separator: false,
  },
  {
    path: "/configurations",
    name: "Configurations",
    icon: `<SunIcon color="inherit" />`,
    layout: "/admin",
    separator: false,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: `<SunIcon color="inherit" />`,
    layout: "/logout",
    separator: true,
  },
];

export default routes;
