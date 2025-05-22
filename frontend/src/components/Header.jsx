import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Hàm kiểm tra link nào đang active để highlight
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold">MyApp</div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className={`hover:text-yellow-300 ${
                isActive("/") ? "text-yellow-300 font-semibold" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tu-truyen"
              className={`hover:text-yellow-300 ${
                isActive("/tu-truyen") ? "text-yellow-300 font-semibold" : ""
              }`}
            >
              Tủ Truyện
            </Link>
          </li>
          <li>
            <Link
              to="/tim-kiem"
              className={`hover:text-yellow-300 ${
                isActive("/tim-kiem") ? "text-yellow-300 font-semibold" : ""
              }`}
            >
              Tìm Kiếm
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
