import { SessionProvider } from "next-auth/react";
import Sidemenu from "./components/Sidemenu";
import TipTap from "./components/TipTap";

export default function Home() {
  return (
    <SessionProvider>
      <div className="flex h-screen min-w-0 overflow-hidden">
        {/* Sidemenu with fixed width */}
        <div className=" w-64 h-full flex-shrink-0">
          <Sidemenu />
        </div>
        {/* Main content area */}
        <div className="flex-1 bg-[#191919] flex items-start py-40 justify-center h-full min-w-0">
          <div className="w-full max-w-3xl px-4 py-8 text-3xl font-bold text-white">
            <TipTap />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
