"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

import React from "react";

const TipTap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <>
      {editor ? <MenuBar editor={editor} /> : null}

      <EditorContent editor={editor} className="tiptap-content" />
    </>
  );
};

export default TipTap;
