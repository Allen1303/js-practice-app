import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BookOpen, Save, Trash2, Search, Download, Sparkles, FileText, CheckCircle, HelpCircle, Edit3 } from "lucide-react";
import { CONCEPTS } from "../data/exercises.js";

export function NotesPanel({ activeExercise, activeConcept, notes = {}, setNotes }) {
  const [currentNoteText, setCurrentNoteText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedStatus, setSavedStatus] = useState(false);

  // Sync current note text with parent reactive notes state
  useEffect(() => {
    if (activeExercise && notes[activeExercise.id]) {
      setCurrentNoteText(notes[activeExercise.id]);
    } else {
      setCurrentNoteText("");
    }
  }, [activeExercise, notes]);

  // Save specific note
  const handleSaveNote = (text) => {
    if (!activeExercise) return;
    const updatedNotes = { ...notes, [activeExercise.id]: text };
    setNotes(updatedNotes);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    setCurrentNoteText(val);
    handleSaveNote(val); // Autosave as you type for frictionless experience
  };

  const handleDeleteNote = (exerciseId) => {
    if (confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = { ...notes };
      delete updatedNotes[exerciseId];
      setNotes(updatedNotes);
      if (activeExercise && exerciseId === activeExercise.id) {
        setCurrentNoteText("");
      }
    }
  };

  // Preset snippets to speed up note taking
  const insertPreset = (preset) => {
    const space = currentNoteText ? "\n" : "";
    const updated = currentNoteText + space + preset;
    setCurrentNoteText(updated);
    handleSaveNote(updated);
  };

  // Create a flattened lookup list for exercises to link notes with real exercises titles 
  const exerciseLookup = {};
  CONCEPTS.forEach(c => {
    c.exercises.forEach(e => {
      exerciseLookup[e.id] = {
        title: e.description,
        conceptTitle: c.title,
        id: e.id
      };
    });
  });

  // Export notes as a compiled training journal markdown file!
  const handleExportNotes = () => {
    let md = `# LearnJS Modern ES6+ Personal Notebook & Study Guide\n`;
    md += `Generated on: ${new Date().toLocaleDateString()}\n`;
    md += `This study guide tracks key insights, code structures, and explanations recorded during training.\n\n---\n\n`;

    let notesCount = 0;
    Object.keys(notes).forEach((exId) => {
      const text = notes[exId]?.trim();
      if (text) {
        notesCount++;
        const info = exerciseLookup[exId] || { title: exId, conceptTitle: "Syllabus" };
        md += `## 📝 ${info.conceptTitle} — ${info.title}\n`;
        md += `**Exercise Ref**: \`${exId}\`\n\n`;
        md += `### My Personal Insights & Snippets:\n`;
        md += `${text}\n\n`;
        md += `_Completed Repetition: [x]_\n\n`;
        md += `---\n\n`;
      }
    });

    if (notesCount === 0) {
      alert("No notes found! Write some notes for this active challenge or other lessons first.");
      return;
    }

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "LearnJS_My_Notes_Syllabus.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter notes that have written content
  const filteredNotesList = Object.keys(notes)
    .map(exId => ({
      exId,
      text: notes[exId],
      info: exerciseLookup[exId] || { title: exId, conceptTitle: "Syllabus" }
    }))
    .filter(item => {
      if (!item.text.trim()) return false;
      if (!searchQuery) return true;
      const term = searchQuery.toLowerCase();
      return (
        item.text.toLowerCase().includes(term) ||
        item.info.title.toLowerCase().includes(term) ||
        item.info.conceptTitle.toLowerCase().includes(term)
      );
    });

  return (
    <motion.div
      key="learnjs-notes-panel"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="space-y-6 flex flex-col h-full"
    >
      {/* Notebook Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
            <Edit3 className="h-4.5 w-4.5 text-[#F7DF1E] fill-[#F7DF1E]/10" />
            Interactive Notebook
          </h2>
          <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full select-none uppercase">
            Autosave
          </span>
        </div>
        <p className="text-[10px] font-mono font-bold text-zinc-400 mt-0.5">
          CHALLENGE STUDY GUIDE journals
        </p>
      </div>

      <p className="text-xs text-zinc-650 leading-relaxed font-sans">
        Summarize code structures, write key insights, or document edge-cases. Notes taken here map explicitly to <strong>{activeExercise?.description || "the current task"}</strong> and stay in your browser standard memory.
      </p>

      {/* Main Split Layout: Editor and Sidebar search list side by side or stacked */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch flex-1">

        {/* Editor (Span 2) */}
        <div className="xl:col-span-2 flex flex-col space-y-4 border border-zinc-200 bg-white p-4 rounded-xl shadow-sm">

          <div className="flex items-center justify-between border-b border-zinc-150 pb-2">
            <div>
              <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase block tracking-wider">
                Current Sandbox Lesson
              </span>
              <span className="text-[11.5px] font-bold text-zinc-850 truncate max-w-[240px] block">
                {activeExercise?.description || "General Notes"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {savedStatus && (
                <span className="text-[10px] text-emerald-600 font-mono font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Saved
                </span>
              )}
            </div>
          </div>

          {/* Quick preset markup helpers */}
          <div className="flex flex-wrap gap-1 select-none">
            <button
              onClick={() => insertPreset("💡 Key Insight: ")}
              className="px-2 py-0.8 bg-zinc-100 border border-zinc-200 hover:bg-zinc-150 rounded text-[9.5px] font-sans font-medium text-zinc-700 cursor-pointer transition-colors"
            >
              💡 Insight
            </button>
            <button
              onClick={() => insertPreset("📝 Core Pattern:\n```js\n\n```")}
              className="px-2 py-0.8 bg-zinc-100 border border-zinc-200 hover:bg-zinc-150 rounded text-[9.5px] font-sans font-medium text-zinc-700 cursor-pointer transition-colors"
            >
              💻 Code Pattern
            </button>
            <button
              onClick={() => insertPreset("⚠️ Edge Cases:\n- ")}
              className="px-2 py-0.8 bg-zinc-100 border border-zinc-200 hover:bg-zinc-150 rounded text-[9.5px] font-sans font-medium text-zinc-700 cursor-pointer transition-colors"
            >
              ⚠️ Edge Cases
            </button>
            <button
              onClick={() => insertPreset("⚡️ ES6 Clean Alternative:\n")}
              className="px-2 py-0.8 bg-zinc-100 border border-zinc-200 hover:bg-zinc-150 rounded text-[9.5px] font-sans font-medium text-zinc-700 cursor-pointer transition-colors"
            >
              ⚡️ ES6 Clean
            </button>
          </div>

          <div className="flex-1 min-h-[140px] flex flex-col">
            <textarea
              value={currentNoteText}
              onChange={handleTextChange}
              placeholder="Start drafting study notes, code references, or explanations here... (autosaved locally)"
              className="w-full flex-1 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-[#F7DF1E] text-xs font-mono p-3 rounded-lg resize-none focus:outline-none focus:bg-white tracking-normal leading-relaxed text-zinc-800"
              spellCheck="false"
            />
          </div>

          {/* Character and word indicators */}
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>{currentNoteText ? currentNoteText.trim().split(/\s+/).filter(Boolean).length : 0} words</span>
            <span>{currentNoteText.length} characters</span>
          </div>
        </div>

        {/* Saved Notes Sidebar (Span 1) */}
        <div className="flex flex-col space-y-3.5 border border-zinc-200 bg-zinc-50/50 p-4 rounded-xl shadow-inner min-h-[220px]">

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
              <BookOpen className="h-3 w-3" /> Notebook Index
            </span>

            {filteredNotesList.length > 0 && (
              <button
                type="button"
                onClick={handleExportNotes}
                title="Download all written notebook lessons as Markdown (.md) document"
                className="text-[9.5px] font-mono text-zinc-650 hover:text-zinc-950 flex items-center gap-1 bg-white border border-zinc-250 px-2 py-1 rounded-md shadow-sm transition-colors cursor-pointer"
              >
                <Download className="h-3 w-3 text-zinc-700" /> Export (.md)
              </button>
            )}
          </div>

          {/* Client Search Filtering */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search written reviews..."
              className="w-full px-2.5 py-1.5 pl-8 text-[11px] bg-white border border-zinc-200 focus:border-[#F7DF1E] focus:outline-none text-zinc-800 rounded-lg transition-all"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
          </div>

          {/* Quick list rendering */}
          <div className="flex-1 overflow-y-auto max-h-[180px] space-y-2">
            {filteredNotesList.length === 0 ? (
              <div className="py-8 text-center text-zinc-400 space-y-1">
                <FileText className="h-5 w-5 text-zinc-300 mx-auto" />
                <p className="text-[10px] font-mono italic">No written notes yet.</p>
              </div>
            ) : (
              filteredNotesList.map((item) => (
                <div
                  key={item.exId}
                  className="bg-white p-2.5 border border-zinc-200 hover:border-zinc-350 rounded-lg text-[10.5px] space-y-1.5 transition-all text-left group"
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[8px] font-mono font-bold text-[#b49000] uppercase block">
                        {item.info.conceptTitle}
                      </span>
                      <span className="font-bold text-zinc-850 line-clamp-1">
                        {item.info.title}
                      </span>
                    </div>

                    {/* Delete note button */}
                    <button
                      onClick={() => handleDeleteNote(item.exId)}
                      className="text-zinc-400 hover:text-rose-600 transition-colors shrink-0 p-1 cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Delete written note"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>

                  <p className="text-zinc-500 font-mono line-clamp-2 italic leading-relaxed text-[9.5px] bg-zinc-50 p-1.5 rounded border border-zinc-100">
                    {item.text}
                  </p>
                </div>
              ))
            )}
          </div>

          <p className="text-[9.5px] font-sans leading-normal text-zinc-450 text-center">
            💡 Export offline to bundle your written insights as standard readable Markdown summaries anytime!
          </p>
        </div>

      </div>
    </motion.div>
  );
}
