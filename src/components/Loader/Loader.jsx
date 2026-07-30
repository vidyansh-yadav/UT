import { useEffect, useState } from "react";
import "./Loader.css";

const messages = [
  "Initializing Security Core...",
  "Checking Firewalls...",
  "Loading Threat Intelligence...",
  "Verifying Encryption...",
  "Launching Secure Environment..."
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);

          setTimeout(() => {
            onComplete();
          }, 800);

          return 100;
        }

        return prev + 2;
      });
    }, 60);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <div className="loader">
      <div className="loader-box">

        <h1>UNSEEN TERMINATION</h1>

        <h3>SECURITY CORE v3.0</h3>

        <p>{messages[messageIndex]}</p>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span>{progress}%</span>

      </div>
    </div>
  );
}