<script lang="tsx">
import { defineComponent, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ToLoginOrRegister } from './components/ToLoginOrRegister';
import { login, register } from '@/apis/login';
import Input from '@/components/Input';
import { useState } from '@/hooks';
import { useUserStore } from '@/store';

export default defineComponent({
  name: 'LoginIndex',
  setup() {
    const store = useUserStore()
    const route = useRoute();
    const router = useRouter();
    const isLogin = computed(() => route.name === 'login');
    const mainText = computed(() => (isLogin.value ? 'Sign in' : 'Sign up'));
    const [errMsg, setErrMsg] = useState({});
    const params = reactive({
      username: '',
      email: '',
      password: ''
    });
    const onSubmit = (e) => {
      // 阻止默认提交
      e.preventDefault();
      const fn = createSubmitFn();
      fn({ user: params })
        .then((res: any) => {
          console.info(res)
          store.setUser(res.user)
          // router.push({ path: '/' });
        })
        .catch((err) => {
          console.info('请求失败', err);
          setErrMsg(err.response.data.errors);
        });
    };

    const createSubmitFn = () => {
      return isLogin.value ? login : register;
    };

    return () => (
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">{mainText.value}</h1>
              <p class="text-xs-center">
                <ToLoginOrRegister isLogin={isLogin.value} />
              </p>

              {Object.keys(errMsg.value).length ? (
                <ul class="error-messages">
                  {Object.entries(errMsg.value).map(([key, values]) => {
                    return Array.isArray(values) ? (
                      values.map((val) => {
                        return (
                          <li>
                            {key}:{val}
                          </li>
                        );
                      })
                    ) : (
                      <li>{values}</li>
                    );
                  })}
                </ul>
              ) : (
                ''
              )}

              <form onSubmit={onSubmit} autocomplete="off">
                {!isLogin.value ? (
                  <fieldset class="form-group">
                    <Input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      required
                      v-model={[params.username, 'value']}
                    />
                  </fieldset>
                ) : (
                  ''
                )}
                <fieldset class="form-group">
                  <Input
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    required
                    v-model={[params.email, 'value']}
                  />
                </fieldset>
                <fieldset class="form-group">
                  <Input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    required
                    minlength="8"
                    v-model={[params.password, 'value']}
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  {mainText.value}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
</script>
<style lang="scss" scoped></style>
