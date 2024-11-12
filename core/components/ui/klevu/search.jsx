'use client';

import { KlevuSearchLandingPage } from '@klevu/ui-react';
import React from 'react';

import { KlevuInitWrapper } from '~/components/ui/klevu/init';

export default function KlevuSearch({ term }) {
  return (
    <KlevuInitWrapper>
      <KlevuSearchLandingPage
        onKlevuAddToCart={(product) => console.log(product, term, "addtocart clicked on search page")}
        term={term} 
      />
    </KlevuInitWrapper>
  );
}
