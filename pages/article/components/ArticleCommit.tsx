import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArticleCommit',
  setup() {
    return () => {
      return (
        <form class="card comment-form">
          <div class="card-block">
            <textarea
              class="form-control"
              placeholder="Write a comment..."
              rows="3"
            ></textarea>
          </div>
          <div class="card-footer">
            <img
              src="http://i.imgur.com/Qr71crq.jpg"
              class="comment-author-img"
            />
            <button class="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>
      );
    };
  }
});
