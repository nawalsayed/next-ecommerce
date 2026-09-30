"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBrands() {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
        const data = await res.json();
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    }
    getBrands();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading brands...</p>;
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Brands ({brands.length})
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
      </div>
    </div>
  );
}


