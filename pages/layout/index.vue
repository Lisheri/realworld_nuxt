<script lang="tsx">
import { defineComponent, computed } from 'vue';
import { topLinkConfig } from './config';
import { useRoute } from 'vue-router';
import { useState } from '@/hooks';
import LayoutFooter from './components/footer';
import LayoutTop from './components/top';
import { useUserStore } from '@/store';

export default defineComponent({
  name: 'LayoutIndex',
  setup() {
    const store = useUserStore();
    const route = useRoute();
    const currentName = computed(() => route.name);
    const userInfo = computed(() => {
      const { id = 1, image: img, username } = store.getUserInfo;
      return {
        id,
        img,
        username
      }
    })
    // const [isLogin, setIsLogin] = useState(false);
    const isLogin = computed(() => store.isLogin);
    const topConfigs = topLinkConfig(isLogin, userInfo);
    return () => (
      <div>
        <LayoutTop config={topConfigs.value} currentName={currentName.value as string} />
        <nuxt-page />
        <LayoutFooter />
      </div>
    );
  }
});
</script>
<style lang="scss">
@import '@/assets/global/main.css'
</style>
