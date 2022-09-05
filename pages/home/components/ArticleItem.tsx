import type { FunctionalComponent } from 'vue';
import { getDay, getMonthAsEng } from '@/utils/tools';
import NuxtLink from '@/components/NuxtLink';

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
}
const ArticleItem: FunctionalComponent<IArticleItem> = (props) => {
  const {
    author = {} as IAuthor,
    body = '',
    updatedAt = '',
    favoritesCount = 0,
    favorited = false,
    title = '',
    slug = ''
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
          )}`}</span>
        </div>
        <button
          class={`btn btn-outline-primary btn-sm pull-xs-right ${
            favorited ? 'active' : ''
          }`}
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

export default ArticleItem;
