import { getAction } from './manage';

export const getArticleList = (params) => getAction('/articles', params);

// * 获取标签
export const getTags = () => getAction('/tags');

export const getArticleFeed = (params) => getAction('/articles/feed', params)

export const getArticleInfo = (slug: string) => getAction(`/articles/${slug}`);
