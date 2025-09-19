import { useEditorState } from "@tiptap/react";
import React, { useEffect } from "react";

import type { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react/menus";
import { Button } from "@/components/ui/button";
import { BoldIcon } from "@/components/tiptap-icons/bold-icon";
import { ItalicIcon } from "@/components/tiptap-icons/italic-icon";
import { StrikeIcon } from "@/components/tiptap-icons/strike-icon";
import { Code2Icon } from "@/components/tiptap-icons/code2-icon";
import { BlockquoteIcon } from "@/components/tiptap-icons/blockquote-icon";
import { ListIcon } from "@/components/tiptap-icons/list-icon";
import { ListOrderedIcon } from "@/components/tiptap-icons/list-ordered-icon";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const [showMenu, setShowMenu] = React.useState(true);
  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  // Keep hook to react to editor changes (e.g., for active states) without using the result
  useEditorState({ editor, selector: () => ({}) });

  return (
    <div className="menu-bar">
      {showMenu && isEditable && (
        <BubbleMenu
          editor={editor}
          options={{ placement: "top", offset: 8, flip: false }}
        >
          <div className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900/90 px-1.5 py-1">
            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("bold")}
              className={`${
                editor.isActive("bold")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              title="Bold"
            >
              <BoldIcon className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("italic")}
              className={`${
                editor.isActive("italic")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <ItalicIcon className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("strike")}
              className={`${
                editor.isActive("strike")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              title="Strikethrough"
            >
              <StrikeIcon className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("code")}
              className={`${
                editor.isActive("code")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              title="Inline code"
            >
              <Code2Icon className="size-4" />
            </Button>

            <div className="mx-1 h-5 w-px bg-zinc-700" />

            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("bulletList")}
              className={`${
                editor.isActive("bulletList")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet list"
            >
              <ListIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("orderedList")}
              className={`${
                editor.isActive("orderedList")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Ordered list"
            >
              <ListOrderedIcon className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("blockquote")}
              className={`${
                editor.isActive("blockquote")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Blockquote"
            >
              <BlockquoteIcon className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-pressed={editor.isActive("codeBlock")}
              className={`${
                editor.isActive("codeBlock")
                  ? "bg-neutral-800 text-white"
                  : "text-zinc-200"
              }`}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              title="Code block"
            >
              <Code2Icon className="size-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

export default MenuBar;
