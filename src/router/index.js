import Vue from 'vue';
import iView from 'iview';
// import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};  

export const router = new VueRouter(RouterConfig);

router.beforeEach((to,from,next) =>{
    iView.LoadingBar.start();
      if(to.path == '/login' || router.app.$options.store.getters.isLogin == true){
      next();
    }
    else{
        next('/login');
      }

  })
  
router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


