"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Undo,
  Redo,
  RemoveFormatting,
  Minus,
  SuperscriptIcon,
  SubscriptIcon,
} from "lucide-react";

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Superscript,
      Subscript,
    ],
    content: `
      <h2>Welcome to the enhanced editor!</h2>
      <p>This editor now supports various types of lists:</p>
      <ul>
        <li>Bullet lists like this one</li>
        <li>With multiple items</li>
      </ul>
      <p>And also:</p>
      <ol>
        <li>Numbered lists</li>
        <li>For ordered content</li>
      </ol>
      <p>Try creating your own lists now!</p>
    `,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, isActive, icon, tooltip }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className={`h-8 w-8 ${
              isActive
                ? "bg-muted text-muted-foreground"
                : "hover:bg-muted hover:text-muted-foreground"
            }`}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const toolbarGroups = [
    [
      {
        icon: <Bold size={16} />,
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
        tooltip: "Bold",
      },
      {
        icon: <Italic size={16} />,
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
        tooltip: "Italic",
      },
      {
        icon: <UnderlineIcon size={16} />,
        action: () => editor.chain().focus().toggleUnderline().run(),
        isActive: () => editor.isActive("underline"),
        tooltip: "Underline",
      },
      {
        icon: <Strikethrough size={16} />,
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive("strike"),
        tooltip: "Strikethrough",
      },
    ],
    [
      {
        icon: <AlignLeft size={16} />,
        action: () => editor.chain().focus().setTextAlign("left").run(),
        isActive: () => editor.isActive({ textAlign: "left" }),
        tooltip: "Align Left",
      },
      {
        icon: <AlignCenter size={16} />,
        action: () => editor.chain().focus().setTextAlign("center").run(),
        isActive: () => editor.isActive({ textAlign: "center" }),
        tooltip: "Align Center",
      },
      {
        icon: <AlignRight size={16} />,
        action: () => editor.chain().focus().setTextAlign("right").run(),
        isActive: () => editor.isActive({ textAlign: "right" }),
        tooltip: "Align Right",
      },
      {
        icon: <AlignJustify size={16} />,
        action: () => editor.chain().focus().setTextAlign("justify").run(),
        isActive: () => editor.isActive({ textAlign: "justify" }),
        tooltip: "Justify",
      },
    ],
    [
      {
        icon: <Heading1 size={16} />,
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive("heading", { level: 1 }),
        tooltip: "Heading 1",
      },
      {
        icon: <Heading2 size={16} />,
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive("heading", { level: 2 }),
        tooltip: "Heading 2",
      },
      {
        icon: <Heading3 size={16} />,
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => editor.isActive("heading", { level: 3 }),
        tooltip: "Heading 3",
      },
    ],
    [
      {
        icon: <List size={16} />,
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive("bulletList"),
        tooltip: "Bullet List",
      },
      {
        icon: <ListOrdered size={16} />,
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive("orderedList"),
        tooltip: "Numbered List",
      },
    ],
    [
      {
        icon: <Quote size={16} />,
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive("blockquote"),
        tooltip: "Blockquote",
      },
      {
        icon: <Code size={16} />,
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive("code"),
        tooltip: "Code",
      },
      {
        icon: <Minus size={16} />,
        action: () => editor.chain().focus().setHorizontalRule().run(),
        isActive: () => false,
        tooltip: "Horizontal Line",
      },
    ],
    [
      {
        icon: <SuperscriptIcon size={16} />,
        action: () => editor.chain().focus().toggleSuperscript().run(),
        isActive: () => editor.isActive("superscript"),
        tooltip: "Superscript",
      },
      {
        icon: <SubscriptIcon size={16} />,
        action: () => editor.chain().focus().toggleSubscript().run(),
        isActive: () => editor.isActive("subscript"),
        tooltip: "Subscript",
      },
    ],
    [
      {
        icon: <RemoveFormatting size={16} />,
        action: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
        isActive: () => false,
        tooltip: "Clear Formatting",
      },
      {
        icon: <Undo size={16} />,
        action: () => editor.chain().focus().undo().run(),
        isActive: () => false,
        tooltip: "Undo",
      },
      {
        icon: <Redo size={16} />,
        action: () => editor.chain().focus().redo().run(),
        isActive: () => false,
        tooltip: "Redo",
      },
    ],
  ];

  return (
    <div className="border rounded-lg shadow-sm bg-white ">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/50 border-b rounded-t-lg">
        {toolbarGroups.map((group, index) => (
          <div key={index} className="flex items-center">
            {group.map((item, itemIndex) => (
              <ToolbarButton
                key={itemIndex}
                onClick={item.action}
                isActive={item.isActive()}
                icon={item.icon}
                tooltip={item.tooltip}
              />
            ))}
            {index < toolbarGroups.length - 1 && (
              <Separator orientation="vertical" className="mx-1 h-6" />
            )}
          </div>
        ))}
      </div>
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] max-h-[600px] overflow-y-auto"
      />
    </div>
  );
};

export default TipTapEditor;
