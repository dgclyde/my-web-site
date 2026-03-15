import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import { isAdminEmail } from '@/lib/constants'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
  },
  // Admin routes (hidden from navigation)
  {
    path: '/admin',
    redirect: '/admin/messages',
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLoginView.vue'),
  },
  {
    path: '/admin/messages',
    name: 'admin-messages',
    component: () => import('@/views/admin/AdminMessagesView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  // Catch-all 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// Navigation guard for protected routes
router.beforeEach(async (to, _from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Not authenticated, redirect to login
      next({ name: 'admin-login', query: { redirect: to.fullPath } })
      return
    }

    // Check if route requires admin access
    if (to.meta.requiresAdmin) {
      const userEmail = session.user?.email
      if (!isAdminEmail(userEmail)) {
        // Authenticated but not an admin
        next({ name: 'not-found' })
        return
      }
    }
  }

  next()
})

export default router
