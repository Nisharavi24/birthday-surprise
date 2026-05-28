import { useState, useRef } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import PuzzleGame from "./components/PuzzleGame";
import ScratchCard from "./components/ScratchCard";

import bg from "./assets/photos/final.jpg";
import music from "./assets/audio/birthday.mp3";
import byeGif from "./assets/photos/peeking-bye.gif";

import img1 from "./assets/photos/img1.jpg";
import img2 from "./assets/photos/img2.jpg";
import img3 from "./assets/photos/img3.jpg";
import img4 from "./assets/photos/img4.jpg";
import img5 from "./assets/photos/img5.jpg";
import img6 from "./assets/photos/img6.jpg";

export default function App() {

  const [screen, setScreen] = useState("call");
  const audioRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [showArrow, setShowArrow] = useState(false);

  // 🎵 PLAY MUSIC
  const playMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(music);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
    }

    audioRef.current.play().catch(() => {});
  };

  // 🛑 STOP MUSIC (CLEAN + SAFE)
  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null; // IMPORTANT reset
    }
  };

  // 💬 MESSAGE ANIMATION
  const startMessages = async () => {

    const lines = [
      "Happy Birthday Anna 🌍❤️",
      "Eppome happy ah iru 😃💓",
      "Ennoda chellam aana anna nee mattum dha...puriyudha 🤗🌍❤️",
      "Unakaga naan eppome irupen ...maara maaten 😁💖",
      "En place ah naan yaarukum vitu kuduka maaten 😌❤️",
      "Ippo irukura madhriye naan eppome unaku important ah irukanum...okayy!!💖",
      "Apro nee yaarkitayum romba close laam aava kudadhu...enaku pudikadhu seriya 😌",
      "Enaku en anna va rombaaaaaaaaaaaaaaaaaaaaaaaaaaaaa pudikum 🥰❤️♾️",
      "Love you lots Anna 😁💖",
      "Once Again Happy Birthday Veshapoochi 🤗🌍❤️"
    ];

    const temp = [];

    for (let i = 0; i < lines.length; i++) {
      await new Promise(res => setTimeout(res, 1200));
      temp.push(lines[i]);
      setMessages([...temp]);
    }

    setShowArrow(true);
  };

  return (
    <>

      {/* 📞 CALL SCREEN */}
      {screen === "call" && (
        <WelcomeScreen
          onAccept={() => {
            playMusic();
            setScreen("intro");
          }}
        />
      )}

      {/* 🎂 INTRO SCREEN */}
      {screen === "intro" && (
        <div className="simple-page">

          <img src={bg} alt="bg" className="full-image" />

          <button
            className="arrow-btn"
            onClick={() => {
              stopMusic(); // 🔥 optional safety
              setScreen("puzzle");
            }}
          >
            →
          </button>

        </div>
      )}

      {/* 🧩 PUZZLE SCREEN */}
      {screen === "puzzle" && (
        <div className="simple-page">

          <PuzzleGame
            onComplete={() => setScreen("scratch")}
          />

        </div>
      )}

      {/* 🎁 SCRATCH SCREEN */}
      {screen === "scratch" && (
        <div className="scratch-page">

          <h2 className="scratch-title">
            HAPPY BIRTHDAY! 🤗🎁🌍❤️
          </h2>

          <ScratchCard
            onReveal={() => startMessages()}
          />

          {/* 💬 MESSAGES */}
          <div className="message-box">
            {messages.map((m, i) => (
              <p key={i} className="msg">
                {m}
              </p>
            ))}
          </div>

          {/* ➡ NEXT BUTTON */}
          {showArrow && (
            <button
              className="arrow-btn"
              onClick={() => {
                stopMusic();   // 🔥 FINAL STOP
                setScreen("next");
              }}
            >
              →
            </button>
          )}

        </div>
      )}

    {screen === "next" && (
  <div className="final-page">

    <h1 className="final-text">
      Stay happy always 😊💖 Have a great day ✨
    </h1>

    <div className="collage">
      <img src={img1} alt="" />
      <img src={img2} alt="" />
      <img src={img3} alt="" />
      <img src={img4} alt="" />
      <img src={img5} alt="" />
      <img src={img6} alt="" />
    </div>

    <img src={byeGif} className="bye-gif" />

  </div>
)}
   
    </>
  );
}