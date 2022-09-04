import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NuxtLink',
  props: {
    to: { type: String, default: '/' }
  },
  setup(props, { slots }) {
    const router = useRouter();
    const toLink = () => {
      router.push({
        path: props.to
      });
    };
    return () => (
      <a href="javaScript:;" onClick={toLink}>
        {slots.default?.()}
      </a>
    );
  }
});
