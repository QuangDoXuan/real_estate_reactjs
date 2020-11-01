import React from 'react';
import Authorization from '../../../securities/Authorization'
import Loadable from 'react-loadable';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('../containers/dashboard'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('../containers/user/index.js'),
  loading: Loading,
})

const News = Loadable({
  loader: () => import('../containers/news/index-news'),
  loading: Loading,
})

const NewsCategory = Loadable({
  loader: () => import('../containers/news/news-category'),
  loading: Loading,
})

const Product = Loadable({
  loader: () => import('../containers/product/index'),
  loading: Loading,
})
const ProductCategory = Loadable({
  loader: () => import('../containers/product/index-product-category'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin/dashboard', name: "Dashboard", component: Dashboard },
  { path: '/admin/user', name: "", component: User },
  { path: '/admin/news', name: "", component: News },
  { path: '/admin/news-category', name: "", component: NewsCategory },
  { path: '/admin/product', name: "", component: Product },
  { path: '/admin/product-category', name: "", component: ProductCategory },

]

export default routes;
