import type { FunctionalComponent } from 'vue';
type tagsPropsType = {
  tags: Array<string>;
  onChange: (tag: string) => void;
};
const Tags: FunctionalComponent<tagsPropsType> = ({ tags = [], onChange }, { emit }) => {
  const onTagChange = (tag: string) => {
    emit('update:value', tag);
    onChange(tag);
  };
  return (
    <div class="col-md-3">
      <div class="sidebar">
        <p>Popular Tags</p>

        <div class="tag-list">
          {tags.map((item) => (
            <a
              href="javaScript:;"
              key={item}
              class="tag-pill tag-default"
              onClick={onTagChange.bind(null, item)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
