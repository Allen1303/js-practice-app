import React from "react";

/**
 * Formats string text, wrapping any `code` in a <code style={{ fontFamily: 'Consolas, Monaco, monospace' }}>
 * element and **bold text** in a <strong> element.
 */
export function formatTextWithCode(text, isDark = false) {
  if (typeof text !== "string") return text;

  // Custom parsing loop to yield an array of JSX elements
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={index}
          className={
            isDark
              ? "bg-zinc-900 text-sky-400 border border-zinc-800 px-1.5 py-0.5 rounded font-black text-[13px] mx-[1px] select-all leading-normal inline-block font-mono"
              : "bg-blue-50/70 text-blue-700 border border-blue-200/50 px-1.5 py-0.5 rounded font-black text-[13px] mx-[1px] select-all leading-normal inline-block font-mono"
          }
          style={{
            fontFamily: "Consolas, 'Fira Code', ui-monospace, monospace",
          }}
        >
          {codeContent}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldContent = part.slice(2, -2);
      return (
        <strong
          key={index}
          className={
            isDark
              ? "font-extrabold text-white"
              : "font-extrabold text-zinc-950"
          }
        >
          {boldContent}
        </strong>
      );
    }
    return part;
  });
}
