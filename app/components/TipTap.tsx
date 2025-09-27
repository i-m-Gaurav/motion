"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useSession } from "next-auth/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import { Placeholder } from "@tiptap/extensions";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

const TipTap = () => {
    const [initialContent, setInitialContent] = useState<string | null>(null);
    console.log("Initial content:", initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your motion here...",
      }),
    ],
    content: initialContent || "<p>Loading...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      debounce(html);
    },
    onBlur: ({ editor }) => {
      const html = editor.getHTML();
      debounce(html);
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  useEffect(() => {
  if (editor && initialContent) {
    editor.commands.setContent(initialContent);
  }
}, [editor, initialContent]);


  const debounceTimer = useRef<NodeJS.Timeout | null>(null);


  function debounce(html: string) {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      saveContent(html);
    }, 1000);
  }

  const { data: session } = useSession();

  console.log("This is the editor ", editor);

  const saveContent = async (html: string) => {
    if (!session?.user) return;

    try {
      const { data } = await axios.post("/api/newMotion", {
        motionText: html,
        email: session.user.email,
      });
      console.log("Saved successfully:", data);
    } catch (err) {
      console.log("Error saving:", err);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (!session?.user?.email) return;
      try {
        const { data } = await axios.post("/api/getMotion", {
        
            email: session.user.email,
          
        });

        console.log("Fetched content:", data);

       if (Array.isArray(data) && data.length > 0) {
  setInitialContent(data[0]); // first saved motion
} else {
  setInitialContent("<p>Start writing... ✍️</p>");
}

      } catch (error) {
        console.error("Error loading motion:", error);
        setInitialContent("<p>Start writing... ✍️</p>");
      }
    };
    fetchContent();
  }, [session?.user?.email]);

  return (
    <>
      {editor ? <MenuBar editor={editor} /> : null}
      <div className=" max-w-3xl mx-auto p-4 ">
        <EditorContent editor={editor} className="tiptap-content" />
      </div>
    </>
  );
};

export default TipTap;
