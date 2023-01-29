import { ErrorMessage } from "@hookform/error-message";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React from "react";
import {
  FieldErrorsImpl,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import ToolbarPlugin from "./lexical-rte";
interface TextAreaProps<TFieldValues extends FieldValues>
  extends UseControllerProps<TFieldValues> {
  placeholder?: string;
  label?: string;
  className?: string;
  type?: string;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
}
function TextArea<TFieldValues extends FieldValues>({
  label,
  errors,
  className,
  ...inputProps
}: TextAreaProps<TFieldValues>) {
  const initialConfig: InitialConfigType = {
    namespace: inputProps.name,
    onError: (error) => console.error(error),
  };
  const { field } = useController(inputProps);
  return (
    <span className={"flex flex-col gap-1"}>
      {label && (
        <label
          htmlFor={inputProps.name}
          className="select-none text-lg font-bold text-slate-800"
        >
          {label}
        </label>
      )}
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[8rem] rounded-lg border border-slate-600 p-2" />
          }
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={field.onChange} />
        <HistoryPlugin />
      </LexicalComposer>
      <ErrorMessage
        errors={errors}
        name={inputProps.name}
        render={({ message }) => (
          <span className="ml-4 text-xs font-semibold text-rose-600">
            {message}
          </span>
        )}
      />
    </span>
  );
}

// const TextArea = React.forwardRef(TextAreaFn) as typeof TextAreaFn;
export default TextArea;
