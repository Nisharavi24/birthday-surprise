import { useState, useEffect, useRef } from "react";
import puzzleImg from "../assets/photos/puzzle.jpg";
import winSound from "../assets/audio/win.mp3";

export default function PuzzleGame({ onComplete }) {

  const correct = [0,1,2,3,4,5,6,7,8];

  const [pieces, setPieces] = useState([
    2,0,1,
    5,4,3,
    6,7,8
  ]);

  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);

  const audioRef = useRef(null);

  // 🎵 play win sound once
  useEffect(() => {
    if (solved) {
      audioRef.current = new Audio(winSound);
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
  }, [solved]);

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const checkSolved = (newPieces) => {
    if (JSON.stringify(newPieces) === JSON.stringify(correct)) {
      setSolved(true);
    }
  };

  const handlePieceClick = (index) => {

    if (solved) return;

    if (selected === null) {
      setSelected(index);
      return;
    }

    const newPieces = [...pieces];

    // swap
    [newPieces[selected], newPieces[index]] =
    [newPieces[index], newPieces[selected]];

    setPieces(newPieces);
    setSelected(null);

    checkSolved(newPieces);
  };

  return (
    <div className="puzzle-page">

      <h1>🧩 Puzzle ah solve pannu</h1>

      <div className={`puzzle-grid ${solved ? "completed-grid" : ""}`}>

        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`piece ${selected === index ? "selected" : ""}`}
            onClick={() => handlePieceClick(index)}
            style={{
              backgroundImage: `url(${puzzleImg})`,
              backgroundSize: "300% 300%",
              backgroundPosition: `
                ${(piece % 3) * 50}% 
                ${Math.floor(piece / 3) * 50}%
              `
            }}
          />
        ))}

      </div>

      {/* AFTER SOLVE */}
      {solved && (
        <div className="after-solve">

          <h2 className="solve-text">
            Nee enaku eppovume romba special & important 🌍❤️
          </h2>

          <button
            className="arrow-btn"
            onClick={() => {
              stopSound();     // 🛑 stop win sound
              onComplete();    // go to next screen
            }}
          >
            →
          </button>

        </div>
      )}

    </div>
  );
}