import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import twitter from "../../img/twitter.png";
import instagram from "../../img/instagram.png";
import linkedin from "../../img/linkedin.png";
import facebook from "../../img/facebook.png";
import footlogo from "../../img/footlogo.png";
interface FooterInt {
  show: boolean;
}

const Footer: React.FC<FooterInt> = ({ show }) => {
  return (
    <footer className="bg-black text-white px-6 py-10 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 ">
        {/* Top CTA Section */}
        {show == true && (
          <div className="bg-gradient-to-b from-15%  from-black   via-sky-800 to-blue-400 rounded-3xl p-6 md:p-10 text-center flex flex-col items-center gap-4 shadow shadow-blue-700/90">
            <h2 className="text-xl md:text-5xl max-w-sm mx-auto font-light">
              You've Different Questions?
            </h2>
            <p className="text-gray-300 max-w-md text-sm md:text-base">
              We are dedicated to providing tailored responses and comprehensive
              support for all your specific needs
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link
                to="/contact"
                className="bg-black /95 hover:border-purple-600 border-black/95 border-2 text-white px-5 text-sm  py-2 rounded-md"
              >
                Contact Us Now
              </Link>
              <Link
                to="/marketplace"
                className="bg-black /95 hover:border-purple-600 border-black/95 border-2 text-white px-5 text-sm  py-2 rounded-md"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-6  lg:gap-10 text-white/70 translate-y-10 z-10">
          {/*  topA */}
          <div className=" flex flex-1 justify-between gap-2 lg:gap-10 scale-95 md:scale-100">
            {/* Brand */}
            <div className="lg:flex-2 flex-1 flex flex-col justify-center min-w-[100px] shadow-inner shadow-white/40 bg-white/8 p-3 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-2">
                Rewarded <br />
                Opinions. <br />
                Real Impact.
              </h3>
              <img src={logo} alt="Surdatics Logo" className="mt-4 mb-2 w-25" />
              <p className="text-xs text-white/40 mt-2 ">
                © 2025 All Rights Reserved. Surdatics Inc.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex lg:flex-1 items-center flex-col shadow-inner shadow-white/40 bg-white/8 p-3 rounded-2xl ">
              <h4 className="font-semibold text-white/95 mb-2">Social</h4>
              <div className="flex flex-col gap-4">
                <a href="#">
                  <img
                    src={instagram}
                    alt="Instagram"
                    className="w-8 md:w-10"
                  />
                </a>
                <a href="#">
                  <img src={linkedin} alt="LinkedIn" className="w-8 md:w-10" />
                </a>
                <a href="#">
                  <img src={facebook} alt="Facebook" className="w-8 md:w-10" />
                </a>
                <a href="#">
                  <img src={twitter} alt="Twitter" className="w-8 md:w-10" />
                </a>
              </div>
            </div>
          </div>

          {/* topB */}
          <div className="flex flex-1 justify-between gap-2 lg:gap-10 scale-95 md:scale-100">
            {/* Actions */}
            <div className="flex lg:flex-1  flex-col shadow-inner shadow-white/40 bg-white/8 p-3   rounded-2xl ">
              <h4 className="font-semibold text-white/95 mb-2">Actions</h4>
              <ul className="flex flex-col gap-4 mt-6 text-sm">
                <li>
                  <Link to="/survey" className="hover:underline">
                    Surveys
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace" className="hover:underline">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/surda" className="hover:underline">
                    $Surda
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className=" flex lg:flex-2 flex-col gap-2  ">
              <div className="shadow-inner shadow-white/40 bg-white/8 p-3 rounded-2xl flex-1">
                <h4 className="font-semibold text-white/95 mb-2">Newsletter</h4>
                <p className="text-sm mb-3">Stay up to date</p>
                <form className="flex flex-col sm:flex-row gap-2 md:rounded-full p-3 bg-white/10 ">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-3 py-2 placeholder:text-white/50 text-white/85 md:bg-transparent rounded-md w-full sm:w-auto"
                  />
                  <button
                    type="submit"
                    className="bg-white/80 text-black hover:bg-gray-300 px-4 py-2 rounded-full"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              <div className="shadow-inner shadow-white/40 bg-white/8 p-3 rounded-2xl">
                <div className="flex gap-4 mt-2 sm:mt-0 text-xs">
                  <Link to="#" className="hover:underline">
                    Terms of Use
                  </Link>
                  <Link to="#" className="hover:underline">
                    AML Policy
                  </Link>
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" border-t border-gray-800 p-2 md:p-3 flex flex-col sm:flex-row justify-center items-center text-xs rounded-full bg-cyan-300 ">
          <img
            src={footlogo}
            alt="Surdatics Logo"
            className="w-25 md:w-30"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
