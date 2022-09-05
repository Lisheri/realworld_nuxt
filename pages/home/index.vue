<script lang="tsx">
import { defineComponent, reactive } from 'vue';
import HomeHeader from './components/HomeHeader';
import { useState } from '@/hooks';
import { getArticleList, getTags } from '@/apis/articles';
import ArticleItem from './components/ArticleItem';
import Pagination from './components/Pagination';
import Banner from './components/Banner';
import Tags from './components/Tags';
const getPages = (count: number, limit: number) => ((count / limit) >>> 0) + 1;

export default defineComponent({
  name: 'HomeIndex',
  async setup() {
    const limit = 20;
    const [current, setCurrent] = useState(2);
    const onTabChange = (val: 1 | 2) => {
      setCurrent(val);
    };
    const [curPage] = useState(1);
    const [curTag] = useState('');
    const getTag = (tag: string) => {
      if (tag) {
        if (tag === 'all') return undefined;
        return tag;
      } else {
        return undefined;
      }
    };
    const params = computed(() => ({
      tag: getTag(curTag.value),
      limit,
      offset: (curPage.value - 1) * limit
    }));
    const getList = (params) => {
      getArticleList(params).then((res: any) => {
        setArticles(res?.articles || []);
        setPagesNum(getPages(res?.articlesCount, limit));
      });
    };
    watch(
      () => params.value,
      (newVal) => {
        console.info(newVal);
        getList(newVal);
      }
    );
    const [articles, setArticles] = useState([]);
    const [pagesNum, setPagesNum] = useState(0);
    const [tags, setTags] = useState([]);
    const initData = () => {
      return Promise.all([getArticleList(params.value), getTags()]);
    };
    const { data } = await useAsyncData('home', () => initData());
    setArticles((data?.value as any)?.[0]?.articles || []);
    setTags((data?.value as any)?.[1]?.tags || []);
    setPagesNum(getPages((data?.value as any)?.articlesCount, limit));

    return () => (
      <div class="home-page">
        <Banner />
        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <HomeHeader value={current.value} onChange={onTabChange} />
              {articles.value.map((item) => (
                <ArticleItem {...item} key={item.slug} />
              ))}
              <Pagination
                v-model={[curPage.value, 'value']}
                pages={pagesNum.value}
              />
            </div>
            <Tags tags={tags.value} v-model={[curTag.value, 'value']} />
          </div>
        </div>
      </div>
    );
  }
});
</script>
<style lang="scss" scoped></style>
