import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArticleActions',
  setup() {
    return () => {
      return (
        <div class="article-actions">
          <div class="article-meta">
            <a href="profile.html">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div class="info">
              <a href="" class="author">
                Eric Simons
              </a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">(29)</span>
            </button>
          </div>
        </div>
      );
    };
  }
});
