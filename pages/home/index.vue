<script lang="tsx">
import { defineComponent, onMounted } from 'vue';
import HomeHeader from './components/HomeHeader';
import { useState } from '@/hooks';
import { getArticleList, getTags, getArticleFeed } from '@/apis/articles';
import ArticleItem from './components/ArticleItem';
import Pagination from './components/Pagination';
import Banner from './components/Banner';
import Tags from './components/Tags';
import { useUserStore } from '@/store';
const getPages = (count: number, limit: number) => ((count / limit) >>> 0) + 1;

export default defineComponent({
  name: 'HomeIndex',
  async setup() {
    const limit = 20;
    const [current, setCurrent] = useState('Global Feed');
    const [isFeed, setIsFeed] = useState(false);
    const store = useUserStore();
    const onTabChange = (val: string) => {
      if (val === 'Your Feed') {
        setIsFeed(true);
      } else {
        setIsFeed(false);
      }
      setCurrent(val);
      setCurPage(1);
    };
    const [curPage, setCurPage] = useState(1);
    const [curTag, setCurTag] = useState('');
    const params = computed(() => ({
      tag: curTag.value === current.value ? curTag.value : undefined,
      limit,
      offset: (curPage.value - 1) * limit,
    }));
    const feedParams = computed(() => {
      return {

      }
      // author: isAuthor.value ? store.getUserInfo.username : undefined
    })
    const getList = (params) => {
      const { limit, offset } = params;
      const getList = isFeed.value ? getArticleFeed({limit, offset}) : getArticleList(params)
      getList.then((res: any) => {
        setArticles(res?.articles || []);
        setPagesNum(getPages(res?.articlesCount, limit));
      });
    };
    watch(
      () => params.value,
      (newVal) => {
        getList(newVal);
      }
    );
    const [articles, setArticles] = useState([]);
    const [pagesNum, setPagesNum] = useState(0);
    const [tags, setTags] = useState([]);
    const initData = () => {
      return Promise.all([getArticleList(params.value), getTags()]);
    };
    onMounted(() => {
      if (process.client) {
        initData().then((res: any) => {
          setArticles((res)?.[0]?.articles || []);
          setTags((res)?.[1]?.tags || []);
          setPagesNum(getPages((res)?.[0]?.articlesCount, limit));
        })
      }
    })
    const { data } = await useAsyncData('home', () => initData());
    setArticles((data?.value as any)?.[0]?.articles || []);
    setTags((data?.value as any)?.[1]?.tags || []);
    setPagesNum(getPages((data?.value as any)?.articlesCount, limit));

    const handleTagChange = (tag) => {
      onTabChange(tag)
    };
    const onFavorivedChange = (slug: string, favorite: boolean) => {
      setArticles(articles.value.map(item => {
        if (item.slug === slug) {
          return {...item, favorited: favorite }
        }
        return item;
      }))
    }

    return () => (
      <div class="home-page">
        <Banner />
        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <HomeHeader
                value={current.value}
                curTag={curTag.value}
                onChange={onTabChange}
              />
              {articles.value.length ? articles.value.map((item) => (
                <ArticleItem {...item} key={item.slug} onFavorivedChange={onFavorivedChange}/>
              )) : <div class="empty">暂无数据</div>}
              <Pagination
                v-model={[curPage.value, 'value']}
                pages={pagesNum.value}
              />
            </div>
            <Tags
              tags={tags.value}
              v-model={[curTag.value, 'value']}
              onChange={handleTagChange}
            />
          </div>
        </div>
      </div>
    );
  }
});
</script>
<style lang="scss" scoped>
  .empty {
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
  }
</style>
