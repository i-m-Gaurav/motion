'use client';
import {useSession } from "next-auth/react";
import Sidemenu from "./components/Sidemenu";
import TipTap from "./components/TipTap";
import { useState , useEffect} from "react";
import { Page } from "./types/types";
import axios from 'axios';
export default function Home() {


  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const {data : session} = useSession();



 useEffect(() => {


  if (!session?.user?.email) return; // wait for session

  

  const fetchPages = async () => {
    try {
      const { data } = await axios.post("/api/getAllPages", { email: session?.user?.email });
      console.log("Fetched pages:", data);
      setPages(data);
      setSelectedPage(data[0] || null);
    } catch (err) {
      console.error("Failed to fetch pages:", err);
    }
  };

  fetchPages();
}, [session?.user?.email]);


  const handleSave = (updatedPage: Page) => {
    setPages(pages.map(p => p._id === updatedPage._id ? updatedPage : p));
  };


  return (
    
      <div className="flex h-screen min-w-0 bg-[#191919]">

<button onClick={hello}>
  click this nigga
</button>
        
        
        {/* Sidemenu with fixed width */}
        <div className=" w-64 h-full flex-shrink-0">
      <Sidemenu pages={pages} onSelect={setSelectedPage} onNewPage={(page) =>{
        setPages((prev)=> [page, ...prev]);
        setSelectedPage(page);
      }} />
        </div>
        {/* Main content area */}
        <div className="flex-1 bg-[#191919] flex items-start py-40 justify-center min-w-0 h-screen overflow-y-auto">
          <div className="w-full max-w-3xl px-4 py-8 text-3xl  text-white">
            {selectedPage && <TipTap page={selectedPage} onSave={handleSave} />}
          </div>
        </div>
      </div>
  
  );
}
