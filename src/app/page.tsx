"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Brand, Category, Product } from "@/types/api";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    async function getHomeData() {
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          fetch("https://ecommerce.routemisr.com/api/v1/products"),
          fetch("https://ecommerce.routemisr.com/api/v1/categories"),
          fetch("https://ecommerce.routemisr.com/api/v1/brands"),
        ]);
        const [productsData, categoriesData, brandsData] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
          brandsRes.json(),
        ]);
        setProducts(productsData.data || []);
        setCategories(categoriesData.data || []);
        setBrands(brandsData.data || []);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    }
    getHomeData();
  }, []);

  return (
    <main className="pt-20">
      <section className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-20 text-center text-white md:py-28">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Find your next favorite</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
          Discover products, categories, and brands selected for your everyday style.
        </p>
        <Link
          href="/products"
          className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-pink-600 shadow transition hover:bg-gray-100"
        >
          Shop Products
        </Link>
      </section>

      <section className="px-6 py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link href="/products" className="font-medium text-pink-600 hover:text-pink-700">
            View all
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="py-10 text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <Card className="h-full overflow-hidden rounded-2xl shadow-lg transition hover:shadow-xl">
                  <div className="relative h-52 w-full">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="line-clamp-1 text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.category?.name}</p>
                    <p className="mt-2 font-bold text-pink-600">{product.price} EGP</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-12 px-6 pb-16 md:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
            <Link href="/categories" className="font-medium text-pink-600 hover:text-pink-700">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <Link key={category._id} href={`/categories/${category._id}`} className="group text-center">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full shadow transition group-hover:scale-105">
                  <Image src={category.image} alt={category.name} fill className="object-cover" />
                </div>
                <p className="mt-3 font-medium text-gray-700 group-hover:text-pink-600">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Featured Brands</h2>
            <Link href="/brands" className="font-medium text-pink-600 hover:text-pink-700">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {brands.slice(0, 6).map((brand) => (
              <Link key={brand._id} href={`/brands/${brand._id}`} className="group">
                <Card className="h-full items-center justify-center overflow-hidden rounded-xl p-4 shadow transition hover:shadow-lg">
                  <div className="relative h-20 w-full">
                    <Image src={brand.image} alt={brand.name} fill className="object-contain" />
                  </div>
                  <CardContent className="p-0 text-center">
                    <p className="font-medium text-gray-700 group-hover:text-pink-600">{brand.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
