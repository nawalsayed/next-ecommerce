"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CategoryProductsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
        );
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) getProducts();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (products.length === 0) {
    return (
      <div className="pt-28 px-6 text-center">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </Link>
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6">
      {/* Back Button */}
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </Link>

      <h1 className="text-3xl font-bold text-center mb-10 text-pink-600">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            className="w-full shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative w-full h-52">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-cover"
              />
              {/* Heart Icon */}
              <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500">{product.category?.name}</p>
              <p className="mt-2 font-bold text-pink-600">{product.price} EGP</p>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-4 pt-0">
              <Button onClick={() => addToCart(product)} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
