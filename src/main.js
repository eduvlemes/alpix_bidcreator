import { createApp } from 'vue';
import App from './App.vue';
import ListaRegistros from './components/ListaRegistros.vue';
import GeraContrato from './components/GeraContrato.vue';
import GeraProposta from './components/GeraProposta.vue';
import GetPayments from './components/GetPayments.vue';
import MakeBriefing from './components/MakeBriefing.vue';
import { createRouter, createWebHistory } from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/bid/:id',
      name: 'ListaRegistros',
      component: ListaRegistros,
    },
    {
      path: '/contract/:id',
      name: 'GeraContrato',
      component: GeraContrato,
    },
    {
      path: '/proposal/:id',
      name: 'GeraProposta',
      component: GeraProposta,
    },
    {
      path: '/payments/:user',
      name: 'GetPayments',
      component: GetPayments,
    },
    {
      path: '/briefing/:type',
      name: 'MakeBriefing',
      component: MakeBriefing,
    },
  ],
});

createApp(App).use(router).mount('#app');