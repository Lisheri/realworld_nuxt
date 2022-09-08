import { defineNuxtConfig } from 'nuxt';
import routes from './routes'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css' },
        { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic' },
      ]
    }
  },
  hooks: {
    'pages:extend': (pages) => {
      pages.splice(0);
      routes.forEach(route => {
        pages.push(route);
      })
    }
  },
  buildModules: [
    '@pinia/nuxt',
  ],
  plugins: [
    { src: '@/plugins/init.server.ts' }, // must be the first server plugin
  ],
  server: {
    port: 8000, // default: 3000
    host: 'localhost' // default: localhost
  }
});
