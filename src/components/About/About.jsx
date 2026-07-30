import "./About.css";

export default function About() {
  return (
    <section className="about" id="about">

      <div className="about-left">

        <span className="section-tag">
          WHO WE ARE
        </span>

        <h2>
          Cyber Security
          <span> Experts.</span>
        </h2>

        <p>
          Unseen Termination helps businesses stay protected against
          ransomware, phishing, malware, insider threats and advanced
          cyber attacks through penetration testing, red team exercises
          and digital forensics.
        </p>

        <div className="about-features">

          <div className="feature-card">
            <h3>Penetration Testing</h3>
            <p>Identify vulnerabilities before attackers do.</p>
          </div>

          <div className="feature-card">
            <h3>Threat Intelligence</h3>
            <p>Real-time monitoring of emerging cyber threats.</p>
          </div>

          <div className="feature-card">
            <h3>Digital Forensics</h3>
            <p>Investigate incidents with expert analysis.</p>
          </div>

        </div>

      </div>

      <div className="about-right">

        <div className="security-circle">

          <div className="ring ring1"></div>
          <div className="ring ring2"></div>

          <div className="shield">

            🛡️

          </div>

        </div>

      </div>

    </section>
  );
}