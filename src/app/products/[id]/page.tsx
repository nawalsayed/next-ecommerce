"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-24 p-6 grid md:grid-cols-2 gap-8">
      {/* 🟢 Product Images Slider */}
      <div>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Pagination, Thumbs]}
          className="rounded-lg overflow-hidden mb-4"
        >
          {product.images?.map((img: string, i: number) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-96 bg-white">
                <Image
                  src={img}
                  alt={`${product.title}-${i}`}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="mt-2"
        >
          {product.images?.map((img: string, i: number) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-20 border rounded-lg cursor-pointer">
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🟢 Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-pink-600 text-2xl font-bold mb-6">{product.price} EGP</p>

        <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
