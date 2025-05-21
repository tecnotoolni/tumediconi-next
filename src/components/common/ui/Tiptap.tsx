'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

import {
  TbBold,
  TbItalic,
  TbList,
  TbListNumbers,
  TbAlignLeft,
  TbAlignCenter,
  TbAlignRight,
} from 'react-icons/tb'

import { useEffect } from 'react'

interface Props {
  onChange?: (value: string) => void
  value?: string
}

const Tiptap = ({ onChange, value }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value || '',
  })

  useEffect(() => {
    if (!editor || !onChange) return

    const updateHandler = () => {
      onChange(editor.getHTML())
    }

    editor.on('update', updateHandler)

    return () => {
      editor.off('update', updateHandler)
    }
  }, [editor, onChange])


  if (!editor) return null

  const buttonClass = (active: boolean) =>
    `p-2 rounded hover:bg-gray-200 ${
      active ? 'bg-gray-300' : ''
    } transition-all`

  return (
    <div className="flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1 bg-cool-gray-50 rounded-lg p-2">
        <button
          type="button"
          className={buttonClass(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TbBold />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TbItalic />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive('bulletList'))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <TbList />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive('orderedList'))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <TbListNumbers />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive({ textAlign: 'left' }))}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <TbAlignLeft />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive({ textAlign: 'center' }))}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <TbAlignCenter />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive({ textAlign: 'right' }))}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <TbAlignRight />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="border-cool-gray-100 border prose-p:first:mt-0 p-2 size-full prose prose-sm max-w-none max-h-[25vh] overflow-y-scroll *:focus:outline-none rounded-lg "
      />
    </div>
  )
}

export default Tiptap
