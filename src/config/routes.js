export default {
    mode: 'history',
    base: '',// process.env.BASE_URL,
    routes: [
        {
            path: '',
            name: 'home',
            component: () => import('@/pages/home'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/demos/:componentName',
            name: 'demos-component',
            component: () => import('@/pages/demos/_componentName'),
            meta: {
                requiresAuth: false,
            },
        },
    ],
}