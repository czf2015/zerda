const MainContainer = () => import('@/components/MainContainer')

const loadOfficialView = (path) => () => import(`@/pages/official/${path}`)
const loadDocumentView = (path) => () => import(`@/pages/document/${path}`)


export default {
  mode: 'history',
  base: '',// process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: MainContainer,
      redirect: '/official',
      name: 'official',
      meta: {
        title: '官网内容运营'
        // icon: 'nested'
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
      name: 'Document',
      component: MainContainer,
      redirect: '/document/category-management',
      meta: {
        title: '文档',
        requiresAuth: false,
        // icon: 'nested'
      },
      children: [
        {
          path: 'category-management',
          name: 'CategoryManagement',
          component: loadDocumentView('category-management'),
          meta: { title: '类别管理' }
        },
        {
          path: 'product-management',
          name: 'ProductManagement',
          component: loadDocumentView('product-management'),
          meta: { title: '产品管理' }
        },
        {
          path: 'document-editing',
          name: 'DocumentEditing',
          component: loadDocumentView('document-editing'),
          meta: { title: '文档编辑' }
        },
        {
          path: 'document-review',
          name: 'DocumentReview',
          component: loadDocumentView('document-review'),
          meta: { title: '文档编辑' }
        }
      ]
    },
    {
      path: '/official',
      component: MainContainer,
      redirect: '/official',
      name: 'official',
      meta: {
        title: '官网内容运营'
        // icon: 'nested'
      },
      children: [
        {
          path: 'header-navigate',
          name: 'HeaderNavigate',
          component: loadOfficialView('header-navigate'),
          meta: { title: '官网头部导航管理' }
        },
        {
          path: 'footer-navigate',
          name: 'FooterNavigate',
          component: loadOfficialView('footer-navigate'),
          meta: { title: '官网底部导航管理' }
        },
        {
          path: '',
          name: 'homePage',
          component: loadOfficialView('home'),
          meta: {
            title: '官网首页内容管理',
            requiresAuth: false,
          },
        },
        {
          path: 'dynamic',
          name: 'dynamic',
          component: MainContainer,
          redirect: '/official/dynamic/category',
          children: [
            {
              path: 'category',
              name: 'dynamicCategory',
              component: loadOfficialView('dynamic/category'),
              meta: {
                title: '官网动态页面类别管理',
                requiresAuth: false,
              },
            },
            {
              path: 'content/:categoryId',
              name: 'dynamic',
              component: loadOfficialView('dynamic'),
              meta: { title: '官网动态页面内容管理' }
            },
          ]
        },
        {
          path: 'static',
          name: 'static',
          component: MainContainer,
          redirect: '/official/static/category',
          children: [
            {
              path: 'category',
              name: 'staticCategory',
              component: loadOfficialView('static/category'),
              meta: { title: '官网静态页面类别管理' }
            },
            {
              path: 'content/:categoryId',
              name: 'staticContent',
              component: loadOfficialView('static'),
              meta: { title: '官网静态页面内容管理' }
            },
          ]
        },
      ]
    },
  ],
}