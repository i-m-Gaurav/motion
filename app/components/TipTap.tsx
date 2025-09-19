import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar';


const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    immediatelyRender:false,
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        This is a basic Tiptap editor. You can type here and use the buttons above to format your text.
      </p>
    `,
    editorProps: {
      attributes: {
        class: 'prose-mirror-editor',
      },
    },
  })

  return (
    <div>
        <div>

             <MenuBar editor={editor} />

        </div>
         <div>

             <EditorContent className="prose prose-invert max-w-none outline-none focus:outline-none ring-0 focus:ring-0 border-0 focus:border-0" editor={editor} />
            
        </div>
     
     
    </div>
  )
}

export default Tiptap;