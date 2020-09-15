// import App from "../App.vue"
export default {
    mode: 'history',
    base: '',// process.env.BASE_URL,
    routes: [
        {
            path: '/demos/:componentName',
            name: 'demos-component',
            component: () => import('@/pages/demos/_componentName'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/header',
            name: 'header',
            component: () => import('@/pages/header'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/footer',
            name: 'footer',
            component: () => import('@/pages/home'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '',
            name: 'home',
            component: () => import('@/pages/home'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/categories',
            name: 'categories',
            component: () => import('@/pages/categories'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/review',
            name: 'review',
            component: () => import('@/pages/review'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/document',
            component: () => import('@/pages/document'),
            redirect: '/document/category-management',
            name: 'Document',
            meta: {
              title: '文档',
              requiresAuth: false,
              // icon: 'nested'
            },
            children: [
              {
                path: 'category-management',
                component: () => import('@/pages/document/category-management'),
                name: 'CategoryManagement',
                meta: { title: '类别管理' }
              },
              {
                path: 'product-management',
                component: () => import('@/pages/document/product-management'),
                name: 'ProductManagement',
                meta: { title: '产品管理' }
              },
              {
                path: 'document-editing',
                component: () => import('@/pages/document/document-editing'),
                name: 'DocumentEditing',
                meta: { title: '文档编辑' }
              }
            ]
          },
    ],
}