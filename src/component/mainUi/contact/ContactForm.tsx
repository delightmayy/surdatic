"use client";
import { useState } from "react";

const ContactForm = () => {
  const [message, setMessage] = useState("");

  return (
    <section className="bg-black min-h-screen flex flex-col items-center px-4 py-16 md:px-6 text-white relative">

      <div className="absolute top-10 left-10 bg-cyan-300/70 p-20 blur-[100px]"></div>
      <div className="absolute bottom-10 right-10 bg-blue-500/40 p-30 blur-[100px]"></div>

      {/* Header Text */}
      <div className="text-center my-10">
        <button className="text-sm lg:text-base border border-white/30 rounded-full px-4 py-1 mb-3">
          Contact <span className="text-sky-400"> Us</span>
        </button>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Let's Have A Chat
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Questions about our survey solutions, we are here to help 24/7
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full mt-5 max-w-2xl bg-white/3 shadow-lg rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col gap-6 border border-white/20">
        <h3 className="text-xl font-medium text-center">Contact Us</h3>

        {/* Form Fields */}
        <form className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 flex flex-col">
              <label htmlFor="firstName" className="text-sm mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label htmlFor="lastName" className="text-sm mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your mail"
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please leave us a message"
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30 resize-none"
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {message.length}/300
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-sky-500/60 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
          >
            Done
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
