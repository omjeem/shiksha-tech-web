import React, { forwardRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, error, helperText, fullWidth = true, className = "", ...props },
    ref
  ) => {
    const textareaStyles = `px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300 ${
      error ? "border-red-500" : "border-gray-300"
    }`;

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <div className={`${widthStyle} ${className}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${textareaStyles} ${widthStyle}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
