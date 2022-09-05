import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NuxtLink',
  props: {
    to: { type: String, default: '/' },
    query: { type: Object }
  },
  setup(props, { slots }) {
    const router = useRouter();
    const toLink = () => {
      router.push({
        path: props.to,
        query: props.query
      });
    };
    return () => (
      <a href="javaScript:;" onClick={toLink}>
        {slots.default?.()}
      </a>
    );
  }
});
