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