import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { useUserStore } from '@/store';
import '../header.scss';
const config = [
  {
    text: 'Your Feed',
    activeKey: 1
  },
  {
    text: 'Global Feed',
    activeKey: 2
  }
];
// import { useState } from '@/hooks';

export default defineComponent({
  name: 'HomeHeader',
  props: {
    value: { type: Number, default: 0 },
    onChange: { type: Function as PropType<(val: number | string) => void> }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const store = useUserStore();
    const isLogin = computed(() => store.isLogin);
    const onChange = (val: 1 | 2) => {
      emit('update:value', val);
      props.onChange(val);
    };
    return () => {
      const { value } = props;
      return (
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            {config.map((item) => (
              <li class="nav-item">
                <span
                  key={item.activeKey}
                  class={`nav-link ${
                    !isLogin.value && item.activeKey === 1 ? 'disabled' : ''
                  } ${value === item.activeKey ? 'active' : ''}`}
                  onClick={onChange.bind(null, item.activeKey)}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    };
  }
});
