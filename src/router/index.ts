import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import IndexTestPage from '@/pages/test-pages/IndexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/tests',
      redirect: { name: 'test' },
      children: [
        {
          path: '',
          name: 'test',
          component: IndexTestPage
        },
        {
          path: 'summary',
          name: 'test-summary',
          component: () => import('@/pages/test-pages/SummaryPage.vue')
        }
      ]
    }
  ]
})

export default router
