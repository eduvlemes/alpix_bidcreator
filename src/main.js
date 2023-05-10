import { createApp } from 'vue';
import ListaRegistros from './components/ListaRegistros.vue';
import { createRouter, createWebHistory } from 'vue-router';

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

createApp(ListaRegistros).use(router).mount('#app');
