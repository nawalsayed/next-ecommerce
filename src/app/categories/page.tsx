"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ApiState from "@/components/ApiState/ApiState";
import type { Category } from "@/types/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function getCategories() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        if (!res.ok) throw new Error("Unable to load categories");
        const data = await res.json();
        if (!Array.isArray(data.data)) throw new Error("Unable to load categories");
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, [retry]);

  if (loading) {
    return <p className="text-center py-10">Loading categories...</p>;
  }

  if (error) return <ApiState message="We couldn’t load categories. Please try again." onRetry={() => setRetry((value) => value + 1)} />;

  return (
    <div className="pt-28 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-pink-600">
        Shop by Category
      </h1>

      {categories.length === 0 && <ApiState message="No categories are available right now. Please check back soon." />}

      {categories.length > 0 && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="flex flex-col items-center group"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition">
              <Image
                src={cat.image}
                alt={cat.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-3 text-gray-700 font-medium group-hover:text-pink-600">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>}
    </div>
  );
}

