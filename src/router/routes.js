const MainLayout = () => import('layouts/MainLayout.vue')
const Home       = () => import('pages/Index.vue')

const ClienteIndex      = () => import('pages/Cliente/Index.vue')
const ClienteSalvar     = () => import('pages/Cliente/Salvar.vue')
const ClienteVisualizar = () => import('pages/Cliente/Visualizar.vue')

const routes = [
  {
    path: '/clientes',
    component: MainLayout,
    children: [
      { path: '/clientes'                        , component: ClienteIndex   },
      { path: '/clientes/novo'                   , component: ClienteSalvar  },
      { path: '/clientes/editar/:cliente_id'     , component: ClienteSalvar     , props: true },
      { path: '/clientes/visualizar/:cliente_id' , component: ClienteVisualizar , props: true },
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', component: Home }
    ]
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
