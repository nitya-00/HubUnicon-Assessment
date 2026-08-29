function StoreFooter() {
  return (
    <footer id="accessories" className="bg-[#f5f5f7] px-5 py-14 text-sm text-gray-500">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-gray-300 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div><h3 className="font-semibold text-black">Shop</h3><div className="mt-4 space-y-3"><p>Phone</p><p>Laptop</p><p>Watch</p><p>Audio</p></div></div>
          <div><h3 className="font-semibold text-black">Support</h3><div className="mt-4 space-y-3"><p>Help Center</p><p>Shipping</p><p>Returns</p><p>Contact Us</p></div></div>
          <div><h3 className="font-semibold text-black">About NOVA</h3><div className="mt-4 space-y-3"><p>Our Story</p><p>Careers</p><p>News</p><p>Privacy</p></div></div>
          <div><h3 className="font-semibold text-black">Stay Updated</h3><p className="mt-4 leading-6">Get product announcements and updates.</p><button className="mt-5 rounded-full bg-black px-5 py-2 text-white">Subscribe</button></div>
        </div>
        <div className="pt-7">© 2026 NOVA. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default StoreFooter;
