import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookmarkCheck,
  RotateCcw,
  Plus,
  Layers,
  Check,
  X,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  FolderPlus,
  CheckCircle,
  Eye,
  AlertCircle,
} from "lucide-react";
import { DEFAULT_FLASHCARDS } from "../data/flashcards.js";
import { highlightJS } from "../utils/highlighter.js";
import { formatTextWithCode } from "../utils/textFormatter.jsx";

export function FlashcardWorkspace() {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);

  // Custom Card Input States
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newCategory, setNewCategory] = useState("Modern JS Basics");
  const [newDifficulty, setNewDifficulty] = useState("Core");

  // Track user progress in localStorage
  const [cardStates, setCardStates] = useState({}); // { cardId: "memorized" | "review" | "unvisited" }

  // Load from localStorage
  useEffect(() => {
    try {
      const savedStates = localStorage.getItem("learnjs_flashcard_progress");
      if (savedStates) {
        setCardStates(JSON.parse(savedStates));
      }

      const savedCustoms = localStorage.getItem("learnjs_custom_flashcards");
      const customs = savedCustoms ? JSON.parse(savedCustoms) : [];
      setCards([...DEFAULT_FLASHCARDS, ...customs]);
    } catch {
      setCards(DEFAULT_FLASHCARDS);
    }
  }, []);

  const saveProgressToStorage = (updatedStates) => {
    setCardStates(updatedStates);
    try {
      localStorage.setItem(
        "learnjs_flashcard_progress",
        JSON.stringify(updatedStates),
      );
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  const handleMarkAsMemorized = (cardId) => {
    const updated = { ...cardStates, [cardId]: "memorized" };
    saveProgressToStorage(updated);

    // Automatically transition forward after feedback with subtle delay
    setTimeout(() => {
      handleNext();
    }, 250);
  };

  const handleMarkAsReview = (cardId) => {
    const updated = { ...cardStates, [cardId]: "review" };
    saveProgressToStorage(updated);

    setTimeout(() => {
      handleNext();
    }, 250);
  };

  const handleAddNewCard = (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newId = `custom_${Date.now()}`;
    const newCard = {
      id: newId,
      category: newCategory,
      question: newQuestion,
      code: newCode.trim() || null,
      answer: newAnswer,
      difficulty: newDifficulty,
    };

    try {
      const savedCustoms = localStorage.getItem("learnjs_custom_flashcards");
      const customs = savedCustoms ? JSON.parse(savedCustoms) : [];
      const updatedCustoms = [...customs, newCard];
      localStorage.setItem(
        "learnjs_custom_flashcards",
        JSON.stringify(updatedCustoms),
      );

      const updatedCards = [...DEFAULT_FLASHCARDS, ...updatedCustoms];
      setCards(updatedCards);

      // Select custom category immediately
      setSelectedCategory("All");
      setCurrentIndex(updatedCards.length - 1);
      setIsFlipped(false);
      setShowAddNew(false);

      // Clear fields
      setNewQuestion("");
      setNewAnswer("");
      setNewCode("");
    } catch (e) {
      console.error("Failed to add custom flashcard", e);
    }
  };

  const handleDeleteCustomCard = (cardId, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this custom flashcard?"))
      return;

    try {
      const savedCustoms = localStorage.getItem("learnjs_custom_flashcards");
      const customs = savedCustoms ? JSON.parse(savedCustoms) : [];
      const filtered = customs.filter((c) => c.id !== cardId);
      localStorage.setItem(
        "learnjs_custom_flashcards",
        JSON.stringify(filtered),
      );

      const updatedCards = [...DEFAULT_FLASHCARDS, ...filtered];
      setCards(updatedCards);

      // Clean status state
      const updatedStates = { ...cardStates };
      delete updatedStates[cardId];
      saveProgressToStorage(updatedStates);

      // Adjust indexes
      setIsFlipped(false);
      setCurrentIndex(0);
    } catch (e) {
      console.error("Failed to delete custom card", e);
    }
  };

  const handleResetProgress = () => {
    if (
      !confirm(
        "Reset all matching flashcard progress descriptors? This clears your study metrics.",
      )
    )
      return;
    saveProgressToStorage({});
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  const handleClearCustoms = () => {
    if (!confirm("Are you sure you want to delete ALL custom flashcards?"))
      return;
    try {
      localStorage.removeItem("learnjs_custom_flashcards");
      setCards(DEFAULT_FLASHCARDS);
      setIsFlipped(false);
      setCurrentIndex(0);
    } catch {}
  };

  // Filter cards based on categories
  const filteredCards = cards.filter((card) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Needs Review")
      return cardStates[card.id] === "review";
    if (selectedCategory === "Memorized")
      return cardStates[card.id] === "memorized";
    return card.category === selectedCategory;
  });

  // Unique category labels
  const categoriesPool = [
    "All",
    "Needs Review",
    "Memorized",
    ...new Set(DEFAULT_FLASHCARDS.map((c) => c.category)),
  ];

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) =>
      prev === 0 ? filteredCards.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) =>
      prev === filteredCards.length - 1 ? 0 : prev + 1,
    );
  };

  const activeCard = filteredCards[currentIndex];

  // Metrics
  const memorizedCount = cards.filter(
    (c) => cardStates[c.id] === "memorized",
  ).length;
  const reviewCount = cards.filter((c) => cardStates[c.id] === "review").length;
  const masteryPercentage =
    cards.length > 0 ? Math.round((memorizedCount / cards.length) * 100) : 0;

  return (
    <div className="flex-1 overflow-y-auto bg-[#faf8f5] select-none py-8 px-4 sm:px-10 h-full max-w-4xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest block mb-0.5">
            STUDY DESK
          </span>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
            <Layers className="h-5.5 w-5.5 text-zinc-800" />
            Interactive Flashcards
          </h2>
          <p className="text-xs text-zinc-500 font-medium leading-relaxed font-sans max-w-xl mt-1">
            Build syntax muscle and core algorithmic memories. Master closures,
            modern scoping operators, array filters and promise chains without
            backend fatigue.
          </p>
        </div>

        <div className="flex items-center gap-2 select-none w-full md:w-auto self-stretch md:self-auto justify-between md:justify-end">
          <button
            onClick={() => setShowAddNew(!showAddNew)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-950 font-bold bg-[#F7DF1E] hover:bg-[#edd012] hover:shadow-xs active:scale-95 transition-all rounded-lg cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Custom</span>
          </button>

          <button
            onClick={handleResetProgress}
            className="flex items-center gap-1 px-2.5 py-1.5 text-zinc-400 hover:text-rose-600 border border-zinc-200 hover:border-rose-100 bg-white hover:bg-rose-50/20 rounded-lg text-xs font-semibold cursor-pointer transition-all"
            title="Reset storage review marks"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear Metrics</span>
          </button>
        </div>
      </div>

      {/* Stats Board Widget */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3 border border-zinc-200 shadow-3xs rounded-xl flex flex-col justify-center">
          <span className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
            Total Deck
          </span>
          <span className="text-lg font-black text-zinc-900 leading-tight mt-0.5">
            {cards.length} Cards
          </span>
        </div>
        <div className="bg-white p-3 border border-zinc-200 shadow-3xs rounded-xl flex flex-col justify-center">
          <span className="text-[9.5px] font-bold text-emerald-600 uppercase tracking-wider font-mono">
            Memorized ✓
          </span>
          <span className="text-lg font-black text-emerald-600 leading-tight mt-0.5">
            {memorizedCount} Cards
          </span>
        </div>
        <div className="bg-white p-3 border border-zinc-200 shadow-3xs rounded-xl flex flex-col justify-center">
          <span className="text-[9.5px] font-bold text-rose-500 uppercase tracking-wider font-mono">
            Needs Review ✕
          </span>
          <span className="text-lg font-black text-rose-500 leading-tight mt-0.5">
            {reviewCount} Cards
          </span>
        </div>
        <div className="bg-white p-3 border border-zinc-200 shadow-3xs rounded-xl flex flex-col justify-center relative overflow-hidden">
          <span className="text-[9.5px] font-bold text-amber-600 uppercase tracking-wider font-mono">
            Mastery level
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black text-zinc-900 leading-none">
              {masteryPercentage}%
            </span>
            <span className="text-[10px] text-zinc-400">mastered</span>
          </div>
          <div className="absolute left-0 bottom-0 right-0 h-1 bg-zinc-150">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${masteryPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Creating Card Dialog Form */}
      {showAddNew && (
        <form
          onSubmit={handleAddNewCard}
          className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-4 animate-fade-in select-text"
        >
          <div className="flex items-center justify-between border-b border-zinc-150 pb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5 font-mono">
              <FolderPlus className="h-4.5 w-4.5 text-zinc-650" />
              Build a Custom Flashcard
            </h3>
            <button
              type="button"
              onClick={() => setShowAddNew(false)}
              className="text-zinc-400 hover:text-zinc-650 p-1 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono">
                Deck category *
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 rounded-lg p-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-zinc-550"
              >
                <option value="Modern JS Basics">Modern JS Basics</option>
                <option value="Arrays & Iteration">Arrays & Iteration</option>
                <option value="Closures & Scope">Closures & Scope</option>
                <option value="Functions & Execution">
                  Functions & Execution
                </option>
                <option value="Promises & Async">Promises & Async</option>
                <option value="Objects & Prototypes">
                  Objects & Prototypes
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono">
                Difficulty Label
              </label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value)}
                className="w-full bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 rounded-lg p-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-zinc-550"
              >
                <option value="Easy">Easy</option>
                <option value="Core">Core</option>
                <option value="Mastery">Mastery</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono">
              Question / Flashcard prompt *
            </label>
            <textarea
              required
              rows={2}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g. What does Object.freeze() accomplish in nested objects?"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-zinc-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono">
              JavaScript Code snippet (Optional)
            </label>
            <textarea
              rows={3}
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder={`e.g.\nconst user = { details: { age: 20 } };\nObject.freeze(user);\nuser.details.age = 21; // Works! Freeze is shallow.`}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:border-zinc-500 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono">
              Answer / Core Explanation *
            </label>
            <textarea
              required
              rows={3}
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Provide a detailed explanation. Bold values using double stars: **shallow freeze**."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-zinc-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setShowAddNew(false)}
              className="px-3.5 py-1.5 border border-zinc-200 text-zinc-500 hover:text-zinc-800 text-xs font-semibold rounded-lg hover:bg-zinc-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-zinc-950 hover:bg-zinc-850 text-white text-xs font-mono font-bold rounded-lg shadow-md cursor-pointer"
            >
              Save study Card
            </button>
          </div>
        </form>
      )}

      {/* Category selector chips */}
      <div className="flex flex-wrap gap-1.5 border-b border-zinc-200/60 pb-3 select-none">
        {categoriesPool.map((cat, idx) => {
          const isSelected = selectedCategory === cat;
          const countInCat =
            cat === "All"
              ? cards.length
              : cat === "Needs Review"
                ? reviewCount
                : cat === "Memorized"
                  ? memorizedCount
                  : cards.filter((c) => c.category === cat).length;

          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                isSelected
                  ? "bg-zinc-950 text-yellow-400 border-zinc-950 shadow-3xs"
                  : "bg-white text-zinc-650 hover:text-zinc-900 border-zinc-200 hover:border-zinc-350"
              }`}
            >
              {cat}
              <span className="ml-1.5 opacity-60 text-[10px]">
                ({countInCat})
              </span>
            </button>
          );
        })}
      </div>

      {/* Main flippable workspace card engine */}
      {filteredCards.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-16 text-center space-y-4">
          <HelpCircle className="h-10 w-10 text-zinc-400 mx-auto stroke-[1.5px]" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-800">
              No cards match the selection
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {selectedCategory === "Needs Review"
                ? "Phenomenal! You don't have any cards marked for review. Mark some cards as 'Review Again' during study."
                : "Try switching category filters or add custom flashcards above."}
            </p>
          </div>
          <button
            onClick={() => setSelectedCategory("All")}
            className="px-4 py-2 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-all cursor-pointer"
          >
            Show All Decks
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Card Frame wrapper */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative h-[420px] w-full [perspective:1400px] cursor-pointer"
          >
            {/* Animated flippable shell using raw CSS 3D support */}
            <div
              className="absolute inset-0 h-full w-full rounded-2xl transition-all duration-[600ms] [transform-style:preserve-3d] shadow-sm hover:shadow-md border border-zinc-205"
              style={{
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT SIDE */}
              <div className="absolute inset-0 h-full w-full rounded-2xl bg-white p-8 flex flex-col justify-between [backface-visibility:hidden]">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-extrabold bg-[#F7DF1E]/20 border border-[#edd012]/60 text-zinc-900 px-2.5 py-0.5 rounded-full uppercase leading-none">
                      {activeCard.category}
                    </span>
                    <span
                      className={`text-[9.5px] font-mono font-bold uppercase ${
                        activeCard.difficulty === "Easy"
                          ? "text-emerald-600"
                          : activeCard.difficulty === "Core"
                            ? "text-amber-600"
                            : "text-rose-600"
                      }`}
                    >
                      {activeCard.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 select-none">
                    {cardStates[activeCard.id] === "memorized" ? (
                      <span className="text-[10px] font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg flex items-center gap-1 border border-emerald-200">
                        Memorized ✓
                      </span>
                    ) : cardStates[activeCard.id] === "review" ? (
                      <span className="text-[10px] font-mono font-extrabold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg flex items-center gap-1 border border-rose-100">
                        Review Needed ✕
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-lg border border-zinc-200/60">
                        Unvisited
                      </span>
                    )}

                    {activeCard.id.startsWith("custom_") && (
                      <button
                        onClick={(e) =>
                          handleDeleteCustomCard(activeCard.id, e)
                        }
                        className="p-1 text-zinc-400 hover:text-rose-600 rounded hover:bg-zinc-100 cursor-pointer"
                        title="Delete this custom card"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content body space */}
                <div className="flex-1 flex flex-col justify-center space-y-4 select-text">
                  <h3 className="text-sm md:text-base font-semibold text-zinc-900 tracking-tight leading-snug">
                    {formatTextWithCode(activeCard.question, false)}
                  </h3>

                  {activeCard.code && (
                    <div
                      className="border border-zinc-200 rounded-xl bg-zinc-50 p-4 overflow-x-auto text-[13px] md:text-sm font-mono text-zinc-800 pointer-events-auto leading-relaxed shadow-inner"
                      onClick={(e) => e.stopPropagation()} // Let users highlight and copy inside
                    >
                      <pre
                        className="select-all font-medium"
                        style={{
                          fontFamily: "Consolas, Menlo, Monaco, monospace",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: highlightJS(activeCard.code, false),
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Footer action hint */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-3 border-t border-zinc-100 select-none">
                  <span>
                    Card {currentIndex + 1} of {filteredCards.length}
                  </span>
                  <span className="text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer">
                    <Play className="h-3 w-3 inline text-zinc-400" /> Tap
                    anywhere to Flip and reveal solution
                  </span>
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 h-full w-full rounded-2xl bg-zinc-950 p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] text-white">
                {/* Back header */}
                <div className="flex items-center justify-between border-b border-zinc-850 pb-3 shrink-0">
                  <span className="text-[10px] font-mono font-extrabold tracking-widest text-[#F7DF1E] uppercase">
                    PRO SOLUTION
                  </span>
                  <span className="text-[10.5px] font-mono text-zinc-500">
                    Category: {activeCard.category}
                  </span>
                </div>

                {/* Main Explanation Body */}
                <div
                  className="flex-1 flex flex-col justify-center py-4 text-sm leading-relaxed overflow-y-auto select-text pointer-events-auto"
                  onClick={(e) => e.stopPropagation()} // Let users highlight text of answer
                >
                  <div className="text-zinc-300 font-medium space-y-3 prose-strong:text-white max-h-[220px] overflow-y-auto pr-2">
                    {activeCard.answer.split("\\n").map((para, pIdx) => (
                      <p key={pIdx}>{formatTextWithCode(para, true)}</p>
                    ))}
                  </div>
                </div>

                {/* Response feedback loop */}
                <div
                  className="pt-4 border-t border-zinc-850 shrink-0 space-y-3 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()} // prevent double flips when hitting buttons
                >
                  <p className="text-[10.5px] font-mono text-zinc-400 text-center select-none font-bold">
                    HOW DID YOU DO DOING THIS DRAFT?
                  </p>

                  <div className="grid grid-cols-2 gap-3 pb-1 select-none">
                    <button
                      type="button"
                      onClick={() => handleMarkAsReview(activeCard.id)}
                      className="py-2.5 px-4 rounded-xl border border-rose-900/60 hover:border-rose-700 bg-rose-950/20 text-rose-400 font-mono text-xs font-bold transition-all shadow-md active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <X className="h-4 w-4" /> Review Again
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMarkAsMemorized(activeCard.id)}
                      className="py-2.5 px-4 rounded-xl border border-emerald-900/60 hover:border-emerald-700 bg-emerald-950/20 text-emerald-400 font-mono text-xs font-bold transition-all shadow-md active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Check className="h-4 w-4" /> Got It!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core manual navigation controls */}
          <div className="flex items-center justify-between bg-white border border-zinc-200/80 rounded-xl px-5 py-3 select-none">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-xs font-bold text-zinc-650 hover:text-zinc-950 px-3 py-1.5 rounded-lg hover:bg-zinc-50 border border-zinc-150 transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.5px]" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-350 text-xs font-mono font-bold text-zinc-900 shadow-3xs hover:shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="h-4 w-4 text-zinc-500" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-xs font-bold text-zinc-650 hover:text-zinc-950 px-3 py-1.5 rounded-lg hover:bg-zinc-50 border border-zinc-150 transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4 stroke-[2.5px]" />
            </button>
          </div>
        </div>
      )}

      {/* Grid of All Cards matching category queue */}
      <div className="space-y-3 bg-white p-5 border border-zinc-200 rounded-2xl">
        <div className="flex items-center justify-between border-b border-zinc-150 pb-2.5">
          <h4 className="text-xs font-black uppercase font-mono tracking-wider text-zinc-805 flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-zinc-550" />
            Deck queue: {selectedCategory} ({filteredCards.length} matching)
          </h4>
          {cards.filter((c) => c.id.startsWith("custom_")).length > 0 && (
            <button
              onClick={handleClearCustoms}
              className="text-[10px] font-mono font-bold text-zinc-400 hover:text-rose-600 transition-colors"
            >
              Delete All Custom Cards
            </button>
          )}
        </div>

        <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-2">
          {filteredCards.length === 0 ? (
            <p className="text-xs text-zinc-400 italic py-2 text-center">
              Desk queue is empty.
            </p>
          ) : (
            filteredCards.map((card, idx) => {
              const isSelected = idx === currentIndex;
              const matchStatus = cardStates[card.id];

              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsFlipped(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-zinc-50 border-[#F7DF1E] text-zinc-950 font-bold"
                      : "bg-white border-zinc-100 text-zinc-600 hover:border-zinc-200 hover:bg-zinc-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2 max-w-[80%]">
                    <span className="font-mono text-[10px] text-zinc-400">
                      #{idx + 1}
                    </span>
                    <span className="truncate">{card.question}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9.5px] font-mono text-zinc-400 font-medium">
                      ({card.category})
                    </span>
                    {matchStatus === "memorized" ? (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                        ✓ Got It
                      </span>
                    ) : matchStatus === "review" ? (
                      <span className="bg-rose-50 text-rose-500 text-[10px] font-bold px-1.5 py-0.2 rounded border border-rose-100">
                        ✕ Review
                      </span>
                    ) : (
                      <span className="bg-zinc-50 text-zinc-400 text-[10px] px-1.5 py-0.2 rounded border border-zinc-200/60">
                        New
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
