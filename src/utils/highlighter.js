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

  // Atom One Dark Palette hex-based tailwind classes
  const commentClass = "text-[#5c6370] italic font-mono";
  const stringClass = "text-[#98c379] font-mono font-medium";
  const keywordClass = "text-[#c678dd] font-bold font-mono"; // Purple Control Flow
  const typeClass = "text-[#d19a66] font-mono"; // Orange constants
  const globalClass = "text-[#e5c07b] font-mono"; // Yellow Classes
  const numberClass = "text-[#d19a66] font-mono"; // Orange numbers
  const fnClass = "text-[#61afef] font-semibold font-mono"; // Blue functions
  const opClass = "text-[#56b6c2] font-mono"; // Cyan operators

  html = html.replace(combinedRegex, (match, lineComment, blockComment) => {
    if (lineComment || blockComment) {
      return addToken(match, commentClass);
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

  // 6. Match and replace function names before parenthesis
  html = html.replace(/\b(\w+)(?=\()/g, (m) => addToken(m, fnClass));

  // 7. Match and replace numeric characters
  html = html.replace(/\b(\d+)\b/g, (m) => addToken(m, numberClass));

  // 7.8 Match arrow function operator =>
  html = html.replace(/=&gt;/g, (m) => addToken(m, keywordClass));

  // 8. Match and replace operators
  html = html.replace(
    /(&gt;|&lt;|===|==|!==|!=|=|\+|-|\*|\/|&amp;&amp;|\|\||!)/g,
    (m) => addToken(m, opClass),
  );

  // 8.5 Match and replace brackets, parentheses, and braces
  const parenClass = "text-[#ffd700] font-mono font-bold"; // gold / yellow
  const bracketClass = "text-[#61afef] font-mono font-bold"; // blue / cyan
  const braceClass = "text-[#c678dd] font-mono font-bold"; // purple / magenta

  html = html.replace(/(\(|\))/g, (m) => addToken(m, parenClass));
  html = html.replace(/(\[|\])/g, (m) => addToken(m, bracketClass));
  html = html.replace(/(\{|\})/g, (m) => addToken(m, braceClass));

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
    html = html.replace(
      new RegExp(placeholder, "g"),
      `<span class="${token.className}">${token.text}</span>`,
    );
  }

  return html;
}
