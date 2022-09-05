import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Pagination',
  emits: ['update:value'],
  props: {
    value: { type: Number },
    pages: { type: Number, default: 100 }
  },
  setup(props, { emit }) {
    const onChange = (page: number) => {
      emit('update:value', page);
    };
    const pageArr = computed(() => [...new Array(props.pages).keys()]);
    return () => (
      <nav>
        <ul class="pagination">
          {pageArr.value.map((item) => (
            <li class={`page-item ${item + 1 === props.value ? 'active' : ''}`}>
              <a
                class="page-link ng-binding"
                href="javaScript:;"
                onClick={onChange.bind(null, item + 1)}
              >
                {item + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
});
