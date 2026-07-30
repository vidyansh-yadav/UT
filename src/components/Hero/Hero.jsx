import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Hero3D from "../Hero3D/Hero3D";
import "./Hero.css";

function Hero() {
  const heroRef = useRef(null);

  // Hero Load Animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".tag", {
      y: -40,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        ".hero-title",
        {
          y: 80,
          opacity: 0,
          duration: 1,
        },
        "-=0.4"
      )
      .from(
        ".hero-text",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        ".hero-buttons",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        ".hero-stats",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      );
  }, []);

  // Mouse Parallax
  useEffect(() => {
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      gsap.to(".hero-right", {
        x,
        y,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="cyber-grid"></div>

      <div className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="scan-line"></div>

      <div className="hero-left">
        <span className="tag">
          ELITE CYBER SECURITY
        </span>

        <h1 className="hero-title">
          WE SEE WHAT
          <br />
          <span>OTHERS DON'T.</span>
        </h1>

        <p className="hero-text">
          Protect your business with advanced penetration testing,
          red team operations, digital forensics and threat intelligence.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Get Started
          </button>

          <button className="btn-outline">
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

      <div className="hero-right">

    <div className="hero-glow"></div>

    <Hero3D />

</div>

    </section>
  );
}

export default Hero;