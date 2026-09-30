"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();

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
            className={`transition ${
              pathname === link.href
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
        <Link href="/cart" className="hover:text-pink-600 transition">
          <ShoppingCart className="w-6 h-6" />
        </Link>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-pink-600 transition">
              <User className="w-6 h-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/orders" className="w-full">
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
