import { useUserStore } from '@/store';

// 防止缺少require
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const parser = require('cookieparser');
const cookieparser = parser;
const initServer = async ({ ssrContext: { req } }) => {
  const store = useUserStore();
  let user = null;
  if (req.headers.cookie) {
    // 使用cookieparser将cookie解析为一个对象
    const parsed = cookieparser.parse(req.headers.cookie);
    try {
      // 防止阻塞
      user = JSON.parse(parsed.user);
    } catch (err) {
      console.error(err);
    }
    store.setUser(user);
  }
};

export default initServer;
