"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import success from "../../img/succesimg.png";
import { useAuth } from "../../api/useAuth";
import ErrorModal from "./ErrorModal";

const UpdateBioModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [errmsg, setErrmsg] = useState("");
  const [openError, setOpenError] = useState(false);

  const { updateProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      dob: formData.get("dob"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      occupation: formData.get("occupation"),
      gender: formData.get("gender"),
      city: formData.get("city"),
      profession: formData.get("profession"),
      bio: formData.get("bio"),
    };

    console.log("Submitting Data:", data);

    try {
      const response = await updateProfile(data);
      /*  console.log("✅ Update Success:", response.data); */
      response.data && setStep(2); // move to success step
    } catch (error) {
      setErrmsg("Something went wrong while updating your profile.");
      setOpenError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      {/* Step 1 - Form */}
      {step === 1 && (
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-[#111] max-h-[80vh] overflow-y-auto border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30 pb-3">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Update Biodata
              </h2>
              <p className="text-sm text-white/50">
                Complete/Update your profile
              </p>
            </div>
            <AiOutlineClose size={24} onClick={onClose} />
          </div>

          {/* Example form fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="flex-1 bg-white/5 px-4 py-3 rounded-md outline-none text-sm"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="flex-1 bg-white/5 px-4 py-3 rounded-md outline-none text-sm "
              required
            />
          </div>

          <input
            type="date"
            name="dob"
            className="bg-white/5 text-blue-400 px-4 py-3 rounded-md outline-none text-sm uppercase"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            className="flex-1 bg-white/5 px-4 py-3 rounded-md outline-none text-sm "
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="flex-1 bg-white/5 px-4 py-3 rounded-md outline-none text-sm "
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="flex-1 bg-white/5 px-4 py-3 rounded-md outline-none text-sm "
            required
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            className="flex-1 bg-white/5 px-4 py-3 rounded-md outline-none text-sm "
            required
          />

          <select
            name="gender"
            className="bg-white/5 text-blue-400 px-4 py-3 rounded-md outline-none text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="text"
            name="city"
            placeholder="City"
            className="bg-white/5 px-4 py-3 rounded-md outline-none text-sm"
            required
          />
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            className="bg-white/5 px-4 py-3 rounded-md outline-none text-sm"
            required
          />

          <textarea
            name="bio"
            placeholder="Short Bio (50 characters max)"
            maxLength={50}
            className="bg-white/5 px-4 py-3 min-h-28 rounded-md outline-none text-sm"
          />

          <button
            type="submit"
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
          >
            Send
          </button>
        </motion.form>
      )}

      {/* Step 2 - Success */}
      {step === 2 && (
        <motion.div
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img src={success} alt="Success" className="w-24 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-white">
            Biodata Updated Successfully
          </h2>
          <p className="text-sm text-gray-400">
            You have successfully updated your profile
          </p>

          <button
            onClick={onClose}
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md w-full"
          >
            Done
          </button>
        </motion.div>
      )}

      {openError && (
        <ErrorModal onClose={() => setOpenError(false)} message={errmsg} />
      )}
    </div>
  );
};

export default UpdateBioModal;
