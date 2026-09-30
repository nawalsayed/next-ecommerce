"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ApiState from "@/components/ApiState/ApiState";
import type { Brand } from "@/types/api";

export default function BrandDetailsPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function getBrand() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        if (!res.ok) throw new Error("Unable to load brand");
        const data = await res.json();
        if (!data.data) throw new Error("Unable to load brand");
        setBrand(data.data);
      } catch (error) {
        console.error("Error fetching brand:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) getBrand();
  }, [id, retry]);

  if (loading) {
    return <p className="text-center py-10">Loading brand...</p>;
  }

  if (error) return <ApiState message="We couldn’t load this brand. Please try again." onRetry={() => setRetry((value) => value + 1)} />;

  if (!brand) {
    return <p className="text-center py-10 text-red-500">Brand not found</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-16 flex flex-col items-center text-center text-white">
        {/* Logo */}
        <div className="w-36 h-36 relative rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain p-6"
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold">{brand.name}</h1>
      </div>

      {/* Content Section */}
      <div className="px-6 py-10 text-center max-w-2xl">
        <p className="text-gray-600 mb-6">
          Explore the world of <span className="font-semibold">{brand.name}</span> products.
          We bring you the finest quality and most stylish designs.
        </p>

        <Link href="/brands" className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition">
          Back to Brands
        </Link>
      </div>
    </div>
  );
}
