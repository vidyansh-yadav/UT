import "./ProcessTerminal.css";

export default function ProcessTerminal() {
  return (
    <div className="process-terminal">

      <div className="terminal-header">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>

        <h4>LIVE SECURITY TERMINAL</h4>
      </div>

      <div className="terminal-body">

        <p>
          <span>$</span> Initializing security engine...
        </p>

        <p>
          <span>$</span> Scanning attack surface...
        </p>

        <p>
          <span>$</span> Detecting vulnerabilities...
        </p>

        <p>
          <span>$</span> AI threat analysis...
        </p>

        <p>
          <span>$</span> Firewall status...
        </p>

        <p className="success">
          ✔ System Protected
        </p>

      </div>

    </div>
  );
}