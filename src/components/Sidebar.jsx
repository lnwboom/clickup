// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="flex flex-col items-center px-3 py-20 bg-gray-300 border-r border-solid border-stone-300 w-[64px]x ">
      
      <nav className="">
        <ul className="space-y-5 ">
          <li>
            <Link to="/" className="block py-2 px-4 rounded-xl hover:bg-violet-200 ">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/32466b58dcb351853ab39aa806dbcc89dc141f906c82ed076005cdcbea512d16?"
                className=" w-full aspect-[0.95]   fill-neutral-400"
              />
            </Link>
          </li>
          <li>
            <Link to="/inbox" className="block py-2 px-4 rounded-xl hover:bg-violet-200">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6146b43378b667fa9eff69bfb785f13d72eba22269bf461467eec6a33bd63438?"
                className=" w-full aspect-[0.95]  fill-neutral-400 "
              />
            </Link>
          </li>
          <li>
            <Link to="/docs" className="block py-2 px-4 rounded-xl hover:bg-violet-200">
             <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5ceb90776a5b91b0afeba1d431abe9347935d52d2e44ac7087b265e915fce1f?"
              className="w-full aspect-[0.95] fill-neutral-400"
              />
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="block py-2 px-4 rounded-xl hover:bg-violet-200">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/04955d5b472a98b8daed6d68452159eca1b888774895226b6f286a6460b00246?"
                className="w-full aspect-[0.95] fill-neutral-400"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/whiteboard"
              className="block py-2 px-4 rounded-xl hover:bg-violet-200"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/95b3fe81f1127cefe9ccb891a2771ce997f0393e1170053360d88837f870fa82?"
                className=" w-full aspect-[0.95] fill-neutral-400"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
