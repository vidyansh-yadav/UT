import "./About.css";

const services = [
  {
    id: "01",
    icon: "⌖",
    title: "Penetration Testing",
    text: "Identify vulnerabilities before attackers can exploit them.",
  },
  {
    id: "02",
    icon: "♢",
    title: "Threat Intelligence",
    text: "Monitor emerging cyber threats and suspicious activity.",
  },
  {
    id: "03",
    icon: "◉",
    title: "Digital Forensics",
    text: "Investigate security incidents and uncover critical digital evidence.",
  },
];

export default function About() {
  return (
    <section className="about-v5" id="about">

      {/* LEFT */}
      <div className="about-v5__content">

        <div className="about-v5__badge">
          <span />
          WHO WE ARE
        </div>

        <h2 className="about-v5__title">
          BUILT TO DEFEND.
          <strong>
            ENGINEERED TO
            <br />
            DOMINATE.
          </strong>
        </h2>

        <p className="about-v5__description">
          Unseen Termination is a cyber security team focused on
          identifying vulnerabilities, analyzing threats and
          strengthening digital infrastructure before attackers get
          the opportunity.
        </p>

        <div className="about-v5__stats">

          <div className="about-stat">
            <strong>24/7</strong>
            <span>MONITORING</span>
          </div>

          <div className="about-stat">
            <strong>100%</strong>
            <span>SECURITY FOCUS</span>
          </div>

          <div className="about-stat">
            <strong>LIVE</strong>
            <span>THREAT ANALYSIS</span>
          </div>

        </div>

        <div className="about-services">

          {services.map((service) => (
            <div className="about-service" key={service.id}>

              <span className="service-number">
                {service.id}
              </span>

              <div className="service-icon">
                {service.icon}
              </div>

              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>

              <span className="service-arrow">↗</span>

            </div>
          ))}

        </div>

      </div>


      {/* RADAR */}
      <div className="about-v5__radar-area">

        <div className="radar-frame">

          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <div className="radar">

            <div className="radar-ring ring-1" />
            <div className="radar-ring ring-2" />
            <div className="radar-ring ring-3" />
            <div className="radar-ring ring-4" />

            <div className="radar-line radar-line-x" />
            <div className="radar-line radar-line-y" />

            <div className="radar-sweep" />

            <span className="radar-dot dot-1" />
            <span className="radar-dot dot-2" />
            <span className="radar-dot dot-3" />
            <span className="radar-dot dot-4" />
            <span className="radar-dot dot-5" />

            <div className="radar-tag radar-tag-top">
              <i />
              NETWORK SECURE
            </div>

            <div className="radar-tag radar-tag-left">
              <i />
              DEFENSE ONLINE
            </div>

            <div className="radar-tag radar-tag-right">
              <i />
              THREAT DETECTION
            </div>

            <div className="radar-tag radar-tag-bottom">
              <i />
              24/7 MONITORING
            </div>

            <div className="radar-core">
              <span>UT</span>
            </div>

            <div className="system-active">
              SYSTEM ACTIVE
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT PANELS */}
      <div className="about-v5__panels">

        <div className="security-panel">

          <div className="panel-heading">
            <span>THREATS ANALYZED</span>
            <b>↗</b>
          </div>

          <strong className="panel-number">
            1,315
          </strong>

          <div className="mini-chart">
            <svg viewBox="0 0 200 45">
              <path d="M2 28 C15 45 22 8 38 27 S62 12 77 27 S102 9 117 25 S143 38 157 19 S178 42 198 10" />
            </svg>
          </div>

        </div>


        <div className="security-panel">

          <div className="panel-heading">
            <span>ACTIVE NODES</span>
            <b>⌘</b>
          </div>

          <strong className="panel-number">
            54
          </strong>

          <div className="mini-chart">
            <svg viewBox="0 0 200 45">
              <path d="M2 29 C17 9 24 35 39 24 S64 36 80 23 S105 28 119 8 S137 42 153 25 S178 34 198 15" />
            </svg>
          </div>

        </div>


        <div className="security-panel status-panel">

          <div className="panel-heading">
            <span>STATUS</span>
            <b>◇</b>
          </div>

          <strong className="status-secure">
            SECURE
          </strong>

          <p>ALL SYSTEMS OPERATIONAL</p>

        </div>

      </div>

    </section>
  );
}