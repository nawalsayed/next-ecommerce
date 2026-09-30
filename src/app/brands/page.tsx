"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ApiState from "@/components/ApiState/ApiState";
import type { Brand } from "@/types/api";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function getBrands() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
        if (!res.ok) throw new Error("Unable to load brands");
        const data = await res.json();
        if (!Array.isArray(data.data)) throw new Error("Unable to load brands");
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getBrands();
  }, [retry]);

  if (loading) {
    return <p className="text-center py-10">Loading brands...</p>;
  }

  if (error) return <ApiState message="We couldn’t load brands. Please try again." onRetry={() => setRetry((value) => value + 1)} />;

  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Brands ({brands.length})
      </h1>

      {brands.length === 0 && <ApiState message="No brands are available right now. Please check back soon." />}

      {brands.length > 0 && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`} // صفحة المنتجات الخاصة بالبراند
            className="group block border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
          >
            {/* صورة البراند */}
            <div className="relative w-full h-32 flex items-center justify-center bg-gray-50">
              <Image
                src={brand.image}
                alt={brand.name}
                width={150}
                height={150}
                className="object-contain max-h-28 group-hover:scale-105 transition"
              />
            </div>

            {/* اسم البراند */}
            <div className="p-3 text-center">
              <h3 className="font-medium text-gray-700 group-hover:text-pink-600">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>}
    </div>
  );
}


