import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

// export const page404 = {
//     path: '/*',
//     name: 'error-404',
//     meta: {
//         title: '404-页面不存在'
//     },
//     component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
// };

// export const page403 = {
//     path: '/403',
//     meta: {
//         title: '403-权限不足'
//     },
//     name: 'error-403',
//     component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
// };

// export const page500 = {
//     path: '/500',
//     meta: {
//         title: '500-服务端错误'
//     },
//     name: 'error-500',
//     component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
// };

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'SQLDetail', title: {i18n: 'SQLDetail'}, name: 'sqldetail', component: resolve => { require(['@/views/mysql/history/SQLDetail.vue'], resolve); } },        
        { path: 'submit', title: {i18n: 'submit'}, name: 'submit', component: resolve => { require(['@/views/mysql/instances/Submit.vue'], resolve); } },
        { path: 'Session', title: {i18n: 'Session'}, name: 'Session', component: resolve => { require(['@/views/mysql/instances/Session.vue'], resolve); } },
        { path: 'submitsqlhistory', title: {i18n: 'submitsqlhistory'}, name: 'submitsqlhistory', component: resolve => { require(['@/views/mysql/history/history.vue'], resolve); } },
        { path: 'statistics', title: {i18n: 'statistics'}, name: 'statistics', component: resolve => { require(['@/views/mysql/statistics/statistics.vue'], resolve); } },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/mysql',
        icon: 'ios-folder',
        name: 'mysql',
        title: 'MySQL',
        component: Main,
        children: [
            {
                path: 'instances',
                icon: 'ios-paper-outline',
                name: 'instances',
                title: 'instances',
                component: resolve => { require(['@/views/mysql/instances/instances.vue'], resolve); }
            },
            {
                path: 'history',
                icon: 'ios-list-outline',
                name: 'history',
                title: '上线记录',
                component: resolve => { require(['@/views/mysql/history/history.vue'], resolve); }
            },

        ]
    },
    {
        path: '/statistics_instance',
        icon: 'ios-folder',
        name: 'statistics_instance',
        title: 'statistics_instance',
        component: Main,
        children: [

            {
                path: 'instances_statistics',
                icon: 'ios-paper-outline',
                name: 'instances_statistics',
                title: 'instances',
                component: resolve => { require(['@/views/mysql/statistics/instances.vue'], resolve); }
            },
        ]
    },

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    // page500,
    // page403,
    // page404,
    {path:'*',redirect:'/login'}
];
