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
    ],
}