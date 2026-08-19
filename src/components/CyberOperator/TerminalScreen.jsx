import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "[BOOT] CYBER OPERATOR SYSTEM",
  "[OK]   Secure kernel loaded",
  "[OK]   Encryption layer active",
  "[OK]   Network tunnel established",
  "[SCAN] Monitoring network...",
  "[SCAN] 17 nodes detected",
  "[SAFE] Threat monitoring active",
];

export default function TerminalScreen() {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);
  const index = useRef(0);

  useEffect(() => {
    setLines([]);
    index.current = 0;

    const interval = setInterval(() => {
      if (index.current >= BOOT_LINES.length) {
        clearInterval(interval);
        return;
      }

      setLines((prev) => [
        ...prev,
        BOOT_LINES[index.current],
      ]);

      index.current += 1;
    }, 650);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursor((v) => !v);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  return (
    <div className="terminal-screen">
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />

        <span className="terminal-title">
          OPERATOR://SECURE_TERMINAL
        </span>
      </div>

      <div className="terminal-body">
        {lines.map((line, i) => (
          <div
            key={`${line}-${i}`}
            className={
              line.includes("[SAFE]")
                ? "terminal-line safe"
                : line.includes("[SCAN]")
                ? "terminal-line scan"
                : "terminal-line"
            }
          >
            {line}
          </div>
        ))}

        <div className="terminal-command">
          operator@ut-system:~$
          {cursor && <span className="cursor">█</span>}
        </div>
      </div>
    </div>
  );
}