import type { Ref, ComputedRef } from 'vue';
import { ref, computed } from 'vue';

interface IConfigType {
  path: string;
  name: string;
  text: string;
  icon: string;
  imgSrc: string
}

export type topConfigType = Partial<IConfigType>[];

export type userInfoType = Partial<{
  id: number | string;
  img: string;
  username: string
}>

const commonConfig = [
  {
    path: '/',
    name: 'home',
    text: 'Home'
  }
]

const loginConfig = (userInfo: userInfoType) => [
  {
    path: '/editor',
    name: 'editor',
    text: 'New Article',
    icon: 'ion-compose'
  },
  {
    path: '/settings',
    name: 'settings',
    text: 'Settings',
    icon: 'ion-gear-a'
  },
  {
    path: `/profile/${userInfo.id || 1}`,
    imgSrc: userInfo.img || 'https://avatars.githubusercontent.com/u/49238808?s=40&v=4',
    text: userInfo.username || '测试昵称'
  }
]

const unLoginConfig = [
  {
    path: '/login',
    name: 'login',
    text: 'Sign in'
  },
  {
    path: '/register',
    name: 'register',
    text: 'Sign up'
  }
]

export const topLinkConfig = (isLogin = ref(false), userInfo: Ref<userInfoType> = ref({})): ComputedRef<topConfigType> => computed(() => [
  ...commonConfig,
  ...isLogin.value ? loginConfig(userInfo.value) : unLoginConfig
]);
