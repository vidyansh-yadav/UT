import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">

      <div className="logo">

        <span>UNSEEN</span>

        <h2>TERMINATION</h2>

      </div>

      <nav>

        <ul>

          <li><a href="#hero">Home</a></li>

          <li><a href="#about">About</a></li>

          <li><a href="#services">Services</a></li>

          <li><a href="#threat">Threat Map</a></li>

          <li><a href="#terminal">Terminal</a></li>

          <li><a href="#contact">Contact</a></li>

        </ul>

      </nav>

      <button className="nav-btn">

        Get Protected

      </button>

    </header>
  );
};

export default Navbar;