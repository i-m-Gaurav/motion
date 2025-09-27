"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useSession } from "next-auth/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import { Placeholder } from "@tiptap/extensions";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

interface Page {
  _id: string;
  title: string;
  content: string;
}

interface TipTapProps {
  page: Page;
  onSave: (updatedPage: Page) => void;
}

const TipTap: React.FC<TipTapProps> = ({ page,  onSave }) => {
const [title,setTitle] = useState(page.title || "");
const [editorEnabled, setEditorEnabled] = useState(false);


  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your motion here...",
      }),
    ],
    content: page.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      debounce(html);
    },
    onBlur: ({ editor }) => {
      const html = editor.getHTML();
      debounce(html);
    },
    immediatelyRender: false,
    editable: editorEnabled, // control editability
  });

useEffect(() => {
  setTitle(page.title || "");
  if (editor) {
    editor.commands.setContent(page.content || "");
    editor.setEditable((page.title || "").trim().length > 0);
  }
}, [page, editor]);
// run whenever a new page is passed


  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function debounce(html: string) {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      saveContent(html);
    }, 1000);
  }

  useEffect(() => {
  if (editor) {
    editor.setEditable(title!== "untitled");
  }
}, [title, editor]);


  const { data: session } = useSession();

  console.log("This is the editor ", editor);

  const saveContent = async (html: string) => {
    if (!session?.user) return;

    try {
      const { data } = await axios.post("/api/newPage", {
        title,
        content: html,
        email: session.user.email,
        pageId: page._id,
      });
      console.log("Saved successfully:", data);
      // Call onSave with updated page object
      onSave({ ...page,title,  content: html });
    } catch (err) {
      console.log("Error saving:", err);
    }
  };

  return (
    <>
      {editor ? <MenuBar editor={editor} /> : null}



      <div>
        <input type="text" value ={title} onChange={(e) => setTitle(e.target.value)} className="text-2xl font-bold w-full p-2 mb-4 bg-transparent border-b border-gray-600 text-white focus:outline-none" />
        {!title && (
          <span className="text-red-500">Title cannot be empty</span>
        )}
      </div>
      <div className=" max-w-3xl mx-auto p-4 ">
        <EditorContent editor={editor} className="tiptap-content" />
      </div>
    </>
  );
};

export default TipTap;
