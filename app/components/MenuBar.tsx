"use client";
import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import React, { useState } from "react";

// Icons
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Type,
  Code,
  Quote,
  Strikethrough,
  Heading1,
  Heading2,
  ImagePlus,
  Heading3,
  ListTodo,
} from "lucide-react";

export function MenuBar({ editor }: { editor: Editor }) {
  const [showTextMenu, setShowTextMenu] = useState(false);
  // const url = window.prompt("Enter image URL");

  const wasSlashTyped = (ed: Editor) => {
    const { state } = ed;
    const { from, empty } = state.selection;
    if (!empty || from === 0) return false;
    const charBefore = state.doc.textBetween(from - 1, from);
    return charBefore === "/";
  };

  // Helper: remove slash before executing a command
  const removeSlashIfPresent = (ed: Editor) => {
    const { state } = ed;
    const { from, empty } = state.selection;
    if (!empty || from === 0) return;
    const charBefore = state.doc.textBetween(from - 1, from);
    if (charBefore === "/") {
      ed.chain().focus().deleteRange({ from: from - 1, to: from }).run();
    }
  };

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline?.().run() ?? true, // make sure underline extension is installed
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isStrike:ctx.editor.isActive("strike")?? false,
        canStrike : ctx.editor.can().chain().toggleStrike().run() ?? false,
        isTaskList: ctx.editor.isActive("taskList") ?? false,
        canTaskList: ctx.editor.can().chain().toggleTaskList().run() ?? false,
      };
    },
  });

  return (
    <div className="control-group">
      <BubbleMenu
        editor={editor}
        className="flex items-center gap-1 bg-neutral-900 text-white px-2 py-1 rounded-lg shadow-lg border border-neutral-700"
        // Show when the cursor is right after "/"
        shouldShow={({ editor }) => wasSlashTyped(editor)}
      >
        <button
          onClick={() => {
            const url = window.prompt("Enter image URL");
            if (url) {
              removeSlashIfPresent(editor);
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="p-1 rounded hover:bg-neutral-700"
        >
          <ImagePlus size = {16}/>
        </button>

        {/* Bold */}
        <button
          onClick={() => {
            removeSlashIfPresent(editor);
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editorState.canBold}
          className={`p-1 rounded hover:bg-neutral-700 ${editorState.isBold ? "bg-neutral-700" : ""}`}
        >
          <Bold size={16} />
        </button>

        {/* Underline */}
        <button
          onClick={() => {
            removeSlashIfPresent(editor);
            editor.chain().focus().toggleUnderline?.().run();
          }}
          disabled={!editorState.canUnderline}
          className={`p-1 rounded hover:bg-neutral-700 ${editorState.isUnderline ? "bg-neutral-700" : ""}`}
        >
          <Underline size={16} />
        </button>

        {/* Strike */}
        <button
          onClick={() => {
            removeSlashIfPresent(editor);
            editor.chain().focus().toggleStrike().run();
          }}
          disabled={!editorState.canStrike}
          className={`p-1 rounded hover:bg-neutral-700 ${editorState.isStrike ? "bg-neutral-700" : ""}`}
        >
          <Strikethrough size={16} />
        </button>

        {/* Italic */}
        <button
          onClick={() => {
            removeSlashIfPresent(editor);
            editor.chain().focus().toggleItalic().run();
          }}
          disabled={!editorState.canItalic}
          className={`p-1 rounded hover:bg-neutral-700 ${editorState.isItalic ? "bg-neutral-700" : ""}`}
        >
          <Italic size={16} />
        </button>

        <button
          onClick={() => {
            removeSlashIfPresent(editor);
            editor.chain().focus().toggleTaskList().run();
          }}
          className={`p-1 rounded hover:bg-neutral-700 ${editorState.isTaskList ? "bg-neutral-700" : ""}`}
        >
          <ListTodo size={16} />
        </button>

        {/* Text Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTextMenu((prev) => !prev)}
            className="p-1 rounded hover:bg-neutral-700 flex items-center"
          >
            <Type size={16} />
          </button>
          {showTextMenu && (
            <div className="absolute top-full left-0 mt-1 w-36 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg z-50">
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    removeSlashIfPresent(editor);
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    setShowTextMenu(false);
                  }}
                  className={`px-3 py-1 text-sm text-left hover:bg-neutral-700 ${editorState.isHeading1 ? "bg-neutral-700" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Heading1 /> <span>Heading 1</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    removeSlashIfPresent(editor);
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setShowTextMenu(false);
                  }}
                  className={`px-3 py-1 text-sm text-left hover:bg-neutral-700 ${editorState.isHeading2 ? "bg-neutral-700" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Heading2 /> <span>Heading 2</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    removeSlashIfPresent(editor);
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                    setShowTextMenu(false);
                  }}
                  className={`px-3 py-1 text-sm text-left hover:bg-neutral-700 ${editorState.isHeading3 ? "bg-neutral-700" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Heading3 /> <span>Heading 3</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    removeSlashIfPresent(editor);
                    editor.chain().focus().toggleCodeBlock().run();
                    setShowTextMenu(false);
                  }}
                  className={`px-3 py-1 text-sm text-left hover:bg-neutral-700 ${editorState.isCodeBlock ? "bg-neutral-700" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Code size={14} /> Code
                  </div>
                </button>
                <button
                  onClick={() => {
                    removeSlashIfPresent(editor);
                    editor.chain().focus().toggleBlockquote().run();
                    setShowTextMenu(false);
                  }}
                  className={`px-3 py-1 text-sm text-left hover:bg-neutral-700 ${editorState.isBlockquote ? "bg-neutral-700" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Quote size={14} /> Quote
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bullet list */}
        <button
          onClick={() => {
            removeSlashIfPresent(editor);
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`p-1 rounded hover:bg-neutral-700 ${editorState.isBulletList ? "bg-neutral-700" : ""}`}
        >
          <List size={16} />
        </button>

        {/* Ordered list */}
        <button
          onClick={() => {
            removeSlashIfPresent(editor);
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`p-1 rounded hover:bg-neutral-700 ${editorState.isOrderedList ? "bg-neutral-700" : ""}`}
        >
          <ListOrdered size={16} />
        </button>

        {/* Undo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className="p-1 rounded hover:bg-neutral-700 disabled:opacity-40"
        >
          <Undo2 size={16} />
        </button>

        {/* Redo */}
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className="p-1 rounded hover:bg-neutral-700 disabled:opacity-40"
        >
          <Redo2 size={16} />
        </button>
      </BubbleMenu>
    </div>
  );
}
