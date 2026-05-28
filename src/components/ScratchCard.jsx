import { useEffect, useRef, useState } from "react";
import hiddenImg from "../assets/photos/reveal.jpg";
import revealAudio from "../assets/audio/reveal.mp3";

export default function ScratchCard({ onReveal }) {

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const playAudio = () => {
    const audio = new Audio(revealAudio);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Scratch here", canvas.width / 2, canvas.height / 2);
  }, []);

  const startDraw = () => {
    if (revealed) return;
    isDrawing.current = true;
  };

  const stopDraw = () => {
    isDrawing.current = false;
    checkReveal();
  };

  const draw = (e) => {
    if (!isDrawing.current || revealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;

    for (let i = 0; i < pixels.data.length; i += 4) {
      if (pixels.data[i + 3] === 0) cleared++;
    }

    const percent = (cleared / (pixels.data.length / 4)) * 100;

    if (percent > 55 && !revealed) {
      setRevealed(true);
      playAudio();

      if (onReveal) onReveal();
    }
  };

  return (
    <div className="scratch-box">

      <img
        src={hiddenImg}
        className="scratch-image"
        alt="reveal"
        draggable={false}
      />

      {!revealed && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onMouseDown={startDraw}
          onMouseUp={stopDraw}
          onMouseMove={draw}
          onTouchStart={startDraw}
          onTouchEnd={stopDraw}
          onTouchMove={draw}
        />
      )}

    </div>
  );
}