import MainLayout from "layouts/MainLayout.vue";
const routes = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        redirect: "/dni",
      },
      { path: "/dni", component: () => import("pages/IndexPage.vue") },
      { path: "/ruc", component: () => import("pages/RucPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
