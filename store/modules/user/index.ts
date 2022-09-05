import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';
import jsCookie from 'js-cookie';

// 仅在客户端加载 js-cookie包
const Cookie = process.client ? jsCookie : undefined;


export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // * 当前登录用户的登录状态
      user: null
    }
  },
  actions: {
    setUser(user) {
      this.user = user
      // 为了防止刷新页面数据丢失, 需要将数据持久化存储
      Cookie?.set?.('user', JSON.stringify(user))
    },
    // nuxt中特殊的action方法, 会在服务端渲染期间, 自动调用, 仅在SSR期间运行
    // 主要作用是: 初始化容器数据, 传递数据给客户端使用
    // async nuxtServerInit ({ dispatch }, { req, redirect, $pinia }) {
    //   if (!req.url.includes('/auth/')) {
    //     const store = useSessionStore($pinia)
  
    //     try {
    //       await store.me() // load user information from the server-side before rendering on client-side
    //     } catch (e) {
    //       redirect('/auth/login') // redirects to login if user is not logged in
    //     }
    //   }
    // }
  },
  getters: {
    getUserInfo: (state) => state.user,
    getToken: (state): string => state?.user?.token || '',
    isLogin: (state) => !!state?.user?.token
  },
});
