import type { FunctionalComponent } from 'vue';
import { useRouter } from 'vue-router';

const LayoutFooter: FunctionalComponent = () => {
  const router = useRouter();
  const toHome = () => {
    router.push({
      path: '/'
    })
  }
  return (
    <footer>
      <div class="container">
        <a href="javaScript:;" class="logo-font" onClick={toHome}>
          conduit
        </a>
        <span class="attribution">
          An interactive learning project from{' '}
          <a href="https://thinkster.io" target='_blank'>Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  );
};

export default LayoutFooter;
