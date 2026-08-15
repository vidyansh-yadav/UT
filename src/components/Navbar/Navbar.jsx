import "./Navbar.css";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1050) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* LOGO */}
      <a
        href="#hero"
        className="logo"
        aria-label="Unseen Termination Home"
        onClick={closeMenu}
      >
        <span>UNSEEN</span>
        <h2>TERMINATION</h2>
      </a>

      {/* DESKTOP / MOBILE NAV */}
      <nav
        className={`nav-links ${menuOpen ? "active" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul>
          <li>
            <a href="#hero" onClick={closeMenu}>
              Home
            </a>
          </li>

          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>

          <li>
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
          </li>

          <li>
            <a href="#threat" onClick={closeMenu}>
              Threat Map
            </a>
          </li>

          <li>
            <a href="#terminal" onClick={closeMenu}>
              Terminal
            </a>
          </li>

          <li>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>

        <button className="nav-btn mobile-btn">
          Get Protected
        </button>
      </nav>

      {/* DESKTOP BUTTON */}
      <button className="nav-btn desktop-btn">
        Get Protected
      </button>

      {/* HAMBURGER */}
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE BACKDROP */}
      <button
        className={`nav-backdrop ${menuOpen ? "show" : ""}`}
        aria-label="Close navigation menu"
        onClick={closeMenu}
      />

    </header>
  );
};

export default Navbar;