import type { PropType } from 'vue';
import NuxtLink from '@/components/NuxtLink';
import { defineComponent } from 'vue';
import { topConfigType } from '../config';

export default defineComponent({
  name: 'LayoutTop',
  props: {
    config: { type: Array as PropType<topConfigType>, default: [] },
    currentName: { type: String, default: 'home' }
  },
  setup(props) {
    return () => {
      const { config, currentName } = props;
      return (
        <nav class="navbar navbar-light">
          <div class="container">
            <NuxtLink class="navbar-brand" to="/">
              conduit
            </NuxtLink>
            <ul class="nav navbar-nav pull-xs-right">
              {config.map((link) => (
                <li class="nav-item">
                  <NuxtLink
                    class={`nav-link ${
                      currentName === link.name ? 'active' : ''
                    }`}
                    to={link.path}
                  >
                    {link.icon ? (
                      <>
                        <i class={link.icon}></i>
                        &nbsp;
                        {link.text}
                      </>
                    ) : link.imgSrc ? (
                      <>
                        <img class="user-pic" src={link.imgSrc} />
                        {link.text}
                      </>
                    ) : (
                      link.text
                    )}
                  </NuxtLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      );
    };
  }
});
