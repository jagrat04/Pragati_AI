"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <Link href="/" className="block text-sm mb-2 hover:underline">Home</Link>
          <Link href="/Features" className="block text-sm mb-2 hover:underline">Features</Link>
          <Link href="/dashboard" className="block text-sm mb-2 hover:underline">Dashboard</Link>gi
          <Link href="/about" className="block text-sm hover:underline">About</Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
          <Link href="https://github.com/jagrat04/tempo" className="block text-sm mb-2 hover:underline">Github</Link>
          <Link href="https://ai-in-agriculture.vercel.app/" className="block text-sm mb-2 hover:underline">Website</Link>
          <Link href="/" className="block text-sm mb-2 hover:underline">Ai for Humanity</Link>
          <Link href="/about" className="block text-sm hover:underline">About</Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Other Links</h3>
          <Link href="/" className="block text-sm mb-2 hover:underline">Home</Link>
          <Link href="/features" className="block text-sm mb-2 hover:underline">Features</Link>
          <Link href="/dashboard" className="block text-sm mb-2 hover:underline">Dashboard</Link>
          <Link href="/about" className="block text-sm hover:underline">About</Link>
        </div>
      </div>

      <hr className="my-6 border-gray-600" />
      <p className="text-center text-sm">&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
