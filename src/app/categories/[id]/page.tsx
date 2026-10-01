"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ApiState from "@/components/ApiState/ApiState";
import type { Category } from "@/types/api";

export default function CategoryDetailsPage() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function getCategory() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        if (!res.ok) throw new Error("Unable to load category");
        const data = await res.json();
        if (!data.data) throw new Error("Unable to load category");
        setCategory(data.data);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) getCategory();
  }, [id, retry]);

  if (loading) {
    return <p className="text-center py-10">Loading category...</p>;
  }

  if (error) return <ApiState message="We couldn’t load this category. Please try again." onRetry={() => setRetry((value) => value + 1)} />;

  if (!category) {
    return <p className="text-center py-10 text-red-500">Category not found</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-28">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-16 flex flex-col items-center text-center text-white">
        {/* Category Image */}
        <div className="w-36 h-36 relative rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-contain p-6"
          />
        </div>

        {/* Category Name */}
        <h1 className="text-4xl font-bold">{category.name}</h1>
      </div>

      {/* Content Section */}
      <div className="px-6 py-10 text-center max-w-2xl">
        <p className="text-gray-600 mb-6">
          Discover all products in the{" "}
          <span className="font-semibold">{category.name}</span> category.
        </p>

        <Link
          href={`/categories/${id}/products`}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}

