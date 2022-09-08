import { defineComponent } from 'vue';
import NextLink from '@/components/NuxtLink';

export default defineComponent({
  name: 'xxx',
  props: {
    username: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => {
      const { username, imgUrl, time, content } = props;
      return (
        <div class="card">
          <div class="card-block">
            <p class="card-text">{content}</p>
          </div>
          <div class="card-footer">
            <NextLink
              class="comment-author"
              to="/profile"
              query={{
                username
              }}
            >
              {imgUrl ? <img src={imgUrl} class="comment-author-img" /> : ''}
            </NextLink>
            &nbsp;
            <NextLink
              class="comment-author"
              to="/profile"
              query={{
                username
              }}
            >
              {username}
            </NextLink>
            <span class="date-posted">{time}</span>
          </div>
        </div>
      );
    };
  }
});
