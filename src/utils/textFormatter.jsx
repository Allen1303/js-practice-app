import React from "react";
import { highlightJS } from "./highlighter.js";

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
          className="bg-zinc-150/90 text-zinc-900 border border-zinc-250/65 px-1.5 py-0.2 rounded font-semibold text-[13px] mx-[1px] select-all leading-normal inline-block font-mono"
          style={{
            fontFamily: "Consolas, 'Fira Code', ui-monospace, monospace",
          }}
          dangerouslySetInnerHTML={{
            __html: highlightJS(codeContent, false),
          }}
        />
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={index} className="font-extrabold text-zinc-950">
          {boldContent}
        </strong>
      );
    }
    return part;
  });
}
