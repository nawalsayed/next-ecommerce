"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import type { DemoOrder } from "@/types/order";

const ORDER_STORAGE_KEY = "shopsphere-last-order";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedOrder = window.localStorage.getItem(ORDER_STORAGE_KEY);
      if (storedOrder) setOrder(JSON.parse(storedOrder) as DemoOrder);
      else router.replace("/cart");
    } catch {
      router.replace("/cart");
    } finally {
      setIsLoaded(true);
    }
  }, [router]);

  if (!isLoaded || !order) return <p className="pt-28 text-center text-gray-500">Loading order details...</p>;

  return (
    <main className="mx-auto max-w-3xl px-6 pb-12 pt-28">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-pink-600">Thank you for your order!</h1>
        <p className="text-gray-600">Your demo order number is <span className="font-semibold text-gray-800">{order.orderNumber}</span>.</p>
        <p className="mt-4 rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 text-pink-800">Demo store: no real payment is processed.</p>
      </div>

      <Card className="p-6 shadow-sm">
        <CardContent className="space-y-4 p-0">
          <div className="flex flex-wrap justify-between gap-2">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p className="text-sm text-gray-500">{order.paymentMethod}</p>
          </div>
          {order.items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b pb-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-white">
                <Image src={item.imageCover} alt={item.title} fill className="object-contain" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} EGP</p>
            </div>
          ))}
          <div className="flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span><span className="text-pink-600">{order.total.toFixed(2)} EGP</span>
          </div>
        </CardContent>
      </Card>

      <Link href="/products" className="mt-6 inline-flex rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700">
        Continue shopping
      </Link>
    </main>
  );
}
