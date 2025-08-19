import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 24,
    seconds: 1,
  });

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col mt-3 items-center md:items-start text-white text-sm">
      <span className="text-xs text-gray-400 mb-1">Listing Countdown</span>

      <div className="flex items-center bg-[#1f1f1f] px-4 py-1 rounded-full shadow-md space-x-2">
        {/* Hours */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#101010] flex items-center justify-center text-sky-400 font-semibold text-sm">
          {formatTime(timeLeft.hours)}
        </div>
        <span className="text-gray-400 font-semibold">:</span>

        {/* Minutes */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#101010] flex items-center justify-center text-gray-200 font-semibold text-sm">
          {formatTime(timeLeft.minutes)}
        </div>
        <span className="text-gray-400 font-semibold">:</span>

        {/* Seconds */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#101010] flex items-center justify-center text-gray-200 font-semibold text-sm">
          {formatTime(timeLeft.seconds)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
