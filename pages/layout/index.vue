<script lang="tsx">
import { defineComponent, computed } from 'vue';
import { topLinkConfig } from './config';
import { useRoute } from 'vue-router';
import { useState } from '@/hooks';
import LayoutFooter from './components/footer';
import LayoutTop from './components/top';

export default defineComponent({
  name: 'LayoutIndex',
  setup() {
    const route = useRoute();
    const currentName = computed(() => route.name);
    const [userInfo] = useState({});
    const [isLogin, setIsLogin] = useState(false);
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
<style lang="scss" scoped></style>
