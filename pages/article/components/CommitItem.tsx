import { defineComponent } from 'vue';

export default defineComponent({
  name: 'xxx',
  setup() {
    return () => {
      return (
        <div class="card">
          <div class="card-block">
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
            </a>
            &nbsp;
            <a href="" class="comment-author">
              Jacob Schmidt
            </a>
            <span class="date-posted">Dec 29th</span>
          </div>
        </div>
      );
    };
  }
});
