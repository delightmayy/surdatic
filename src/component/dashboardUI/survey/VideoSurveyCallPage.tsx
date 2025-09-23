import { useState } from "react";
import { FaLink, FaVideo, FaVideoSlash } from "react-icons/fa";
import {
  FaArrowUpFromBracket,
  FaCircleDot,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa6";

const VideoSurveyCallPage = () => {
  const [messages /* setMessages */] = useState([
    { sender: "Adam Joseph", text: "Good Morning here" },
    { sender: "Surdatics AI", text: "Taking notes..." },
  ]);
  const [muteMic, setMutemic] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const participants = [
    { name: "Adam Joseph", role: "Creator", img: "/avatars/user1.png" },
    { name: "Alison Eyo", role: "Participant", img: "/avatars/user2.png" },
  ];

  const stateDown = {
    title: " Examining Safety Compliance rate among senior managers",
    dateTime: "03/07/2025 | 11:30 PM",
    link: "https://surdatics3...",
  };

  return (
    <div className="min-h-screen text-white pt-4 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Left Column */}
        <div className=" flex-1 space-y-4 lg:w-2/3 text-white/80 ">
          <div className=" p-2">
            <h2 className="text-sm font-semibold mb-1">Survey Information</h2>
            <p className="text-xs text-white/60">Your response, your reward</p>
          </div>

          <div className="flex flex-wrap justify-between items-center shadow shadow-white/25 p-2 bg-white/3 gap-2 pe-6">
            <div className="flex items-center gap-3 sm:gap-6 ">
              <FaVideo size={34} className="text-blue-400" />
              <div>
                <p className="text-sm font-semibold line-clamp-1">
                  {stateDown.title}
                </p>
                <p className="text-xs text-white/60 mt-1">
                  {stateDown.dateTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2  ">
              <div className="flex items-center ">
                <img
                  src="https://picsum.photos/400/300?random=13"
                  alt="Survey"
                  className="rounded-full w-10 h-10 object-cover"
                />
                <img
                  src="https://picsum.photos/400/300?random=14"
                  alt="Survey"
                  className="rounded-full w-10 h-10 object-cover -translate-x-3"
                />
              </div>
              <p className="text-xs flex items-center gap-1 font-semibold text-blue-400 rounded-full border border-blue-400/50 py-1.5 px-4">
                <FaLink />
                <span>| {stateDown.link}</span>
              </p>
            </div>
          </div>

          <div className="border rounded-b-2xl bg-white/3 border-white/10 p-3 sm:p-4 pb-8">
            {/* Video Call */}
            <section className="space-y-3">
              {/* Main Video */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 h-[50vh]">
                <img
                  src="https://picsum.photos/400/300?random=13"
                  alt="Main"
                  className="object-cover w-full md:h-full h-64 "
                />

                {/* //Absolute  */}

                <p className="absolute bottom-2 left-2 text-xs bg-black/45 px-2 py-1 rounded-full flex gap-1 items-center-safe ">
                  <FaCircleDot
                    size={20}
                    className="text-white rounded-full bg-red-500"
                  />{" "}
                  Adam Joseph
                </p>
                <span className="absolute top-2 left-2 text-xs bg-black/45 px-2 py-1 rounded-full ">
                  1:40:45
                </span>

                <button className="absolute bottom-2 right-2 bg-black/45 px-2 py-1 rounded-full text-xl ">
                  ⚙️
                </button>
                <button className="absolute top-1 right-2 text-base bg-black/45 p-1 w-9 h-9  rounded-full text-white ">
                  ⛶
                </button>
              </div>

              {/* Small Participant Video */}
              <div className="flex flex-wrap items-center gap-4 justify-between">
                {/*  left Area */}
                <div className="flex w-1/3 gap-2">
                  <div className="relative w-full h-20 lg:h-24 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src="https://picsum.photos/400/300?random=13"
                      alt="Participant"
                      className="object-cover"
                    />
                    <p className="absolute bottom-1 left-1 text-[10px] bg-black/40 px-1 rounded">
                      Alison Eyo
                    </p>

                    <FaMicrophone className="absolute bottom-1 right-1 text-[10px] bg-black/40 px-1 rounded" />
                  </div>
                </div>

                {/* right Area */}
                <div className="flex-1 flex-col items-center  py-1 ">
                  <div className="flex items-center   gap-2 max-w-54 mx-auto md:-translate-x-4 rounded-full bg-white/8 p-1">
                    <img
                      src="https://picsum.photos/400/300?random=13"
                      alt="Survey"
                      className="rounded-full w-10 h-10  object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold tracking-wider">
                        Adam Joseph
                      </p>
                      <p className="text-xs text-white/60">Creator</p>
                    </div>
                  </div>
                  {/* Controls */}
                  <div className="flex  justify-center gap-3 mt-3">
                    {muteMic ? (
                      <FaMicrophone
                        size={34}
                        className=" p-1 rounded-full bg-blue-500 text-sm"
                        onClick={() => setMutemic(!muteMic)}
                      />
                    ) : (
                      <FaMicrophoneSlash
                        size={34}
                        className=" p-1 rounded-full bg-red-500 text-sm"
                        onClick={() => setMutemic(!muteMic)}
                      />
                    )}

                    {showVideo ? (
                      <FaVideo
                        size={36}
                        className=" p-2 rounded-full bg-blue-500 text-sm"
                        onClick={() => setShowVideo(!showVideo)}
                      />
                    ) : (
                      <FaVideoSlash
                        size={36}
                        className=" p-2 rounded-full bg-red-500 text-sm"
                        onClick={() => setShowVideo(!showVideo)}
                      />
                    )}

                    <FaArrowUpFromBracket
                      size={35}
                      className=" p-2 rounded-full bg-blue-500 text-sm"
                    />

                    <button className="bg-red-500 hover:bg-red-600 p-2 px-6 rounded-full text-sm">
                      End Call
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 sm:px-4 lg:px-1 ">
          {/* Available Survey */}
          <section className=" p-2  ">
            <h2 className="text-sm font-semibold mb-2">Available Survey</h2>
            <p className="text-xs text-white/60">
              This is the survey you can take
            </p>
          </section>
          {/* Participants */}
          <h2 className="text-sm mt-3 font-semibold p-4 bg-white/2">
            Participants
          </h2>
          <section className="border bg-white/3  border-white/10 p-2 sm:p-4 pb-8">
            <ul className="space-y-2 px-auto">
              {participants.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 lg:gap-3 mx-auto  rounded-full bg-white/8 p-1  pe-4"
                >
                  <img
                    src="https://picsum.photos/400/300?random=13"
                    alt="Survey"
                    className="rounded-full w-10 h-10  object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-wider">
                      {p.name}
                    </p>
                    <p className="text-xs text-white/60">{p.role}</p>
                  </div>
                  <div className="flex items-center gap-1 ">
                    {muteMic ? (
                      <FaMicrophone
                        size={20}
                        className="text-blue-500"
                        onClick={() => setMutemic(!muteMic)}
                      />
                    ) : (
                      <FaMicrophoneSlash
                        size={20}
                        className="text-red-500"
                        onClick={() => setMutemic(!muteMic)}
                      />
                    )}
                    {showVideo ? (
                      <FaVideo
                        size={20}
                        className="text-blue-500"
                        onClick={() => setShowVideo(!showVideo)}
                      />
                    ) : (
                      <FaVideoSlash
                        size={20}
                        className="text-red-500"
                        onClick={() => setShowVideo(!showVideo)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </section>
          {/* Chats */}
          <h2 className="text-sm mt-4 font-semibold p-4 bg-white/2">Chats</h2>
          <section className="border  bg-white/3 border-white/10 p-2 sm:p-4  pb-8 h-[40vh] overflow-y-auto">
            <div className="space-y-2 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 lg:gap-3 mx-auto  rounded-full bg-white/8 p-1  pe-4"
                >
                  <img
                    src="https://picsum.photos/400/300?random=13"
                    alt="Survey"
                    className="rounded-full w-10 h-10  object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-wider">
                      {m.text}
                    </p>
                    {/*  <p className="text-xs text-white/60">{p.role}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </section>{" "}
          <div className="flex py-4 gap-2 mt-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-xs bg-black/30 border border-white/10 rounded p-2 focus:outline-0 "
            />
            <button className="bg-blue-400 text-black text-xs px-3 py-1 rounded-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSurveyCallPage;
