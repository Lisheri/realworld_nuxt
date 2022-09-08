import { defineComponent, onMounted, PropType } from 'vue';
import CommitItem from './CommitItem';
import { getComments } from '@/apis/articles';
import { useState } from '@/hooks';
import { getMonthAsEng, getDay } from '@/utils/tools';
import { authorType } from './Banner';

const getTime = (time: string) => `${getMonthAsEng(time)} ${getDay(time)}`;

type commentType = {
  author: Record<string, any>;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
};
// interface ICommentGetType {
//   comments: Array<commentType>;
// }
export default defineComponent({
  name: 'ArticleCommit',
  props: {
    slug: {
      type: String,
      default: ''
    },
    author: {
      type: Object as PropType<Partial<authorType>>,
      default: {
        following: false,
        image: '',
        username: ''
      }
    }
  },
  setup(props) {
    const [list, setList] = useState<commentType[]>([]);
    onMounted(() => {
      getComments(props.slug).then((res: any) => {
        console.info(res.comments);
        setList(res.comments);
      });
    });
    return () => {
      return (
        <>
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              {props.author.image ? (
                <img src={props.author.image} class="comment-author-img" />
              ) : (
                ''
              )}
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>
          {list.value && list.value.length
            ? list.value.map((item) => (
                <CommitItem
                  key={item.id}
                  username={item.author.username}
                  imgUrl={item.author.image}
                  content={item.body}
                  time={getTime(item.updatedAt)}
                />
              ))
            : '暂无评论'}
        </>
      );
    };
  }
});
