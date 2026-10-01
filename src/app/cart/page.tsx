"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-28 px-6 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-800">Your cart is waiting</h1>
        <p className="mb-6 text-gray-500">Looks like you haven’t added anything yet. Find something you love!</p>
        <Link href="/products" className="inline-flex rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <main className="px-6 pb-12 pt-28">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <Button variant="outline" onClick={clearCart} className="text-red-600">Clear cart</Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item._id} className="flex-row items-center gap-4 p-4 shadow-sm">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src={item.imageCover} alt={item.title} fill className="object-contain" />
              </div>
              <CardContent className="flex flex-1 flex-col gap-3 p-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-gray-800">{item.title}</h2>
                  <p className="mt-1 font-bold text-pink-600">{item.price} EGP</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 rounded-lg border px-2 py-1">
                    <button onClick={() => decreaseQuantity(item._id)} aria-label={`Decrease ${item.title} quantity`} className="px-1 text-lg hover:text-pink-600">−</button>
                    <span className="min-w-5 text-center">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)} aria-label={`Increase ${item.title} quantity`} className="px-1 text-lg hover:text-pink-600">+</button>
                  </div>
                  <Button variant="ghost" onClick={() => removeFromCart(item._id)} className="text-red-600">Remove</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit p-5 shadow-sm">
          <CardContent className="space-y-4 p-0">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between border-t pt-4 font-bold">
              <span>Total</span>
              <span className="text-pink-600">{totalPrice.toFixed(2)} EGP</span>
            </div>
            <Link href="/checkout" className="block rounded-lg bg-pink-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-pink-700">
              Proceed to Checkout
            </Link>
            <Link href="/products" className="block text-center font-medium text-pink-600 hover:text-pink-700">
              Continue shopping
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
