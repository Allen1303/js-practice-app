export function formatDifficulty(diff) {
  if (!diff) return "";
  const cleaned = diff.trim();
  if (cleaned === "DSA Easy" || cleaned === "Easy") return "Core Practice";
  if (cleaned === "DSA Medium" || cleaned === "Medium")
    return "Concept Mastery";
  if (cleaned === "DSA Hard" || cleaned === "Hard") return "Advanced Mastery";
  if (cleaned === "DSA Easy-Medium" || cleaned === "Easy-Medium")
    return "Interactive Practice";
  return cleaned; // "Warm-up" fallback
}
