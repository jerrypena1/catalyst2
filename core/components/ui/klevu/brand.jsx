'use client';

import { KlevuSearchLandingPage } from '@klevu/ui-react';
import React from 'react';

import { KlevuInitWrapper } from '~/components/ui/klevu/init';

export default function KlevuBrand({ brand }) {
  return (
    <KlevuInitWrapper>
      <KlevuSearchLandingPage 
        onKlevuAddToCart={(product) => console.log(product, brand, "addtocart clicked on brand page")}
        term="*"
      />
    </KlevuInitWrapper>
  );
}
