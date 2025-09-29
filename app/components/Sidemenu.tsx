"use client";

import { Button } from "@/components/ui/button";
import { FileText, HomeIcon, LogOut, SearchIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import SignIn from "./sign-in";
import { Page } from "../types/types";
import SignOut from "./sign-out";
import { useEffect } from "react";

interface SidemenuProps {
  pages: Page[];
  onSelect: (page: Page) => void;
  onNewPage: (page: Page) => void; // 👈 new prop
}

const Sidemenu: React.FC<SidemenuProps> = ({ pages, onSelect, onNewPage }) => {
  const { data: session } = useSession();

  const handleNewPage = async () => {
    if (!session?.user?.email) return;

    const newPage: Page = {
      _id: "",
      title: "Untitled",
      content: "<p>Start writing...</p>",
    };

    try {
      const { data } = await axios.post("/api/newPage", {
        title: newPage.title,
        content: newPage.content,
        email: session.user.email,
      });

      const savedPage = data.page;
      onNewPage(savedPage);

      // onSelect(savedPage);
    } catch (err) {
      console.error("Error creating new page:", err);
    }
  };

  const handleDelete = async (pageId: string | undefined) => {
    try {
      await axios.post(`/api/deletePage?pageId=${pageId}`);
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  return (
    <div className="w-64 flex flex-col justify-between fixed h-screen bg-[#202020] text-white p-2">
      <div className="flex flex-col gap-2">
        <Button className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-white">
          <HomeIcon />
          <span>Home</span>
        </Button>

        <Button
          onClick={handleNewPage}
          className="w-full justify-start bg-neutral-800 hover:bg-neutral-700 text-white"
        >
          <span>New Page</span>
        </Button>

        {/* <div className="flex items-center gap-2 mt-4 px-1">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-b border-gray-600 focus:outline-none flex-1 text-white"
          />
        </div> */}

        <span className="text-sm mt-4 text-slate-400">Personal</span>

        <div className="flex flex-col gap-1 mt-2 max-h-98 scrollbar  overflow-y-auto">
          {pages.map((p) => (
            <div
              key={p._id || p.title}
              className="rounded-md cursor-pointer  hover:bg-neutral-700 px-3 "
              onClick={() => onSelect(p)}
            >
              <div className="flex group justify-start text-ellipsis items-center gap-2 py-1">
                <FileText size={17} />
                <span className="text-ellipsis truncate w-40 overflow-hidden">
                  {p.title || "Untitled"}
                </span>
                <button
                  className="hidden group-hover:flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(p._id);
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full my-1 cursor-pointer rounded-md py-1 justify-start   text-white">
        {session ? (
          <div className="flex items-center justify-between gap-1 px-2 ">
            <span className="px-2 bg-neutral-800 w-full rounded-sm py-1 hover:bg-neutral-700">
              {session?.user?.name}
            </span>
            {/* <span className="px-2 hover:bg-neutral-700 rounded-sm py-1"><LogOut/></span> */}
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
};

export default Sidemenu;
