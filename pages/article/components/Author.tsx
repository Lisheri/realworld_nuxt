import type { PropType } from 'vue';
import { defineComponent, watch } from 'vue';
import { authorType } from './Banner';
import { useFavorite } from '@/hooks';
import NuxtLink from '@/components/NuxtLink';

// TODO 不定义在这里而是采用引入的方式会报错, 具体原因未知
const defaultAuthor = {
  following: false,
  image: '',
  username: ''
};
export default defineComponent({
  name: 'Author',
  props: {
    author: {
      type: Object as PropType<Partial<authorType>>,
      default: defaultAuthor
    },
    updateTime: { type: String, default: 'January 1st' },
    favorited: { type: String, default: false },
    slug: { type: String, default: '' },
    favoritesCount: { type: Number, default: 0 },
    disableFavorite: { type: Boolean, default: false },
    setDisableFavorite: {
      type: Function as PropType<(val: boolean) => void>,
      default: () => {}
    },
    onFavorivedChange: {
      type: Function as PropType<(slug: string, favorite: boolean) => void>,
      default: () => {}
    }
  },
  setup(props) {
    const { handleFavorite, isFavoriteing } = useFavorite(props);
    const onFavorite = () => {
      if (props.disableFavorite) {
        return;
      }
      handleFavorite();
    };
    watch(
      () => isFavoriteing.value,
      (newVal) => {
        props.setDisableFavorite(newVal);
      }
    );
    return () => {
      const {
        author: { username, image, following },
        updateTime,
        favorited,
        favoritesCount,
        disableFavorite
      } = props;
      return (
        <div class="article-meta">
          <NuxtLink
            to="/profile"
            query={{
              username: username
            }}
          >
            <img src={image} />
          </NuxtLink>
          <div class="info">
            <NuxtLink
              to="/profile"
              query={{
                username: username
              }}
              class="author"
            >
              {username}
            </NuxtLink>
            <span class="date">{updateTime}</span>
          </div>
          <button class={`btn btn-sm btn-outline-secondary ${following ? 'active' : ''}`}>
            <i class="ion-plus-round"></i>
            &nbsp; {`Follow ${username}`} <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button
            class={`btn btn-sm btn-outline-primary ${
              favorited ? 'active' : ''
            } ${disableFavorite ? 'disabled' : ''}`}
            onClick={onFavorite}
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">({favoritesCount})</span>
          </button>
        </div>
      );
    };
  }
});
