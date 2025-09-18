
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'




const MenuBar = ({ editor }: { editor: Editor | null  }) => {
  if (!editor) {
    return null
  }

  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        // isBold: ctx.editor.isActive('bold') ?? false,
        // canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        // isItalic: ctx.editor.isActive('italic') ?? false,
        // canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,

      }
    },
  })

  return (
    <div className="menu-bar">
        <div>
            <button
            onClick = {()=> editor.chain().focus().toggleBold().run()}
          
            className = "border px-2 py-1 rounded-md m-1 hover:text-gray-200 hover:cursor-pointer"
            
            >Bold</button>
            </div>

              <div>
            <button
            onClick = {()=> editor.chain().focus().toggleItalic().run()}
          
            
            >Italic</button>
            </div>

             <div>
            <button
            onClick = {()=> editor.chain().focus().toggleCodeBlock().run()}
            
            >CodeBlock</button>
            </div>


    </div>
  )
}

export default MenuBar;