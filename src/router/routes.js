const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CursosPage.vue') },
      { path: 'mis-compras', component: () => import('pages/MisComprasPage.vue') },
      { path: 'admin', component: () => import('pages/PanelAdminPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
