const MainContainer = () => import('@/components/MainContainer')
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
            component: () => import('@/pages/footer'),
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '',
            name: 'homePage',
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
            path: '/staticpage',
            name: 'StaticPage',
            component: MainContainer,
            redirect: '/staticpage/staticpage-category',
            meta: {
                requiresAuth: false,
            },
            children: [
              {
                path: 'staticpage-category',
                component: () => import('@/pages/staticpage/staticpage-category'),
                name: 'StaticPageContentCategory',
                meta: { title: '静态页面类别管理' }
              },
              {
                path: 'staticpage-content/:pageId',
                component: () => import('@/pages/staticpage/staticpage-content'),
                name: 'StaticPageContent',
                meta: { title: '静态页面内容管理' }
              },
            ]
        },
        {
            path: '/document',
            component: MainContainer,
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
              },
              {
                path: 'document-review',
                component: () => import('@/pages/document/document-review'),
                name: 'DocumentReview',
                meta: { title: '文档编辑' }
              }
            ]
        },
        {
            path: '/skypegmwcn',
            component: MainContainer,
            redirect: '/skypegmwcn/header-navigate',
            name: 'Skypegmwcn',
            meta: {
              title: '官网内容运营'
              // icon: 'nested'
            },
            children: [
              {
                path: 'header-navigate',
                component: () => import('@/pages/skypegmwcn/header-navigate/index'),
                name: 'HeaderNavigate',
                meta: { title: '官网头部导航管理' }
              },
              {
                path: 'footer-navigate',
                component: () => import('@/pages/skypegmwcn/footer-navigate/index'),
                name: 'FooterNavigate',
                meta: { title: '官网底部导航管理' }
              },
              {
                path: 'home-page',
                component: () => import('@/pages/skypegmwcn/home-page/index'),
                name: 'HomePage',
                meta: { title: '官网首页内容管理' }
              }
            ]
          },
    ],
}