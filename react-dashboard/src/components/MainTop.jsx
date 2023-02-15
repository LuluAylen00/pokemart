import React, { Fragment } from 'react';
import ProductsSmall from './home/ProductsSmall';
import UsersSmall from './home/UsersSmall';
import CategoriesSmall from './home/CategoriesSmall';
import SalesSmall from './home/SalesSmall';

export default function MainTop() {
  return (
    <Fragment>
      <ProductsSmall />
      <CategoriesSmall />
      <SalesSmall />
      <UsersSmall />
    </Fragment>
  )
}
