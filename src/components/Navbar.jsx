import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-secondary navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        freee家計簿
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              作成
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
