import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { getDay, getMonthAsEng, getYear } from '@/utils/tools';
import NuxtLink from '@/components/NuxtLink';
import { addFavorite, removeFavorite } from '@/apis/favorite';
import { useState } from '@/hooks';

interface IAuthor {
  bio?: number;
  following?: boolean;
  image?: string;
  username?: string;
}
interface IArticleItem {
  author?: IAuthor;
  body?: string;
  updatedAt?: string;
  favoritesCount?: number;
  favorited?: boolean; // 是否点赞
  title?: string;
  slug?: string;
  onFavorivedChange?: (slug: string, favorite: boolean) => void;
}
const ArticleItem = defineComponent({
  name: 'ArticleItem',
  props: {
    author: { type: Object as PropType<IAuthor>, default: {} },
    body: { type: String, default: '' },
    updatedAt: { type: String, default: new Date() },
    favoritesCount: { type: Number, default: 0 },
    favorited: { type: Boolean, default: false }, // 是否点赞
    title: { type: String, default: '' },
    slug: { type: String, default: '' },
    onFavorivedChange: {
      type: Function as PropType<(slug: string, favorite: boolean) => void>,
      default: (slug: string, favorite: boolean) => {}
    }
  },
  setup(props: IArticleItem) {
    const [isFavoriteing, setIsFavoriteing] = useState(false);
    const handleFavorite = () => {
      if (isFavoriteing.value) {
        return;
      }
      setIsFavoriteing(true);
      const { favorited, slug, onFavorivedChange } = props;
      if (!favorited) {
        addFavorite(slug).then(() => {
          console.info(slug);
        }).finally(() => {
          setIsFavoriteing(false)
        });
      } else {
        removeFavorite(slug).then(() => {
          console.info(slug);
        }).finally(() => {
          setIsFavoriteing(false)
        });
      }
      onFavorivedChange(slug, !favorited);
    };
    return () => {
      const {
        author,
        body,
        updatedAt,
        favoritesCount,
        favorited,
        title,
        slug
      } = props;
      return (
        <div class="article-preview">
          <div class="article-meta">
            <NuxtLink
              to="/profile"
              query={{
                username: author.username || '1'
              }}
            >
              <img src={author.image || ''} />
            </NuxtLink>
            <div class="info">
              <NuxtLink
                to="/profile"
                query={{
                  username: author.username || '1'
                }}
                class="author"
              >
                {author.username || ''}
              </NuxtLink>
              <span class="date">{`${getMonthAsEng(updatedAt)} ${getDay(
                updatedAt
              )}, ${getYear(updatedAt)}`}</span>
            </div>
            <button
              class={`btn btn-outline-primary btn-sm pull-xs-right ${
                favorited ? 'active' : ''
              } ${isFavoriteing.value ? 'disabled' : ''}`}
              onClick={handleFavorite}
            >
              <i class="ion-heart"></i> {favoritesCount}
            </button>
          </div>
          <NuxtLink
            to="/article"
            query={{
              slug: slug
            }}
            class="preview-link"
          >
            <h1>{title}</h1>
            <p>{body}</p>
            <span>Read more...</span>
          </NuxtLink>
        </div>
      );
    };
  }
});

export default ArticleItem;
