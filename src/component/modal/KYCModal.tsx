import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import success from "../../img/succesimg.png";
import facescan from "../../img/facescan.png";
import { useAuth } from "../../api/useAuth";

const KYCModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const { faceVerify } = useAuth();

  const handleStartVerification = () => setStep(2);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const webcamRef = useRef<Webcam>(null);

 

  const handleConfirmFace = async () => {
    const video = webcamRef.current?.video;

    if (!video) {
      alert("Webcam not ready");
      return;
    }

    try {
      // ✅ Detect face
      const detection = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (!detection) {
        alert("❌ No face detected. Please try again.");
        return;
      }

      console.log("✅ Face detected");

      // ✅ Take snapshot of the frame
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to base64 (JPEG/PNG)
      const imageData = canvas.toDataURL("image/jpeg");

      // ✅ Send to backend
      const response = await faceVerify(imageData);

      if (response.data.success) {
        console.log("✅ Backend verified:", response.data);
        setStep(3); // proceed
      } else {
        alert("❌ Verification failed");
      }
    } catch (err) {
      console.error("Face detection error:", err);
      alert("Something went wrong.");
    }
  };

  // Load models on mount (only once)
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Adjust path as needed
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      {/* Step 1: Facial Verification Info */}
      {step === 1 && (
        <motion.div
          className="w-full max-w-md bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between border-b border-white/20 pb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                KYC Verification
              </h2>
              <p className="text-sm text-white/50">
                Secure your account with Quick Face Scan.
              </p>
            </div>
            <AiOutlineClose
              size={24}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-sky-500/20 rounded-full flex items-center justify-center mb-4">
              <img src={facescan} alt="Face Scan" className="w-16 h-16" />
            </div>
            <p className="text-sm text-gray-400">
              Confirm your identity quickly and securely using our facial
              recognition system. This process is completely automated and
              encrypted.
            </p>
          </div>

          <button
            onClick={handleStartVerification}
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
          >
            Verify
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          className="w-full max-w-md bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-6 items-center text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between border-b border-white/20 w-full pb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                KYC Verification
              </h2>
              <p className="text-sm text-white/50">
                Align your face with the frame.
              </p>
            </div>
            <AiOutlineClose
              size={24}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>

          {/* Webcam + Scanning Effect */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-sky-500/30 shadow-inner">
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="object-cover w-full h-full"
              ref={webcamRef} // <-- Add this!
            />

            {/* Scanning Bar */}
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
              <div className="absolute w-full h-[2px] bg-sky-400/80 animate-scanLine" />
            </div>

            {/* Optional Glow Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-sky-400/30 animate-pulse pointer-events-none"></div>
          </div>

          <p className="text-white/70 mt-2">
            ✔ Make sure your face is clearly visible
          </p>

          <button
            onClick={handleConfirmFace}
            disabled={!modelsLoaded}
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md w-full"
          >
            {modelsLoaded ? "Proceed" : "Loading models..."}
          </button>
        </motion.div>
      )}

      {/* Step 3: KYC Approved */}
      {step === 3 && (
        <motion.div
          className="w-full max-w-md bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center text-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between border-b border-white/20 w-full pb-4">
            <div>
              <h2 className="text-xl font-semibold text-start">
                KYC Verification
              </h2>
              <p className="text-sm text-white/50">
                You're approved to take surveys.
              </p>
            </div>
            <AiOutlineClose
              size={24}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>

          <img src={success} alt="..." className="w-20 mb-4 mx-auto" />

          <h2 className="text-xl text-white font-semibold text-start ">
            KYC Approved
          </h2>
          <p className="text-sm text-gray-400">
            You can now proceed to take surveys and earn.
          </p>

          <button
            onClick={onClose}
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md w-full"
          >
            Take Survey
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default KYCModal;
