// hacky 方法
import path from 'path';
const resolve = (url: string) => path.resolve(__dirname, url);

export default [
  {
    name: 'LayoutIndex',
    path: '/',
    file: resolve('pages/layout/index.vue'),
    children: [
      {
        name: 'home',
        path: '',
        file: resolve('pages/home/index.vue'),
        // children: []
      },
      {
        name: 'login',
        path: '/login',
        file: resolve('pages/login/index.vue'),
      },
      {
        name: 'register',
        path: '/register',
        file: resolve('pages/login/index.vue'),
      },
      {
        name: 'profile',
        path: '/profile/:username',
        file: resolve('pages/profile/index.vue'),
      },
      {
        name: 'settings',
        path: '/settings',
        file: resolve('pages/settings/index.vue'),
      },
      {
        name: 'editor',
        path: '/editor',
        file: resolve('pages/editor/index.vue'),
      },
      {
        name: 'article/:slug',
        path: '/article',
        file: resolve('pages/article/index.vue'),
      }
    ]
  },
]