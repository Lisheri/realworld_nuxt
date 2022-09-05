import type { FunctionalComponent } from 'vue';
type tagsPropsType = {
  tags: Array<string>;
};
const Tags: FunctionalComponent<tagsPropsType> = ({ tags = [] }, { emit }) => {
  const onChange = (tag: string) => {
    emit('update:value', tag);
  };
  return (
    <div class="col-md-3">
      <div class="sidebar">
        <p>Popular Tags</p>

        <div class="tag-list">
          {[...tags, 'all'].map((item) => (
            <a
              href="javaScript:;"
              key={item}
              class="tag-pill tag-default"
              onClick={onChange.bind(null, item)}
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
