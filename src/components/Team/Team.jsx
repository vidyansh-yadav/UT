import "./Team.css";

const members = [
  {
    name: "Vidyansh Yadav",
    role: "Founder & Full Stack Developer",
    image: "/images/hero.png",
    github: "#",
    linkedin: "#",
    email: "mailto:vidyansh4545@gmail.com",
  },
  {
    name: "Alex Carter",
    role: "Red Team Specialist",
    image: "/images/earth.png",
    github: "#",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Sarah Khan",
    role: "Digital Forensics",
    image: "/images/hero.png",
    github: "#",
    linkedin: "#",
    email: "#",
  },
];

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="section-heading">
        <span>OUR TEAM</span>
        <h2>Meet The Elite</h2>
        <p>
          Experienced professionals protecting businesses against modern
          cyber threats.
        </p>
      </div>

      <div className="team-grid">
        {members.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} />

            <h3>{member.name}</h3>
            <p>{member.role}</p>

            <div className="team-socials">
              <a href={member.github}>GitHub</a>
              <a href={member.linkedin}>LinkedIn</a>
              <a href={member.email}>Email</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}