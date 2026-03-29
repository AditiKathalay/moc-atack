"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // 🌸 COUNTDOWN
  useEffect(() => {
    const weddingDate = new Date("2026-02-20");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("It's the big day!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setTimeLeft(`${days} days to go 💐`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🎵 MUSIC
  useEffect(() => {
    const music = new Audio("/Dandelions_Instrumental.mp3");
    music.loop = true;

    const playMusic = () => {
      music.play().then(() => {
        setIsPlaying(true);

        music.volume = 0;
        let vol = 0;

        const fade = setInterval(() => {
          if (vol < 0.3) {
            vol += 0.03;
            music.volume = vol;
          } else {
            clearInterval(fade);
          }
        }, 200);
      });

      window.removeEventListener("click", playMusic);
    };

    window.addEventListener("click", playMusic);
    setAudio(music);

    return () => {
      window.removeEventListener("click", playMusic);
      music.pause();
    };
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        darkMode ? "bg-[#2f3e2f] text-white" : "bg-[#fdf6f0] text-[#4a5a4a]"
      }`}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* NAVBAR */}
      <div className={`flex justify-between items-center p-6 sticky top-0 backdrop-blur-md z-50 transition-all duration-500 ${ darkMode ? "bg-[#2f3e2f]/80 text-white": "bg-[#fdf6f0]/80 text-[#4a5a4a]"}`}>
        <h1 className="text-2xl font-bold">Aditi</h1>

        <div className="flex gap-6 text-sm md:text-base">
          <button onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>Home</button>
          <button onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}>RSVP</button>
          <button onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}>Events</button>
          <button onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}>Gallery</button>
          <button onClick={() => document.getElementById("things")?.scrollIntoView({ behavior: "smooth" })}>Things To Do</button>
          <button onClick={() => document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth" })}>FAQs</button>
        </div>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* HERO */}
      <div id="home">
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl mb-4" style={{ fontFamily: "Dancing Script" }}>
            We're Getting Married
          </h2>
          <p className="text-xl">Save the Date</p>
        </motion.div>
      </div>

      {/* COUNTDOWN */}
      <div className="text-center mt-10 text-2xl">{timeLeft}</div>

      {/* STORY */}
      <motion.div
        className="mt-20 px-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h3 className="text-3xl mb-6">Our Story 💌</h3>
        <p>It all started with a simple hello... and turned into forever.</p>
      </motion.div>

      {/* EVENTS */}
      <div id="events" className="mt-20 text-center">
        <h3 className="text-3xl mb-6">Events & Schedule 🌸</h3>
        <p>Haldi | Mehendi | Wedding Ceremony</p>
      </div>

      {/* RSVP */}
      <motion.div
        id="rsvp"
        className="mt-20 text-center"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
      >
        <h3 className="text-3xl mb-4">RSVP 🌸</h3>
        <form className="flex flex-col items-center gap-4">
          <input className="p-3 rounded-xl border w-64" placeholder="Your Name" />
          <button className="bg-[#a3b18a] px-6 py-2 rounded-xl text-white">
            Send 💌
          </button>
        </form>
      </motion.div>

      {/* GALLERY */}
      <div id="gallery" className="mt-20 text-center">
        <h3 className="text-3xl mb-6">Memories 📸</h3>
        <div className="grid grid-cols-2 gap-4 px-10">
          <div className="bg-[#e8d8c4] h-40 rounded-xl" />
          <div className="bg-[#d8e2dc] h-40 rounded-xl" />
        </div>
      </div>

      {/* THINGS */}
      <div id="things" className="mt-20 text-center">
        <h3 className="text-3xl mb-6">Things To Do 🌿</h3>
      </div>

      {/* FAQ */}
      <div id="faqs" className="mt-20 text-center">
        <h3 className="text-3xl mb-6">FAQs 💌</h3>
      </div>

      {/* MUSIC BUTTON */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => {
            if (!audio) return;

            if (isPlaying) {
              audio.pause();
            } else {
              audio.play();
            }

            setIsPlaying(!isPlaying);
          }}
          className="bg-[#6b8f71] text-white px-4 py-2 rounded-full"
        >
          {isPlaying ? "⏸ Pause" : "🎵 Play"}
        </button>
      </div>
    </div>
  );
}