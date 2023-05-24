import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import login from '@/components/Login/login';
import cadastro from '@/components/Login/cadastro';
import cadastrolivro from '@/components/admin/cadastrolivro'
import telaAdmin from '@/components/admin/telaAdmin'
import livrosdisponiveis from '../components/admin/livrosdisponiveis.vue'
import reservas from '@/components/admin/reservas'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: cadastro
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/cadastrolivro',
      name: 'cadastrolivro',
      component: cadastrolivro
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/telaAdmin',
      name: 'telaAdmin',
      component: telaAdmin
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: reservas
    },
    {
      path: '/livrosdisponiveis',
      name: 'livrosdisponiveis',
      component: livrosdisponiveis
    },
  ],
});
