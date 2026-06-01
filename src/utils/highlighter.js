/**
 * Simple, elegant JavaScript syntax highlighter utilizing custom-safe token placeholders
 * to avoid rendering anomalies or string/comment mangling by keyword/operator regex.
 * Emulates the classic Atom One Dark color palette.
 */
export function highlightJS(code, isDark = true) {
  if (!code) return "";

  // 1. Escape basic HTML entities first to prevent raw HTML execution
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const tokens = [];
  const addToken = (text, className) => {
    let letterIndex = "";
    let temp = tokens.length;
    while (temp >= 0) {
      letterIndex = String.fromCharCode(97 + (temp % 26)) + letterIndex;
      temp = Math.floor(temp / 26) - 1;
    }
    const id = `__JSHL${letterIndex}__`;
    tokens.push({ text, className });
    return id;
  };

  // 2. Match and protect comments & strings using placeholders
  const combinedRegex =
    /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(`[\s\S]*?`)/gm;

  // Atom One Dark vs Atom One Light Palette hex-based tailwind classes
  const commentClass = isDark
    ? "text-[#5c6370] italic font-mono"
    : "text-[#a0a1a7] italic font-mono";
  const stringClass = isDark
    ? "text-[#98c379] font-mono font-medium"
    : "text-[#50a14f] font-mono font-semibold";
  const keywordClass = isDark
    ? "text-[#c678dd] font-bold font-mono"
    : "text-[#a626a4] font-bold font-mono"; // Purple Control Flow
  const typeClass = isDark
    ? "text-[#d19a66] font-mono"
    : "text-[#986801] font-mono"; // Orange constants / Brown
  const globalClass = isDark
    ? "text-[#e5c07b] font-mono"
    : "text-[#0184bc] font-mono"; // Yellow Classes / Blue
  const numberClass = isDark
    ? "text-[#d19a66] font-mono"
    : "text-[#986801] font-mono"; // Orange numbers / Brown
  const fnClass = isDark
    ? "text-[#61afef] font-semibold font-mono"
    : "text-[#4078f2] font-extrabold font-mono"; // Blue functions / Blue
  const opClass = isDark
    ? "text-[#56b6c2] font-mono"
    : "text-[#0184bc] font-mono"; // Cyan operators / Blue
  const dotClass = isDark
    ? "text-[#56b6c2] font-mono"
    : "text-[#0184bc] font-mono"; // Cyan single dot
  const spreadClass = isDark
    ? "text-[#56b6c2] font-bold font-mono"
    : "text-[#01a2b5] font-bold font-mono"; // Cyan spread operator
  const nullishClass = isDark
    ? "text-[#56b6c2] font-bold font-mono"
    : "text-[#01a2b5] font-bold font-mono"; // Cyan nullish operator
  const colonClass = isDark
    ? "text-[#56b6c2] font-mono"
    : "text-[#0184bc] font-mono"; // Cyan colon
  const logClass = isDark
    ? "text-[#e06c75] font-bold font-mono"
    : "text-[#e45649] font-bold font-mono"; // Red keyword log

  const parseTemplateLiteral = (match) => {
    if (match.length <= 2) {
      return '<span class="text-[#e23c3c] font-bold font-mono">`</span><span class="text-[#e23c3c] font-bold font-mono">`</span>';
    }

    let result = '<span class="text-[#e23c3c] font-bold font-mono">`</span>';
    let i = 1;
    let lastIndex = 1;

    while (i < match.length - 1) {
      if (match[i] === "$" && match[i + 1] === "{") {
        // Check if the placeholder sequence is escaped by backslashes
        let backslashCount = 0;
        let k = i - 1;
        while (k >= 0 && match[k] === "\\") {
          backslashCount++;
          k--;
        }

        const isEscaped = backslashCount % 2 !== 0;

        if (!isEscaped) {
          // Append raw string text preceding the placeholder
          if (i > lastIndex) {
            const textChunk = match.substring(lastIndex, i);
            result += `<span class="${isDark ? "text-[#98c379] font-medium" : "text-[#50a14f] font-semibold"} font-mono">${textChunk}</span>`;
          }

          // Outer standard delimiter decoration -> ${
          result += `<span class="${isDark ? "text-[#e06c75]" : "text-[#a626a4]"} font-mono font-bold">\${</span>`;

          // Match closing bracket brace depth to isolate template closure
          let braceDepth = 1;
          let exprStart = i + 2;
          let exprEnd = exprStart;

          while (exprEnd < match.length - 1) {
            if (match[exprEnd] === "{") {
              braceDepth++;
            } else if (match[exprEnd] === "}") {
              braceDepth--;
              if (braceDepth === 0) {
                break;
              }
            }
            exprEnd++;
          }

          // Recurse inner JS grammar highlighter execution safely
          const expression = match.substring(exprStart, exprEnd);
          if (expression.trim()) {
            const unescapedExpr = expression
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">");
            const highlightedExpr = highlightJS(unescapedExpr, isDark);
            result += highlightedExpr;
          }

          // Outer standard delimiter decoration -> brace }
          result += `<span class="${isDark ? "text-[#e06c75]" : "text-[#a626a4]"} font-mono font-bold">}</span>`;

          i = exprEnd + 1;
          lastIndex = i;
          continue;
        }
      }
      i++;
    }

    // Remaining string character queue
    if (i > lastIndex) {
      const textChunk = match.substring(lastIndex, match.length - 1);
      result += `<span class="${isDark ? "text-[#98c379] font-medium" : "text-[#50a14f] font-semibold"} font-mono">${textChunk}</span>`;
    }

    result += '<span class="text-[#e23c3c] font-bold font-mono">`</span>';
    return result;
  };

  html = html.replace(combinedRegex, (match, lineComment, blockComment) => {
    if (lineComment || blockComment) {
      return addToken(match, commentClass);
    } else if (match.startsWith("`")) {
      const processed = parseTemplateLiteral(match);
      return addToken(processed, "");
    } else {
      return addToken(match, stringClass);
    }
  });

  // 3. Match and replace keywords with placeholders
  const keywords = [
    "async",
    "await",
    "function",
    "let",
    "const",
    "var",
    "return",
    "throw",
    "new",
    "try",
    "catch",
    "finally",
    "if",
    "else",
    "while",
    "for",
    "of",
    "in",
    "class",
    "extends",
    "instanceof",
    "break",
    "continue",
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  html = html.replace(keywordRegex, (m) => addToken(m, keywordClass));

  // 4. Match and replace true/false/null/undefined/NaN
  const typesAndConstants = ["true", "false", "null", "undefined", "NaN"];
  const typeRegex = new RegExp(`\\b(${typesAndConstants.join("|")})\\b`, "g");
  html = html.replace(typeRegex, (m) => addToken(m, typeClass));

  // 5. Match and replace global JS classes
  const globals = [
    "Promise",
    "Error",
    "Math",
    "Number",
    "JSON",
    "Set",
    "Map",
    "Array",
    "Object",
    "String",
    "setTimeout",
    "clearTimeout",
  ];
  const globalRegex = new RegExp(`\\b(${globals.join("|")})\\b`, "g");
  html = html.replace(globalRegex, (m) => addToken(m, globalClass));

  // 5.5 Match and replace word "log" with red logClass
  html = html.replace(/\blog\b/g, (m) => addToken(m, logClass));

  // 6. Match and replace function names before parenthesis
  html = html.replace(/\b(\w+)(?=\()/g, (m) => addToken(m, fnClass));

  // 7. Match and replace numeric characters
  html = html.replace(/\b(\d+)\b/g, (m) => addToken(m, numberClass));

  // 7.8 Match arrow function operator =>
  html = html.replace(/=&gt;/g, (m) => addToken(m, keywordClass));

  // 7.9 Match spread operator ...
  html = html.replace(/\.\.\./g, (m) => addToken(m, spreadClass));

  // 7.91 Match nullish coalescing operator ??
  html = html.replace(/\?\?/g, (m) => addToken(m, nullishClass));

  // 7.92 Match other nullish question marks (e.g. ternary, optional chain question mark)
  html = html.replace(/\?/g, (m) => addToken(m, nullishClass));

  // 7.93 Match single dot .
  html = html.replace(/\./g, (m) => addToken(m, dotClass));

  // 7.94 Match colon :
  html = html.replace(/:/g, (m) => addToken(m, colonClass));

  // 8. Match and replace remainder operators (without ... or .)
  html = html.replace(
    /(&gt;|&lt;|===|==|!==|!=|=|\+|-|\*|\/|%|&amp;&amp;|\|\||!)/g,
    (m) => addToken(m, opClass),
  );

  // 8.5 Match and replace brackets, parentheses, and braces with depth-based rotating colors
  const parenColors = isDark
    ? [
        "text-[#ffd700] font-mono font-bold", // Yellow Gold
        "text-[#da70d6] font-mono font-bold", // Orchid Magenta
        "text-[#56b6c2] font-mono font-bold", // Cyan
      ]
    : [
        "text-[#a626a4] font-mono font-bold", // Orchid/Purple
        "text-[#0184bc] font-mono font-bold", // Blue
        "text-[#e45649] font-mono font-bold", // Red
      ];
  const bracketColors = isDark
    ? [
        "text-[#ffd700] font-mono font-bold", // Yellow Gold
        "text-[#da70d6] font-mono font-bold", // Orchid Magenta
        "text-[#56b6c2] font-mono font-bold", // Cyan
      ]
    : [
        "text-[#a626a4] font-mono font-bold", // Orchid/Purple
        "text-[#0184bc] font-mono font-bold", // Blue
        "text-[#e45649] font-mono font-bold", // Red
      ];
  const braceColors = isDark
    ? [
        "text-[#ffd700] font-mono font-bold", // Yellow Gold
        "text-[#da70d6] font-mono font-bold", // Orchid Magenta
        "text-[#56b6c2] font-mono font-bold", // Cyan
      ]
    : [
        "text-[#a626a4] font-mono font-bold", // Orchid/Purple
        "text-[#0184bc] font-mono font-bold", // Blue
        "text-[#e45649] font-mono font-bold", // Red
      ];

  let parsedHtml = "";
  let parenDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;

  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    if (char === "(") {
      const idx = parenDepth % parenColors.length;
      parsedHtml += addToken(char, parenColors[idx]);
      parenDepth++;
    } else if (char === ")") {
      parenDepth = Math.max(0, parenDepth - 1);
      const idx = parenDepth % parenColors.length;
      parsedHtml += addToken(char, parenColors[idx]);
    } else if (char === "[") {
      const idx = bracketDepth % bracketColors.length;
      parsedHtml += addToken(char, bracketColors[idx]);
      bracketDepth++;
    } else if (char === "]") {
      bracketDepth = Math.max(0, bracketDepth - 1);
      const idx = bracketDepth % bracketColors.length;
      parsedHtml += addToken(char, bracketColors[idx]);
    } else if (char === "{") {
      const idx = braceDepth % braceColors.length;
      parsedHtml += addToken(char, braceColors[idx]);
      braceDepth++;
    } else if (char === "}") {
      braceDepth = Math.max(0, braceDepth - 1);
      const idx = braceDepth % braceColors.length;
      parsedHtml += addToken(char, braceColors[idx]);
    } else {
      parsedHtml += char;
    }
  }
  html = parsedHtml;

  // 9. Reconstruct the HTML by replacing placeholders with safe formatted spans in reverse order
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    let letterIndex = "";
    let temp = i;
    while (temp >= 0) {
      letterIndex = String.fromCharCode(97 + (temp % 26)) + letterIndex;
      temp = Math.floor(temp / 26) - 1;
    }
    const placeholder = `__JSHL${letterIndex}__`;
    const replacement = token.className
      ? `<span class="${token.className}">${token.text}</span>`
      : token.text;
    html = html.replace(new RegExp(placeholder, "g"), replacement);
  }

  return html;
}
