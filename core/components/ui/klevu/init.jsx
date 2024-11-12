'use client'

import { KlevuInit } from '@klevu/ui-react';
import React from 'react';

export function KlevuInitWrapper({ children }) {

  return (
    <KlevuInit
      apiKey="klevu-172166885635617473"
      // assets-path="https://resources-webcomponents.klevu.com/latest/klevu-ui"
      kmcLoadDefaults
      settings={{
        generateProductUrl: function generateProductUrl(product) {
          // console.log('generateProductUlr')
          const url = URL.parse(product.url);

          return url.pathname;
        },
        onItemClick: function onItemClick(product, event) {
          console.log(product,event)
        },
        renderPrice: function renderPrice(amount, currency) {
          console.log('amount - currency', amount, currency)
          return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency,
          }).format(parseFloat(amount));
        },
      }}
      url="https://uscs33v2.ksearchnet.com/cs/v2/search"
    >
      {children}
    </KlevuInit>
  )
}
