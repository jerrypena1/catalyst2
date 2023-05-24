import { Heart, ShoppingCart } from 'lucide-react';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { addCartLineItem, createCart, getProduct } from '@client';

import { BreadCrumbs } from './Breadcrumbs';
import { Gallery } from './Gallery';
import { Reviews } from './Reviews';
import { ReviewSummary } from './ReviewSummary';

// import { Variants } from './Variants';
//
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default async function Product({ params }: { params: { slug: string } }) {
  const productId = Number(params.slug);
  const product = await getProduct(productId);

  const reviewSectionId = 'write-a-review';

  if (!product) {
    return notFound();
  }

  const handleAddToCart = async () => {
    'use server';

    const cartId = cookies().get('cartId')?.value;

    if (cartId) {
      await addCartLineItem(cartId, {
        lineItems: [
          {
            productEntityId: productId,
            quantity: 1,
          },
        ],
      });

      revalidateTag('cart');
      // revalidatePath('/cart');

      return;
    }

    // Create cart
    const cart = await createCart([
      {
        productEntityId: productId,
        quantity: 1,
      },
    ]);

    if (cart) {
      cookies().set({
        name: 'cartId',
        value: cart.entityId,
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
      });
    }

    revalidateTag('cart');
  };

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <BreadCrumbs productId={productId} />

      <div className="my-6 grid-cols-2 gap-4 md:grid">
        <div className="md:order-2">
          {product.brand && (
            <p className="font-semibold uppercase text-gray-500">{product.brand.name}</p>
          )}

          <h1 className="mb-3 text-h2">{product.name}</h1>

          <Suspense fallback="Loading...">
            {/* @ts-expect-error Server Component */}
            <ReviewSummary productId={productId} reviewSectionId={reviewSectionId} />
          </Suspense>

          {product.prices && (
            <div className="my-7">
              <p className="text-h4">{currencyFormatter.format(product.prices.price.value)}</p>
            </div>
          )}

          <div className="my-7 flex gap-4">
            <form action={handleAddToCart} className="w-full">
              <button
                className="inline-flex w-full justify-center border-2 border-blue-primary bg-blue-primary py-3 text-base font-semibold text-white hover:opacity-95"
                type="submit"
              >
                <ShoppingCart aria-hidden="true" className="mx-2" />
                Add to Cart
              </button>
            </form>

            {/* NOT IMPLEMENTED YET */}
            <div className="w-full">
              <button
                className="hover:bg-gray-50 inline-flex w-full justify-center border-2 border-blue-primary py-3 text-base font-semibold text-blue-primary"
                type="submit"
              >
                <Heart aria-hidden="true" className="mx-2" />
                <span>Save to wishlist</span>
              </button>
            </div>
          </div>

          {/* <Variants productId={productId} /> */}
        </div>

        <div className="md:order-1">
          {/* @ts-expect-error Server Component */}
          <Gallery productId={productId} />

          {Boolean(product.plainTextDescription) && (
            <>
              <h3 className="mb-4 text-h5">Description</h3>
              <p>{product.plainTextDescription}</p>
            </>
          )}

          {Boolean(product.warranty) && (
            <>
              <h3 className="mb-4 mt-8 text-h5">Warranty</h3>
              <p>{product.warranty}</p>
            </>
          )}

          <Suspense fallback="Loading...">
            {/* @ts-expect-error Server Component */}
            <Reviews productId={productId} reviewSectionId={reviewSectionId} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export const runtime = 'edge';