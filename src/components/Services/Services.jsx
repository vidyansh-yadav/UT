import "./Services.css";

const services = [
  {
    title: "Penetration Testing",
    icon: "🛡️",
    desc: "Identify vulnerabilities before attackers do."
  },
  {
    title: "Network Security",
    icon: "🌐",
    desc: "Protect networks with advanced monitoring."
  },
  {
    title: "Cloud Security",
    icon: "☁️",
    desc: "Secure AWS, Azure and Google Cloud."
  },
  {
    title: "Mobile Security",
    icon: "📱",
    desc: "Android & iOS application testing."
  },
  {
    title: "Threat Intelligence",
    icon: "⚠️",
    desc: "Real-time cyber threat monitoring."
  },
  {
    title: "Incident Response",
    icon: "🚨",
    desc: "Rapid recovery from cyber attacks."
  }
];

export default function Services() {
  return (
    <section className="services" id="services">

      <div className="section-title">
        <span>OUR SERVICES</span>
        <h2>Security Solutions</h2>
        <p>
          Enterprise-grade cybersecurity services designed to protect your business.
        </p>
      </div>

      <div className="service-grid">
        {services.map((item, index) => (
          <div className="service-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}