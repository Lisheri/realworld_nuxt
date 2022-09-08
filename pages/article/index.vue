<script lang="tsx">
import { defineComponent, computed, onMounted } from 'vue';
import Banner from './components/Banner';
import ArticleContent from './components/ArticleContent';
import Author from './components/Author';
import ArticleCommit from './components/ArticleCommit';
import { useRoute } from 'vue-router';
import { getArticleInfo } from '@/apis/articles';
import { useState } from '@/hooks';
import { getMonthAsEng, getDay } from '@/utils/tools';

const getTime = (time: string) => `${getMonthAsEng(time)}${getDay(time)}`;
export default defineComponent({
  name: 'ArticleIndex',
  async setup() {
    const route = useRoute();
    const slug = computed(() => (route.query.slug as string) || '');
    const initData = () => {
      useHead({
        title: `realWorld`,
        meta: [
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      })
      return Promise.all([getArticleInfo(slug.value)]);
    };
    onMounted(() => {
      if (process.client) {
        initData().then((res: any) => {
          setArticle(res[0].article)
        })
      }
    })

    const { data } = await useAsyncData('home', () => initData());

    const [article, setArticle] = useState(
      (data.value?.[0] as any)?.article || {}
    );

    const [disableFavorite, setDisableFavorite] = useState(false);

    const title = computed(() => article.value.title);

    const author = computed(() => article.value.author);

    const updateTime = computed(() => getTime(article.value.updatedAt));

    const articleBody = computed(() => article.value.body);

    const favorited = computed(() => article.value.favorited);

    const favoritesCount = computed(() => article.value.favoritesCount);

    const onFavorivedChange = (_slug: string, favorite: boolean) => {
      setArticle({ ...article.value, favorited: favorite });
    };
    console.info(article.value);
    return () => (
      <div class="article-page">
        <Banner
          title={title.value}
          author={author.value}
          updateTime={updateTime.value}
          favorited={favorited.value}
          favoritesCount={favoritesCount.value}
          slug={route.query.slug as string}
          disableFavorite={disableFavorite.value}
          onFavorivedChange={onFavorivedChange}
        />
        <div class="container page">
          <ArticleContent content={articleBody.value} />
          <hr />
          <div class="article-actions">
            <Author
              author={author.value}
              updateTime={updateTime.value}
              favorited={favorited.value}
              favoritesCount={favoritesCount.value}
              slug={route.query.slug as string}
              disableFavorite={disableFavorite.value}
              onFavorivedChange={onFavorivedChange}
              setDisableFavorite={setDisableFavorite}
            />
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <ArticleCommit slug={slug.value} author={author.value}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
</script>
<style lang="scss" scoped></style>
