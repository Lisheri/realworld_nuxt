import type { FunctionalComponent } from 'vue';
import NuxtLink from '@/components/NuxtLink';
export const ToLoginOrRegister: FunctionalComponent<{ isLogin: boolean }> = (
  props
) => {
  return !props.isLogin ? (
    <NuxtLink to='/login'>Have an account?</NuxtLink>
  ) : (
    <NuxtLink to='/register'>Need an account?</NuxtLink>
  );
};
