import "./ProcessTerminal.css";
import { useEffect, useState } from "react";
import {
  Activity,
  Cpu,
  Shield,
  Radar,
  Database,
  Globe,
} from "lucide-react";

const logs = [
  "[+] Initializing secure shell...",
  "[✓] Establishing encrypted tunnel...",
  "[✓] Reconnaissance completed.",
  "[✓] AI Threat Detection Enabled.",
  "[✓] Firewall Integrity Stable.",
  "[✓] Packet Inspection Running.",
  "[✓] Deep Vulnerability Scan Started.",
  "[✓] Monitoring Active Sessions.",
  "[✓] Dark Web Intelligence Synced.",
  "[✓] Zero-Day Detection Enabled.",
  "[✓] Malware Signature Updated.",
  "[✓] DNS Traffic Verified.",
  "[✓] Endpoint Protection Active.",
  "[✓] Live Threat Intelligence Ready.",
];

export default function ProcessTerminal() {
  const [terminal, setTerminal] = useState([]);
  const [cpu, setCpu] = useState(42);
  const [ram, setRam] = useState(67);
  const [threats, setThreats] = useState(18);
  const [connections, setConnections] = useState(324);
  const [time, setTime] = useState("");

  useEffect(() => {
    let index = 0;

    const logTimer = setInterval(() => {
      setTerminal((prev) => {
        if (index >= logs.length) {
          index = 0;
          return [];
        }

        const next = [...prev, logs[index]];
        index++;
        return next;
      });
    }, 850);

    const statTimer = setInterval(() => {
      setCpu(Math.floor(Math.random() * 25) + 35);
      setRam(Math.floor(Math.random() * 20) + 60);
      setThreats(Math.floor(Math.random() * 12) + 15);
      setConnections(Math.floor(Math.random() * 200) + 250);

      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
        })
      );
    }, 1000);

    return () => {
      clearInterval(logTimer);
      clearInterval(statTimer);
    };
  }, []);

  return (
    <div className="process-terminal">
      <div className="scan-line" />

      <div className="terminal-top">
        <div className="terminal-title">
          UNSEEN TERMINATION TERMINAL
        </div>

        <div className="terminal-status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>
      </div>

      <div className="terminal-content">

        {/* LEFT */}
        <div className="terminal-body">

          {terminal.map((item, index) => (
            <div className="terminal-line" key={index}>
              <span className="command">$</span>{" "}
              {item}
            </div>
          ))}

          <div className="terminal-line">
            <span className="command">$</span>

            waiting...

            <span className="cursor" />
          </div>

        </div>

        {/* RIGHT */}

        <div className="terminal-stats">

          <h4>SYSTEM STATUS</h4>

          <div className="stat">
            <span>CPU</span>
            <strong>{cpu}%</strong>
          </div>

          <div className="stat">
            <span>RAM</span>
            <strong>{ram}%</strong>
          </div>

          <div className="stat">
            <span>Threats</span>

            <strong className="threat-value">
              {threats}
            </strong>
          </div>

          <div className="stat">
            <span>Connections</span>
            <strong>{connections}</strong>
          </div>

          <div className="stat">
            <span>Time</span>
            <strong>{time}</strong>
          </div>

          <div className="terminal-health">

            <h4>

              SYSTEM HEALTH

            </h4>

            <div className="health-item">

              <Cpu size={18} />

              <div>

                <span>CPU LOAD</span>

                <div className="bar">

                  <div
                    className="progress-fill cpu"
                    style={{
                      width: `${cpu}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            <div className="health-item">

              <Activity size={18} />

              <div>

                <span>MEMORY</span>

                <div className="bar">

                  <div
                    className="progress-fill ram"
                    style={{
                      width: `${ram}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            <div className="health-item">

              <Shield size={18} />

              <div>

                <span>DEFENSE</span>

                <div className="bar">

                  <div
                    className="progress-fill defense"
                    style={{
                      width: "98%",
                    }}
                  />

                </div>

              </div>

            </div>

            <div className="health-item">

              <Radar size={18} />

              <div>

                <span>THREAT SCAN</span>

                <div className="bar">

                  <div
                    className="progress-fill radar"
                    style={{
                      width: "86%",
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="terminal-footer">

        <span>

          <Globe size={15} />

          GLOBAL NODE ONLINE

        </span>

        <span>

          <Database size={15} />

          AI DEFENSE ENGINE

        </span>

      </div>

    </div>
  );
}