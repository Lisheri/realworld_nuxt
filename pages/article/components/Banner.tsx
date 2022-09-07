import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import Author from './Author';
export type authorType = {
  following: boolean;
  image: string;
  username: string;
};
export const defaultAuthor = {
  following: false,
  image: '',
  username: ''
};
export default defineComponent({
  name: 'Banner',
  props: {
    title: { type: String, default: '' },
    author: {
      type: Object as PropType<Partial<authorType>>,
      default: defaultAuthor
    },
    updateTime: { type: String, default: 'January 1st' },
    favorited: { type: String, defualt: false },
    favoritesCount: { type: Number, defualt: 0 },
    slug: { type: String, default: '' },
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
    return () => {
      const {
        title,
        author,
        updateTime,
        favorited,
        favoritesCount,
        slug,
        disableFavorite,
        setDisableFavorite,
        onFavorivedChange
      } = props;
      return (
        <div class="banner">
          <div class="container">
            <h1>{title}</h1>
            <Author
              author={author}
              updateTime={updateTime}
              favorited={favorited}
              favoritesCount={favoritesCount}
              slug={slug}
              disableFavorite={disableFavorite}
              setDisableFavorite={setDisableFavorite}
              onFavorivedChange={onFavorivedChange}
            />
          </div>
        </div>
      );
    };
  }
});
