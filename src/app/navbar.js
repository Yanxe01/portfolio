'use client';

import Link from 'next/link';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="top-navbar">
      <Link href="#home" className="nav-item" legacyBehavior>
        <span className="label">Home</span>
      </Link>
      <Link href="#about" className="nav-item" legacyBehavior>
        <span className="label">About</span>
      </Link>
      <Link href="#portfolio" className="nav-item" legacyBehavior>
        <span className="label">Projects</span>
      </Link>
      <Link href="#skills" className="nav-item" legacyBehavior>
        <span className="label">Skills</span>
      </Link>
      <Link href="#contact" className="nav-item" legacyBehavior>
        <span className="label">Contact</span>
      </Link>
    </div>
  );
};

export default Navbar;
