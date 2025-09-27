import Sidemenu from "./components/Sidemenu";
import TipTap from "./components/TipTap";


export default function Home() {
  return (
    <div className="flex">
     
     <div className="bg-red-500 ">
      <Sidemenu />
     </div>
     <div className="bg-[#191919] py-32 w-full">
      <div className="flex justify-center items-start h-screen text-3xl font-bold text-white">
     <TipTap/>
      </div>
     </div>

    </div>
  );
}
