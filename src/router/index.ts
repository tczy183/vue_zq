import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    name: 'Home',
    meta: {},
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/Index.vue'),
        name: 'HomeDemo',
        meta: {
          title: t('router.home'),
          icon: 'vi-cib:telegram-plane',
          affix: true
        }
      }
    ]
  },
  {
    path: '/alarmLog',
    component: Layout,
    name: 'AlarmLog',
    meta: {},
    children: [
      {
        path: 'alarmLog',
        component: () => import('@/views/alarmLog/Index.vue'),
        name: 'AlarmLogDemo',
        meta: {
          title: t('router.alarmLog'),
          icon: 'vi-cib:telegram-plane'
        }
      }
    ]
  },
  {
    path: '/recipeLog',
    component: Layout,
    name: 'RecipeLog',
    meta: {},
    children: [
      {
        path: 'recipeLog',
        component: () => import('@/views/recipeLog/Index.vue'),
        name: 'RecipeLogDemo',
        meta: {
          title: t('router.recipeLog'),
          icon: 'vi-cib:telegram-plane'
        }
      }
    ]
  },
  {
    path: '/stateDisplay',
    component: Layout,
    name: 'StateDisplay',
    meta: {},
    children: [
      {
        path: 'stateDisplay',
        component: () => import('@/views/stateDisplay/Index.vue'),
        name: 'StateDisplayDemo',
        meta: {
          title: t('router.stateDisplay'),
          icon: 'vi-cib:telegram-plane'
        }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    name: 'Log',
    meta: {},
    children: [
      {
        path: 'log',
        component: () => import('@/views/log/index.vue'),
        name: 'LogDemo',
        meta: {
          title: t('router.log'),
          icon: 'vi-cib:telegram-plane'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
