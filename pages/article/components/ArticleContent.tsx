import { defineComponent, computed } from 'vue';
import MarkdownIt from 'markdown-it';
export default defineComponent({
  name: 'ArticleContent',
  props: {
    content: { type: String, default: '' }
  },
  setup(props) {
    const md = new MarkdownIt();
    const content = computed(() => md.render(props.content));
    return () => {
      return (
        <div class="row article-content">
          <div class="col-md-12">{content.value}</div>
        </div>
      );
    };
  }
});
