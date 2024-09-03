import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'home', component: () => import('src/modules/shared/pages/IndexPage.vue') },
      { path: '/evaluaciones', name: 'Evaluations', component: () => import('src/modules/evaluations/pages/Evaluations.vue') },
      { path: '/evaluacion', name: 'FormEvaluation', component: () => import('src/modules/evaluations/pages/FormEvaluation.vue') },
      { path: '/resultados', name: 'Results', component: () => import('src/modules/results/pages/Results.vue') },
      { path: '/resultado', name: 'FormResult', component: () => import('src/modules/results/pages/FormResult.vue') },
    ],
  },
  
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/shared/pages/ErrorNotFound.vue'),
  },

];

export default routes;
