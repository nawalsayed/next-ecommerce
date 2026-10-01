"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ApiState from "@/components/ApiState/ApiState";
import type { Product } from "@/types/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        if (!res.ok) throw new Error("Unable to load products");
        const data = await res.json();
        if (!Array.isArray(data.data)) throw new Error("Unable to load products");
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [retry]);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (error) return <ApiState message="We couldn’t load products. Please try again." onRetry={() => setRetry((value) => value + 1)} />;
  if (products.length === 0) return <ApiState message="No products are available right now. Please check back soon." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 mt-20">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`}>
          <Card className="w-full shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer">
            {/* Product Image */}
            <div className="relative w-full h-52">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-cover w-full"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.category?.name}</p>
              <p className="mt-2 font-bold text-pink-600">{product.price} EGP</p>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-4 pt-0">
              <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); addToCart(product); }} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
