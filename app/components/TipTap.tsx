"use client";

import React from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Strike from "@tiptap/extension-strike";
import { BubbleMenu } from "@tiptap/react/menus";

// lucide-react icons
import { Bold, Italic, Strikethrough, Code, Type } from "lucide-react";
import {
  Undo2,
  Redo2,
  List,
  ListOrdered,
  Quote,
  SquareCode,
} from "lucide-react";

const TipTap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Strike],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  // local state for the Text dropdown toggle (open on click, not on hover)
  const [isTextDropdownOpen, setIsTextDropdownOpen] = React.useState(false);
  const textDropdownRef = React.useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click or on Escape
  React.useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (!isTextDropdownOpen) return;
      const target = e.target as Node;
      if (
        textDropdownRef.current &&
        !textDropdownRef.current.contains(target)
      ) {
        setIsTextDropdownOpen(false);
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      if (!isTextDropdownOpen) return;
      if (e.key === "Escape") setIsTextDropdownOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isTextDropdownOpen]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor?.isActive("code") ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor?.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor?.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          options={{ placement: "top", offset: 8, flip: true }}
        >
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl p-2 border border-[#2a2a2a] shadow-lg">
            {/* Bold */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-md hover:bg-[#2a2a2a] ${
                editorState?.isBold
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-300"
              }`}
              type="button"
            >
              <Bold size={18} />
            </button>

            {/* Italic */}
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-md hover:bg-[#2a2a2a] ${
                editorState?.isItalic
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-300"
              }`}
              type="button"
            >
              <Italic size={18} />
            </button>

            {/* Strike */}
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded-md hover:bg-[#2a2a2a] ${
                editorState?.isStrike
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-300"
              }`}
              type="button"
            >
              <Strikethrough size={18} />
            </button>

            {/* Inline Code */}
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 rounded-md hover:bg-[#2a2a2a] ${
                editorState?.isCode
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-300"
              }`}
              type="button"
            >
              <Code size={18} />
            </button>

            {/* Dropdown - Text formats (click to toggle) */}
            <div className="relative" ref={textDropdownRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isTextDropdownOpen}
                onClick={() => setIsTextDropdownOpen((v) => !v)}
                className="flex items-center gap-1 p-2 rounded-md hover:bg-[#2a2a2a] text-gray-300"
              >
                <Type size={18} />
                <span className="text-xs">Text</span>
              </button>
              <div
                role="menu"
                className={`absolute left-0 top-full mt-2 ${
                  isTextDropdownOpen ? "flex" : "hidden"
                } flex-col bg-[#1a1a1a] border border-[#2a2a2a] rounded-md shadow-lg z-50`}
              >
                <button
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                    setIsTextDropdownOpen(false);
                  }}
                  className={`px-4 py-2 text-left hover:bg-[#2a2a2a] ${
                    editorState?.isParagraph
                      ? "bg-[#2a2a2a] text-white"
                      : "text-gray-300"
                  }`}
                >
                  Paragraph
                </button>
                {([1, 2, 3, 4, 5, 6] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level }).run();
                      setIsTextDropdownOpen(false);
                    }}
                    className={`px-4 py-2 text-left hover:bg-[#2a2a2a] ${
                      editorState?.[`isHeading${level}`]
                        ? "bg-[#2a2a2a] text-white"
                        : "text-gray-300"
                    }`}
                  >
                    Heading {level}
                  </button>
                ))}
                <button
                  onClick={() => {
                    editor.chain().focus().toggleCodeBlock().run();
                    setIsTextDropdownOpen(false);
                  }}
                  className={`px-4 py-2 text-left hover:bg-[#2a2a2a] flex items-center gap-2 ${
                    editorState?.isCodeBlock
                      ? "bg-[#2a2a2a] text-white"
                      : "text-gray-300"
                  }`}
                >
                  <SquareCode size={16} /> Code Block
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleBlockquote().run();
                    setIsTextDropdownOpen(false);
                  }}
                  className={`px-4 py-2 text-left hover:bg-[#2a2a2a] flex items-center gap-2 ${
                    editorState?.isBlockquote
                      ? "bg-[#2a2a2a] text-white"
                      : "text-gray-300"
                  }`}
                >
                  <Quote size={16} /> Blockquote
                </button>
              </div>
            </div>

            {/* Lists */}
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-md hover:bg-[#2a2a2a] ${
                editorState?.isBulletList
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-300"
              }`}
              type="button"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded-md hover:bg-[#2a2a2a] ${
                editorState?.isOrderedList
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-300"
              }`}
              type="button"
            >
              <ListOrdered size={18} />
            </button>

            {/* Undo / Redo */}
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editorState?.canUndo}
              className="p-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 disabled:opacity-40"
              type="button"
            >
              <Undo2 size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editorState?.canRedo}
              className="p-2 rounded-md hover:bg-[#2a2a2a] text-gray-300 disabled:opacity-40"
              type="button"
            >
              <Redo2 size={18} />
            </button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none"
      />
    </>
  );
};

export default TipTap;
