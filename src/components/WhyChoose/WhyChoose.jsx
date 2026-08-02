import "./WhyChoose.css";

import WhyCard from "./WhyCard";

import {
  ShieldCheck,
  BrainCircuit,
  Radar,
  ScanSearch,
  Fingerprint,
  Activity
} from "lucide-react";

const features = [

  {
    number: "01",
    icon: ShieldCheck,
    title: "Enterprise Security",
    text:
      "Enterprise-grade protection designed to secure modern infrastructure against advanced cyber threats."
  },

  {
    number: "02",
    icon: BrainCircuit,
    title: "AI Threat Detection",
    text:
      "Behavioral analysis and intelligent monitoring identify suspicious activity before it escalates."
  },

  {
    number: "03",
    icon: ScanSearch,
    title: "Penetration Testing",
    text:
      "Comprehensive security assessments that uncover vulnerabilities before attackers do."
  },

  {
    number: "04",
    icon: Radar,
    title: "Threat Intelligence",
    text:
      "Real-time visibility into global cyber threats with actionable security intelligence."
  },

  {
    number: "05",
    icon: Fingerprint,
    title: "Digital Forensics",
    text:
      "Investigate incidents, recover digital evidence and understand attack timelines."
  },

  {
    number: "06",
    icon: Activity,
    title: "24/7 Monitoring",
    text:
      "Continuous monitoring and rapid response for critical systems around the clock."
  }

];

export default function WhyChoose() {

  return (

    <section className="why">

      <div className="why-header">

        <span className="why-badge">

          WHY CHOOSE US

        </span>

        <h2>

          Cyber Security

          <span>

            Built For The Modern World

          </span>

        </h2>

        <p>

          We combine offensive security, defensive engineering,
          threat intelligence and continuous monitoring into a
          unified security platform built for businesses,
          organizations and modern digital infrastructure.

        </p>

      </div>


      <div className="why-grid">

        {

          features.map((item) => (

            <WhyCard

              key={item.number}

              {...item}

            />

          ))

        }

      </div>

    </section>

  );

}