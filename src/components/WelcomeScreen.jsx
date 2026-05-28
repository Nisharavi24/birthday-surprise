import { useEffect, useRef, useState } from "react";
import { MdCall, MdCallEnd } from "react-icons/md";

import callerImg from "../assets/photos/caller.jpg";
import angryCat from "../assets/photos/angrycat.jpg";
import ringtone from "../assets/audio/ringtone.mp3";

export default function WelcomeScreen({ onAccept }) {
  const [declines, setDeclines] = useState(0);
  const [mode, setMode] = useState("call"); 
  const [shake, setShake] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
  audioRef.current = new Audio(ringtone);
  audioRef.current.loop = true;

  const startRingtone = () => {
    audioRef.current.play().catch(() => {});
    
    document.removeEventListener("click", startRingtone);
    document.removeEventListener("touchstart", startRingtone);
  };

  document.addEventListener("click", startRingtone);
  document.addEventListener("touchstart", startRingtone);

  return () => {
    audioRef.current?.pause();

    document.removeEventListener("click", startRingtone);
    document.removeEventListener("touchstart", startRingtone);
  };
}, []);

  // 🟢 Accept
  const handleAccept = () => {
    audioRef.current?.pause();
    onAccept();
  };

  // 🔴 Decline
  const handleDecline = () => {
    setDeclines((prev) => {
      const next = prev + 1;

      // shake always
      setShake(true);
      setTimeout(() => setShake(false), 400);

      // 1st decline → only shake
      if (next === 1) {
        return next;
      }

      // 2nd+ → warning screen
      setMode("warning");
      return next;
    });
  };

  // 😾 WARNING SCREEN (ONLY ONCE, REUSED ALWAYS)
  if (mode === "warning") {
    return (
      <div className="cat-screen">
        <img src={angryCat} alt="cat" />

        <h1> Vera option illa 😹</h1>

        <p className="warning-text">
          Accept panni dha aaganum 😈
        </p>

        <button
        className="back-btn"
          onClick={() => setMode("call")}
        >
          Back to Call
        </button>
      </div>
    );
  }

  // 📱 CALL SCREEN
  return (
    <div
      className={`call-screen ${shake ? "shake" : ""}`}
      style={{ backgroundImage: `url(${callerImg})` }}
    >
      <div className="overlay">

        {/* TOP TEXT */}
        <div className="caller-info">
          <h1>❤️ Happy Birthday ❤️</h1>
          <p>Incoming Birthday Call...</p>
        </div>

        {/* AVATAR */}
        <div className="avatar-ring">
          <img src={callerImg} alt="caller" />
        </div>

        {/* BUTTONS */}
        <div className="bottom-actions">

          <div className="action" onClick={handleDecline}>
            <button className="decline-btn">
              <MdCallEnd />
            </button>
            <span>Decline</span>
          </div>

          <div className="action" onClick={handleAccept}>
            <button className="accept-btn">
              <MdCall />
            </button>
            <span>Accept</span>
          </div>

        </div>

      </div>
    </div>
  );
}