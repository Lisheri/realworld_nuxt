import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Input',
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' }
  },
  emits: ['update:value', 'input', 'change'],
  setup(props, { emit, attrs }) {
    const onChange = (e) => {
      emit('change', e);
      emit('update:value', e.target.value);
    };
    const onInput = (e) => {
      emit('input', e);
      emit('update:value', e.target.value);
    };
    return () => {
      const { type, placeholder, value } = props;
      return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          autocomplete="off"
          onInput={onInput}
          onChange={onChange}
          {...attrs}
        />
      );
    };
  }
});
