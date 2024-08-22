import React, { useState } from "react";
import picAvatar from "../assets/avatar.png";
function Profile() {
  const [fullName, setFullName] = useState("Sorawit Taochoo");
  const [email, setEmail] = useState("Sorawittaochoo@gmail.com");

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = () => {
    // Implement password change logic
    console.log("Password change requested");
  };
  const handleLogoutAllSessions = () => {
    // Implement logout all sessions logic
    console.log("Logging out of all sessions");
  };

  return (
    <div>
      <div className="flex gap-2.5 py-4 px-4 text-sm  text-center capitalize whitespace-nowrap">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/953d437f63689f64f170290d9a5c7d8497f223136f71755e11883505a8941868?"
          alt=""
          className="w-5  aspect-[0.91] "
        />
        <div className=" font-bold text-neutral-700 ">Profile</div>
      </div>

      <hr className=" border-t border-neutral-300" />

      <div className="max-w-2xl mx-auto p-6 mt-10">
        <section className="mb-8">
          <h2 className="text-xl text-neutral-700 mb-4">Avatar</h2>
          <img
            src={picAvatar || "https://via.placeholder.com/30"}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border border-stone-200"
          />
        </section>

        <section className="mb-8">
          <h2 className="text-lg text-neutral-700 mb-2">Full Name</h2>
          <div className="flex items-center p-3 bg-white rounded-lg border border-neutral-300">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/953d437f63689f64f170290d9a5c7d8497f223136f71755e11883505a8941868?"
              alt=""
              className="w-5 h-5 mr-3"
            />
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              className="flex-grow text-slate-700 focus:outline-none"
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg text-slate-700 mb-2">Email</h2>
          <div className="flex items-center p-3 bg-white rounded-lg border border-neutral-300">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8edaee8f81848c477bbaa259a7eae42c94b094f5b37f92cb1c834574d245794?"
              alt=""
              className="w-5 h-5 mr-3"
            />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="flex-grow text-slate-700 focus:outline-none"
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg text-neutral-700 mb-2">Password</h2>
          <button
            onClick={handlePasswordChange}
            className="flex items-center p-3 bg-white rounded-lg border border-neutral-300 text-slate-700 hover:bg-gray-50"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7294a6515e5998a084d3b48411283de22259ec8ee5f45d01fc91c206463a4bf?"
              alt=""
              className="w-5 h-5 mr-3"
            />
            Change Password
          </button>
        </section>

        <hr className="my-8 border-t border-neutral-300" />

        <section>
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-neutral-500 mb-4">
            Log out of all sessions including any session on mobile, iPad, and
            other browsers
          </p>
          <button
            onClick={handleLogoutAllSessions}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
          >
            Log out of all sessions
          </button>
        </section>
      </div>
    </div>
  );
}

export default Profile;
