import React, { useState } from "react";

function Settings() {
  const [language, setLanguage] = useState("English");
  const [preferences, setPreferences] = useState({
    flyoutToast: false,
    ctrlEnterComment: false,
    notepad: false,
    darkMode: false,
    offlineSync: false,
    clickUpVerified: false,
  });

  const handleLanguageChange = () => {
    // Implement language change logic
    console.log("Language change requested");
  };

  const handlePreferenceChange = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogoutAllSessions = () => {
    // Implement logout all sessions logic
    console.log("Logging out of all sessions");
  };

  return (
    <div>
      <div className="flex gap-2.5 py-4 px-4 text-sm  text-center capitalize whitespace-nowrap bg-white">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8c3530bccf0a9170bb89a827f7bedec3bb9162f44f0b741e6b1026a356fb7e0?"
          alt=""
          className="w-5  aspect-[0.91] "
        />
        <div className=" font-bold text-neutral-700 ">Settings</div>
      </div>

      <hr className=" border-t border-neutral-300" />
      <div className="mx-auto p-6 bg-white shadow-md ">
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">
            Language & Region
          </h2>
          <p className="text-sm text-neutral-500 mb-4">
            Customize your language and region.
          </p>
          <div
            className="flex justify-between items-center px-4 py-3 bg-white rounded-lg border border-neutral-300 cursor-pointer"
            onClick={handleLanguageChange}
          >
            <span className="text-lg text-slate-700">{language}</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f4850c070861050abcc8319e21dffd03ac458b26d18dc555a44635d9af85321?"
              alt="Dropdown"
              className="w-4 h-4"
            />
          </div>
        </section>

        <hr className="my-8 border-t border-neutral-300" />

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">Color</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Use color to visually differentiate projects.
          </p>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a599ddca3260837b23ae59810a1a5cd18701b7bd0d85b2d16b7a696d1a5517d?"
            alt="Color options"
            className="w-24"
          />
        </section>

        <hr className="my-8 border-t border-neutral-300" />

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-700 mb-4">
            Preferences
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            Manage your in-app preferences.
          </p>

          {Object.entries(preferences).map(([key, value]) => (
            <PreferenceToggle
              key={key}
              label={getPreferenceLabel(key)}
              description={getPreferenceDescription(key)}
              checked={value}
              onChange={() => handlePreferenceChange(key)}
            />
          ))}
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

function PreferenceToggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="font-medium text-gray-900">{label}</label>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function getPreferenceLabel(key) {
  const labels = {
    flyoutToast: "Flyout Toast Message",
    ctrlEnterComment: "Don't post comments with Enter",
    notepad: "Notepad",
    darkMode: "Dark Mode",
    offlineSync: "Sync data for offline mode",
    clickUpVerified: "ClickUp Verified",
  };
  return labels[key] || key;
}

function getPreferenceDescription(key) {
  const descriptions = {
    flyoutToast:
      "When performing actions, toast messages may appear in the bottom left-hand of your screen. You can disable that here.",
    ctrlEnterComment:
      "Use Ctrl + Enter to send comments instead of just Enter.",
    notepad:
      "Turn this off to hide the notepad in the bottom right corner of your screen.",
    darkMode: "Don't like the brightness? Go to the dark side of ClickUp.",
    offlineSync:
      "Sync tasks data in background to be able to view tasks in offline mode",
    clickUpVerified: "You can disable your ClickUp Verified checkmark.",
  };
  return descriptions[key] || "";
}

export default Settings;
