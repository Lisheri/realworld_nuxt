import { useUserStore } from '@/store';

const logReg = ['login', 'register'];
const noAuthPages = [...logReg, 'home'];

// 全局中间件
export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore();
  if (!noAuthPages.includes(to.name as string || '') && !store.isLogin) {
    return navigateTo('/login')
  } else if (logReg.includes(to.name as string) && store.isLogin) {
    return navigateTo('/')
  }
});
