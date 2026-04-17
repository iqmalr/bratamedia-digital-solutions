"use client";

import "@/components/tiptap/tiptap.css";
import { cn } from "@/lib/utils";
import Image from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolbar } from "@/components/tiptap/toolbars/editor-toolbar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TiptapEditorProps {
  content: Record<string, unknown> | null;
  onChange: (json: Record<string, unknown>) => void;
  placeholder?: string;
}

// ---------------------------------------------------------------------------
// Extensions — same set as the reference rich-text-editor
// ---------------------------------------------------------------------------

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: { class: "list-decimal" },
    },
    bulletList: {
      HTMLAttributes: { class: "list-disc" },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "codeBlock":
          return "";
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { rel: "noopener noreferrer" },
  }),
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Image,
  Typography,
];

// ---------------------------------------------------------------------------
// Tiptap Editor — uses the full toolbar from src/components/tiptap
// ---------------------------------------------------------------------------

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content: content ?? undefined,
    onUpdate({ editor: ed }) {
      onChange(ed.getJSON() as Record<string, unknown>);
    },
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "relative flex w-full max-h-[70vh] flex-col rounded-lg border border-border bg-card",
        "focus-within:ring-2 focus-within:ring-brand/50 focus-within:border-brand transition-colors"
      )}
    >
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="min-h-[400px] w-full cursor-text sm:p-6"
        />
      </div>
    </div>
  );
}
