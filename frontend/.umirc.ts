import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  locale: {
    default: 'en-US', 
    antd: true,
    baseNavigator: false, 
  },
  routes: [
    // {
    //   path: '/',
    //   redirect: '/home',
    // },
    // {
    //   name: "Home",
    //   path: '/home',
    //   component: './Home',
    // },
    // {
    //   name: "Access",
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD',
    //   path: '/table',
    //   component: './Table',
    // },
    {
      name: "Mongodb records",
      path: '/MongoRecords',
      component: '@/pages/MongoRecords',
    },
  ],
  npmClient: 'npm',
});

