import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Hero3D from "../Hero3d/Hero3D";
import "./Hero.css";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = [
        ".tag",
        ".hero-title",
        ".hero-text",
        ".hero-buttons",
        ".hero-stats",
      ];

      gsap.set(items, {
        y: 24,
        opacity: 1,
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(".tag", {
        y: 0,
        duration: 0.55,
      })
        .to(
          ".hero-title",
          {
            y: 0,
            duration: 0.7,
          },
          "-=0.25"
        )
        .to(
          ".hero-text",
          {
            y: 0,
            duration: 0.6,
          },
          "-=0.25"
        )
        .to(
          ".hero-buttons",
          {
            y: 0,
            duration: 0.55,
          },
          "-=0.2"
        )
        .to(
          ".hero-stats",
          {
            y: 0,
            duration: 0.55,
          },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* Desktop mouse parallax only */
  useEffect(() => {
    const move = (event) => {
      if (window.innerWidth <= 1100) return;

      const x =
        (event.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 8;

      gsap.to(".hero-right", {
        x,
        y,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);

      gsap.set(".hero-right", {
        x: 0,
        y: 0,
      });
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="hero"
      aria-labelledby="hero-heading"
    >

      <div className="cyber-grid" />

      <div className="particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="scan-line" />

      {/* ================= TEXT ================= */}

      <div className="hero-left">

        <span className="tag">
          ELITE CYBER SECURITY
        </span>

        <h1
          id="hero-heading"
          className="hero-title"
        >
          WE SEE WHAT
          <br />
          <span>OTHERS DON'T.</span>
        </h1>

        <p
          id="hero-description"
          className="hero-text"
        >
          Protect your business with advanced
          penetration testing, red team operations,
          digital forensics and threat intelligence.
        </p>

        <div className="hero-buttons">

          <button
            className="btn-primary"
            type="button"
          >
            Get Started
          </button>

          <button
            className="btn-outline"
            type="button"
          >
            Learn More
          </button>

        </div>

        <div className="hero-stats">

          <div>
            <h2>500+</h2>
            <p>Clients</p>
          </div>

          <div>
            <h2>1200+</h2>
            <p>Security Tests</p>
          </div>

          <div>
            <h2>99%</h2>
            <p>Protection</p>
          </div>

        </div>

      </div>


      {/* ================= EARTH ================= */}

      <div className="hero-right">

        <div className="hero-glow" />

        <Hero3D />

      </div>

    </section>
  );
}

export default Hero;