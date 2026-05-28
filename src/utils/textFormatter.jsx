import React from "react";

/**
 * Formats string text, wrapping any `code` in a <code style={{ fontFamily: 'Consolas, Monaco, monospace' }}>
 * element and **bold text** in a <strong> element.
 */
export function formatTextWithCode(text) {
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
          className="bg-zinc-100/80 text-[#e01e5a] border border-zinc-200 px-1.5 py-0.5 rounded font-mono text-[12.5px] font-bold mx-[1px]"
          style={{ fontFamily: "Consolas, Monaco, monospace" }}
        >
          {codeContent}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={index} className="font-extrabold text-zinc-900">
          {boldContent}
        </strong>
      );
    }
    return part;
  });
}
