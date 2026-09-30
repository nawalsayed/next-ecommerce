"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const links = [
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">
      {/* Logo / Title */}
      <Link href="/" className="text-2xl font-bold text-pink-600">
        ShopSphere
      </Link>

      {/* Links */}
      <div className="flex gap-8 text-gray-700 font-medium">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
            className={`transition ${
              pathname === link.href || pathname.startsWith(`${link.href}/`)
                ? "text-pink-600 font-semibold border-b-2 border-pink-600"
                : "hover:text-pink-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 text-gray-700">
        <Link href="/cart" aria-label={`Shopping cart, ${itemCount} items`} className="relative transition hover:text-pink-600">
          <ShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-xs font-semibold text-white">
              {itemCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}
