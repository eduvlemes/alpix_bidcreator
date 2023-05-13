import { createApp } from 'vue';
import App from './App.vue';
import ListaRegistros from './components/ListaRegistros.vue';
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
  ],
});

createApp(App).use(router).mount('#app');