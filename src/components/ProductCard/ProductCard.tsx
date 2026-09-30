"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ProductCard() {
  return (
    <Card className="w-64 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition">
      {/* Product Image */}
      <div className="relative w-full h-40">
        <Image
          src="/sample-product.jpg" // غيري الصورة من public
          alt="Product"
          fill
           className="object-contain"
        />
        {/* Icon top-right */}
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
          <Heart className="w-5 h-5 text-pink-500" />
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">Cool Sneakers</h3>
        <p className="text-sm text-gray-500">Trendy and comfortable</p>
        <p className="mt-2 font-bold text-pink-600">$59.99</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
