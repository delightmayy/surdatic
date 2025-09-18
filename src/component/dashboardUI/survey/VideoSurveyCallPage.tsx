

import { useState } from "react";


const VideoSurveyCallPage = () => {
  const [messages, /* setMessages */] = useState([
    { sender: "Adam Joseph", text: "Good Morning here" },
    { sender: "Surdatics AI", text: "Taking notes..." },
  ]);

  const participants = [
    { name: "Adam Joseph", role: "Creator", img: "/avatars/user1.png" },
    { name: "Alison Eyo", role: "Participant", img: "/avatars/user2.png" },
  ];

  return (
    <div className="min-h-screen text-white pt-4 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Left Column */}
        <div className="flex-1 space-y-4 lg:w-2/3 border rounded-b-2xl border-white/10 p-3 sm:p-4 pb-8">
          {/* Survey Info */}
          <section>
            <h2 className="text-sm font-semibold mb-2">Survey Information</h2>
            <div className="flex items-center gap-2">
              <img
                src="/survey-thumb.jpg"
                alt="Survey"
                width={80}
                height={50}
                className="rounded-lg object-cover"
              />
              <div>
                <p className="text-xs font-semibold">
                  Examining Safety Compliance rate among senior managers
                </p>
                <p className="text-[10px] text-white/60">
                  03/07/2025 | 11:30 PM
                </p>
              </div>
            </div>
          </section>

          {/* Video Call */}
          <section className="space-y-3">
            {/* Top Bar */}
            <div className="flex justify-between text-xs text-white/70">
              <span className="bg-black/20 px-3 py-1 rounded">1:40:45</span>
              <div className="flex gap-2">
                <button className="bg-black/20 p-1 rounded">⚙️</button>
                <button className="bg-black/20 p-1 rounded">⛶</button>
              </div>
            </div>

            {/* Main Video */}
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <img
                src="/avatars/user1.png"
                alt="Main"
                width={800}
                height={400}
                className="object-cover w-full h-64"
              />
              <p className="absolute bottom-2 left-2 text-xs bg-black/40 px-2 py-1 rounded">
                Adam Joseph
              </p>
            </div>

            {/* Small Participant Video */}
            <div className="flex gap-2">
              <div className="relative w-24 h-20 rounded-lg overflow-hidden border border-white/10">
                <img
                  src="/avatars/user2.png"
                  alt="Participant"
                  className="object-cover"
                />
                <p className="absolute bottom-1 left-1 text-[10px] bg-black/40 px-1 rounded">
                  Alison Eyo
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3 mt-3">
              <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-sm">
                🎤
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-sm">
                🎥
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-sm">
                📁
              </button>
              <button className="bg-red-500 hover:bg-red-600 p-2 px-6 rounded-full text-sm">
                End Call
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 sm:px-4 lg:px-1 space-y-6">
          {/* Available Survey */}
          <section className="border rounded-b-2xl border-white/10 p-2 sm:p-4 pb-8">
            <h2 className="text-sm font-semibold mb-2">Available Survey</h2>
            <p className="text-xs text-white/60">This is the survey you can take</p>
          </section>

          {/* Participants */}
          <section className="border rounded-b-2xl border-white/10 p-2 sm:p-4 pb-8">
            <h2 className="text-sm font-semibold mb-2">Participants</h2>
            <ul className="space-y-2">
              {participants.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <img
                    src={p.img}
                    alt={p.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="text-xs">{p.name}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Chats */}
          <section className="border rounded-b-2xl border-white/10 p-2 sm:p-4 pb-8">
            <h2 className="text-sm font-semibold mb-2">Chats</h2>
            <div className="space-y-2 text-xs">
              {messages.map((m, i) => (
                <p key={i}>
                  <span className="font-semibold">{m.sender}: </span>
                  <span className="text-white/70">{m.text}</span>
                </p>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 text-xs bg-black/30 border border-white/10 rounded px-2 py-1"
              />
              <button className="bg-blue-400 text-black text-xs px-3 py-1 rounded-md">
                Send
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VideoSurveyCallPage;
