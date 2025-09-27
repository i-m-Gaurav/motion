"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useSession } from "next-auth/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import axios from "axios";

import React from "react";

const TipTap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p> 🌎️</p>",
    onUpdate : ({editor}) => {
      
      const html = editor.getHTML();
      saveContent(html);
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  const { data: session } = useSession();

  console.log("This is the editor ",editor);

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





  

  return (
    <>
      {editor ? <MenuBar editor={editor} /> : null}
      <EditorContent editor={editor} className="tiptap-content" />
    </>
  );
};

export default TipTap;
