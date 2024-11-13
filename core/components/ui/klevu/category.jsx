'use client';

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { KlevuMerchandising } from '@klevu/ui-react';
import React from 'react';

// import { getProduct } from '../../../app/[locale]/(default)/product/[slug]/page-data';
import { addToCart } from '../../product-card/add-to-cart/form/_actions/add-to-cart';

import { useCart } from '~/components/header/cart-provider';
import { KlevuInitWrapper } from '~/components/ui/klevu/init';



export default function KlevuCategory({ category }) {
  const cart = useCart();
  const catBreadcrumbs = removeEdgesAndNodes(category.breadcrumbs);
  const getCategoryPath = () => {
    try {
      let categoryPath = '';

      if (catBreadcrumbs.length) {
        catBreadcrumbs.forEach((cat) => {
          if (cat.name) {
            categoryPath += (categoryPath !== '' ? ';' : '') + cat.name;
          }
        })
      }

      return categoryPath ? categoryPath: category.name;
    } catch(error) {
      return category.name;
    }
  }

  const handleSubmit = async (product) => {
    // event.preventDefault();

    const formData = new FormData();

    // this code only works server-side :(

    // const productData = await getProduct({
    //   entityId: product.id,
    //   optionValueIds: {},
    //   useDefaultOptionSelections: true,
    // });

    formData.append('product_id', product.id);
    formData.append('quantity', 1);
    // formData.append('data', productData);



    // Optimistic update
    cart.increment(1);

    const result = await addToCart(formData);

    console.log(result);
  };




  return (
    <KlevuInitWrapper>
      <KlevuMerchandising
        category={getCategoryPath()}
        categoryTitle={category.name}
        onKlevuAddToCart={handleSubmit}
      />
    </KlevuInitWrapper>

  );
};
