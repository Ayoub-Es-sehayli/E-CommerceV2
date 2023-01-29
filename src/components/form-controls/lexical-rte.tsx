import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import React from "react";
import { Button } from "../buttons";

const ToolbarPlugin: React.FC = () => {
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  const [editor] = useLexicalComposerContext();
  const [isEditable, setIsEditable] = React.useState(() => editor.isEditable());
  const [activeEditor, setActiveEditor] = React.useState(editor);
  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, [activeEditor]);
  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, editor, updateToolbar]);
  return (
    <header className="flex gap-3 align-middle text-2xl">
      <Button
        title="Undo (Ctrl+Z)"
        disabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        type="button"
        className="px-2 hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-500"
        aria-label="Undo"
      >
        <i className="bi-arrow-counterclockwise" />
      </Button>
      <Button
        title="Undo (Ctrl+Y)"
        disabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        type="button"
        className="px-2 hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-500"
        aria-label="Redo"
      >
        <i className="bi-arrow-clockwise" />
      </Button>
      {/* <span className="outline outline-1 outline-slate-800"></span> */}
      <Button
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"px-2 hover:bg-slate-200 " + (isBold ? "bg-slate-300" : "")}
        title="Bold (Ctrl+B)"
        type="button"
        aria-label="Format text as bold. Shortcut:  Ctrl+B"
      >
        <i className="bi-type-bold" />
      </Button>
      <Button
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={
          "px-2 hover:bg-slate-200 " + (isItalic ? "bg-slate-300" : "")
        }
        title="Italic (Ctrl+I)"
        type="button"
        aria-label="Format text as italics. Shortcut:  Ctrl+I"
      >
        <i className="bi-type-italic" />
      </Button>
      <Button
        disabled={!isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={
          "px-2 hover:bg-slate-200 " + (isUnderline ? "bg-slate-300" : "")
        }
        title="Underline (Ctrl+U)"
        type="button"
        aria-label="Format text to underlined. Shortcut: Ctrl+U"
      >
        <i className="bi-type-underline" />
      </Button>
    </header>
  );
};

export default ToolbarPlugin;
