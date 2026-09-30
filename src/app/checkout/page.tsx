"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import type { DemoOrder } from "@/types/order";

type ShippingFields = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
};

type CardFields = {
  number: string;
  expiry: string;
  cvc: string;
};

type FormErrors = Partial<Record<keyof ShippingFields | keyof CardFields, string>>;

const ORDER_STORAGE_KEY = "shopsphere-last-order";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isLoaded, totalPrice, clearCart } = useCart();
  const [shipping, setShipping] = useState<ShippingFields>({ fullName: "", phone: "", address: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState<DemoOrder["paymentMethod"]>("Cash on Delivery");
  const [card, setCard] = useState<CardFields>({ number: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isLoaded && items.length === 0) router.replace("/cart");
  }, [isLoaded, items.length, router]);

  function validateForm() {
    const nextErrors: FormErrors = {};
    const phoneDigits = shipping.phone.replace(/\D/g, "");

    if (shipping.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name.";
    if (!/^\+?[0-9\s()-]+$/.test(shipping.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid phone number (7–15 digits).";
    }
    if (shipping.address.trim().length < 5) nextErrors.address = "Enter a complete address (at least 5 characters).";
    if (shipping.city.trim().length < 2) nextErrors.city = "Enter a valid city.";

    if (paymentMethod === "Card (demo)") {
      const cardDigits = card.number.replace(/\s/g, "");
      if (!/^\d{13,19}$/.test(cardDigits)) nextErrors.number = "Enter a card number with 13–19 digits.";
      const expiryMatch = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(card.expiry);
      if (!expiryMatch) {
        nextErrors.expiry = "Enter an expiry date in MM/YY format.";
      } else {
        const month = Number(expiryMatch[1]);
        const year = 2000 + Number(expiryMatch[2]);
        const now = new Date();
        if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
          nextErrors.expiry = "The card expiry date must be in the future.";
        }
      }
      if (!/^\d{3,4}$/.test(card.cvc)) nextErrors.cvc = "Enter a 3 or 4 digit CVC.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) return;

    const order: DemoOrder = {
      orderNumber: `SS-${Date.now().toString().slice(-8)}`,
      items: items.map((item) => ({ ...item })),
      total: totalPrice,
      createdAt: new Date().toISOString(),
      paymentMethod,
    };

    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    clearCart();
    router.push("/order-success");
  }

  if (!isLoaded || items.length === 0) return <p className="pt-28 text-center text-gray-500">Loading checkout...</p>;

  return (
    <main className="px-6 pb-12 pt-28">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="mb-8 rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 text-pink-800">
        Demo store: no real payment is processed.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <form onSubmit={placeOrder} noValidate className="space-y-8">
          <Card className="p-6 shadow-sm">
            <CardContent className="space-y-4 p-0">
              <h2 className="text-xl font-semibold">Shipping information</h2>
              {([
                ["fullName", "Full name", "text"],
                ["phone", "Phone", "tel"],
                ["address", "Address", "text"],
                ["city", "City", "text"],
              ] as const).map(([name, label, type]) => (
                <div key={name}>
                  <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={shipping[name]}
                    onChange={(event) => setShipping({ ...shipping, [name]: event.target.value })}
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                  />
                  {errors[name] && <p id={`${name}-error`} className="mt-1 text-sm text-red-600">{errors[name]}</p>}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="p-6 shadow-sm">
            <CardContent className="space-y-4 p-0">
              <h2 className="text-xl font-semibold">Payment method</h2>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3">
                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={() => setPaymentMethod("Cash on Delivery")} />
                Cash on Delivery
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3">
                <input type="radio" name="paymentMethod" value="Card (demo)" checked={paymentMethod === "Card (demo)"} onChange={() => setPaymentMethod("Card (demo)")} />
                Card (demo)
              </label>

              {paymentMethod === "Card (demo)" && (
                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                  <div>
                    <label htmlFor="card-number" className="mb-1 block text-sm font-medium text-gray-700">Card number</label>
                    <input id="card-number" type="text" inputMode="numeric" autoComplete="off" value={card.number} onChange={(event) => setCard({ ...card, number: event.target.value })} aria-invalid={Boolean(errors.number)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
                    {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="mb-1 block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
                      <input id="card-expiry" type="text" inputMode="numeric" autoComplete="off" placeholder="MM/YY" value={card.expiry} onChange={(event) => setCard({ ...card, expiry: event.target.value })} aria-invalid={Boolean(errors.expiry)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
                      {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="card-cvc" className="mb-1 block text-sm font-medium text-gray-700">CVC</label>
                      <input id="card-cvc" type="password" inputMode="numeric" autoComplete="off" value={card.cvc} onChange={(event) => setCard({ ...card, cvc: event.target.value })} aria-invalid={Boolean(errors.cvc)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
                      {errors.cvc && <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-pink-600 py-3 text-white hover:bg-pink-700">Place demo order</Button>
        </form>

        <Card className="h-fit p-5 shadow-sm">
          <CardContent className="space-y-4 p-0">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-3 border-b pb-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-white">
                  <Image src={item.imageCover} alt={item.title} fill className="object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="whitespace-nowrap text-sm font-semibold">{(item.price * item.quantity).toFixed(2)} EGP</p>
              </div>
            ))}
            <div className="flex justify-between border-t pt-4 font-bold">
              <span>Total</span><span className="text-pink-600">{totalPrice.toFixed(2)} EGP</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
