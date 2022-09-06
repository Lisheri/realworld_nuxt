import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import { useUserStore } from '@/store';
import '../header.scss';
const config = ['Global Feed'];
// import { useState } from '@/hooks';

export default defineComponent({
  name: 'HomeHeader',
  props: {
    value: { type: String, default: '' },
    curTag: { type: String, default: '' },
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
    const allConfig = computed(() => {
      const realConfig = isLogin.value ? ['Your Feed', ...config] : config;
      return props.curTag ? realConfig.concat(props.curTag) : realConfig
    });
    return () => {
      const { value, curTag } = props;
      return (
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            {allConfig.value.map((item) => (
              <li class="nav-item">
                <span
                  key={item}
                  class={`nav-link ${
                    !isLogin.value && item === 'Your Feed' ? 'disabled' : ''
                  } ${value === item ? 'active' : ''}`}
                  onClick={onChange.bind(null, item)}
                >
                  {props.curTag !== item ? item : `#${item}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    };
  }
});
