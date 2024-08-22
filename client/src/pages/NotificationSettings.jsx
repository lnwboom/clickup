import React, { useState } from "react";

function NotificationSettings() {
  const [settings, setSettings] = useState({
    inbox: "Default",
    email: "Default",
    browser: true,
    mobile: "Default"
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const notificationTypes = [
    {
      key: "inbox",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7220c1358034496f31dc70f50b135bb47c0e6fbd0d8f00da240f6d4add8d774e?",
      title: "Inbox",
      description: "Default · ClickUp's recommended settings",
      type: "dropdown"
    },
    {
      key: "email",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b3f01bbeecd96e25ca12aa190063c36232590fd7589f9255e539e414d350468?",
      title: "Email",
      description: "Default · ClickUp's recommended settings",
      type: "dropdown"
    },
    {
      key: "browser",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ec5ff8adb0dc8aecb3555489c9ae6fe027ebe816d81240be0feb3811bb72c0c?",
      title: "Browser",
      description: "Default · ClickUp's recommended settings",
      type: "toggle"
    },
    {
      key: "mobile",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/79df5d1872493f651d42e904a33fcea7efda6c9f9babe23a6e55233671807e9c?",
      title: "Mobile",
      description: "Default · ClickUp's recommended settings",
      type: "dropdown"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-neutral-700 mb-6">Notification Settings</h1>

      {notificationTypes.map((type) => (
        <NotificationSetting
          key={type.key}
          icon={type.icon}
          title={type.title}
          description={type.description}
          type={type.type}
          value={settings[type.key]}
          onChange={(value) => handleSettingChange(type.key, value)}
        />
      ))}
    </div>
  );
}

function NotificationSetting({ icon, title, description, type, value, onChange }) {
  return (
    <div className="flex gap-4 px-5 py-8 mt-6 rounded-xl border border-gray-200">
      <img src={icon} alt={title} className="shrink-0 my-auto w-6 h-6" />
      <div className="flex flex-col flex-1 justify-center">
        <div className="flex flex-wrap gap-5 justify-between items-center">
          <div>
            <h2 className="text-base text-slate-700">{title}</h2>
            <p className="mt-2 text-sm text-stone-400">{description}</p>
          </div>
          {type === "dropdown" ? (
            <DropdownSetting value={value} onChange={onChange} />
          ) : (
            <ToggleSetting value={value} onChange={onChange} />
          )}
        </div>
      </div>
    </div>
  );
}

function DropdownSetting({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option>Default</option>
        <option>Custom</option>
        <option>Off</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

function ToggleSetting({ value, onChange }) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-14 h-8 rounded-full ${value ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${value ? 'transform translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">
        {value ? 'Enabled' : 'Disabled'}
      </div>
    </label>
  );
}

export default NotificationSettings;