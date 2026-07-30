import "./Dashboard.css";

const stats = [
  {
    number: "1.2M+",
    title: "Threats Blocked",
    icon: "🛡️",
  },
  {
    number: "512",
    title: "Servers Protected",
    icon: "💻",
  },
  {
    number: "89K+",
    title: "Malware Removed",
    icon: "⚠️",
  },
  {
    number: "72",
    title: "Countries Protected",
    icon: "🌍",
  },
];

export default function Dashboard() {
  return (
    <section className="dashboard" id="dashboard">

      <div className="section-title">
        <span>LIVE SECURITY STATUS</span>
        <h2>Threat Intelligence Dashboard</h2>
        <p>
          Real-time insights into our cybersecurity infrastructure.
        </p>
      </div>

      <div className="dashboard-grid">
        {stats.map((item, index) => (
          <div className="dashboard-card" key={index}>
            <div className="dashboard-icon">{item.icon}</div>
            <h3>{item.number}</h3>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

    </section>
  );
}