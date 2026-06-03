import { useState } from "react";
import { Trophy, Code, BookMarked, RotateCcw, Layers, Download, Upload, Info, ExternalLink, ShieldAlert, X, Cloud, LogOut, CloudUpload, RefreshCw } from "lucide-react";

export function Header({
  totalSolvedCount,
  totalExercisesCount,
  viewMode,
  setViewMode,
  handleResetFullWorkspace,
  user,
  isSyncing,
  onLogin,
  onLogout
}) {
  const [showBackupModal, setShowBackupModal] = useState(false);

  const handleExportBackup = () => {
    try {
      const backup = {
        learnjs_play_codes: JSON.parse(localStorage.getItem("learnjs_play_codes") || "{}"),
        learnjs_play_progress: JSON.parse(localStorage.getItem("learnjs_play_progress") || "{}"),
        learnjs_covered_topics: JSON.parse(localStorage.getItem("learnjs_covered_topics") || "{}"),
        learnjs_play_notes: JSON.parse(localStorage.getItem("learnjs_play_notes") || "{}")
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `learnjs-backup-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to export backup: " + error.message);
    }
  };

  const handleImportBackup = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== "string") return;
        const parsed = JSON.parse(content);

        if (
          parsed &&
          typeof parsed === "object" &&
          ("learnjs_play_codes" in parsed || "learnjs_play_progress" in parsed || "learnjs_covered_topics" in parsed || "learnjs_play_notes" in parsed)
        ) {
          if (parsed.learnjs_play_codes) {
            localStorage.setItem("learnjs_play_codes", JSON.stringify(parsed.learnjs_play_codes));
          }
          if (parsed.learnjs_play_progress) {
            localStorage.setItem("learnjs_play_progress", JSON.stringify(parsed.learnjs_play_progress));
          }
          if (parsed.learnjs_covered_topics) {
            localStorage.setItem("learnjs_covered_topics", JSON.stringify(parsed.learnjs_covered_topics));
          }
          if (parsed.learnjs_play_notes) {
            localStorage.setItem("learnjs_play_notes", JSON.stringify(parsed.learnjs_play_notes));
          }
          alert("🎉 Your backup has been imported successfully! Refreshing lessons now.");
          window.location.reload();
        } else {
          alert("Selected file is not an authentic LearnJS JSON backup. Please check your chosen file.");
        }
      } catch (err) {
        alert("Failed to parse backup JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs select-none">
      <div className="flex items-center gap-3">
        {/* Famous Yellow JS square logo badge */}
        <div className="h-9 w-9 bg-[#F7DF1E] rounded flex items-center justify-center shadow-xs border border-zinc-300 select-none shrink-0">
          <span className="font-mono font-black text-base text-zinc-900 leading-none pt-1">JS</span>
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-tight text-zinc-900 flex items-center gap-1 leading-none">
            learnJS
            <span className="text-[8px] font-mono font-extrabold uppercase tracking-wide px-1.5 py-0.2 rounded bg-[#F7DF1E]/15 border border-[#edd012] text-zinc-900 leading-none">PRO</span>
          </h1>
          <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-400 uppercase block mt-0.5">interactive companion</span>
        </div>
      </div>

      {/* View Mode Switching segmented control */}
      <div className="flex bg-zinc-150/80 border border-zinc-200/80 p-0.5 rounded-lg select-none">
        <button
          onClick={() => setViewMode("sandbox")}
          className={`flex items-center gap-1 px-3 py-1.2 rounded-md text-xs font-bold font-sans transition-all cursor-pointer ${viewMode === "sandbox"
              ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/80"
              : "text-zinc-500 hover:text-zinc-800"
            }`}
        >
          <Code className="h-3 w-3 text-zinc-650" />
          Interactive Lessons
        </button>

        <button
          onClick={() => setViewMode("knowledge")}
          className={`flex items-center gap-1 px-3 py-1.2 rounded-md text-xs font-bold font-sans transition-all cursor-pointer ${viewMode === "knowledge"
              ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/80"
              : "text-zinc-500 hover:text-zinc-800"
            }`}
        >
          <BookMarked className="h-3 w-3 text-amber-500" />
          Syllabus Map
        </button>

        <button
          onClick={() => setViewMode("flashcards")}
          className={`flex items-center gap-1 px-3 py-1.2 rounded-md text-xs font-bold font-sans transition-all cursor-pointer ${viewMode === "flashcards"
              ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/80"
              : "text-zinc-500 hover:text-zinc-800"
            }`}
        >
          <Layers className="h-3 w-3 text-emerald-500" />
          Flashcards
        </button>
      </div>

      {/* Header CTA Tools with Cloud Sync integrations */}
      <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end sm:justify-start">
        {/* Firebase Authentication & Google Cloud Save status */}
        {user ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-sans text-emerald-800 shadow-xs">
            {isSyncing ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-600 shrink-0" />
            ) : (
              <Cloud className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            )}
            <div className="flex flex-col text-left">
              <span className="text-[8px] font-mono leading-none text-emerald-600 font-bold uppercase tracking-wider">
                {isSyncing ? "Syncing..." : "Cloud Saved"}
              </span>
              <span className="text-[10px] font-bold leading-tight truncate max-w-[85px] block text-zinc-700">
                {user.displayName || user.email}
              </span>
            </div>
            <button
              onClick={onLogout}
              title="Sign out of persistent cloud backup"
              className="p-1 hover:bg-emerald-100 rounded-md text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer ml-1"
            >
              <LogOut className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={onLogin}
            title="Authenticate with Google to secure progress across tabs"
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-zinc-900 hover:text-zinc-950 bg-amber-400 hover:bg-amber-300 border border-amber-400 hover:border-amber-500 rounded-lg cursor-pointer transition-all text-xs font-bold font-sans shadow-sm"
          >
            <CloudUpload className="h-3.5 w-3.5 shrink-0" />
            <span>Sync to Cloud</span>
          </button>
        )}

        {/* Sync & Backup Trigger Button */}
        <button
          onClick={() => setShowBackupModal(true)}
          title="Save or restore code and syllabus progress manually"
          className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-zinc-650 hover:text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg cursor-pointer transition-all text-xs font-semibold font-sans shadow-sm"
        >
          <Download className="h-3.5 w-3.5 text-zinc-500" />
          <span>Manual File Backup</span>
        </button>

        {/* Subtle low-profile Reset Progress Button */}
        <button
          onClick={handleResetFullWorkspace}
          title="Completely reset sandbox progress, written codes, syllabus indicators, and notebook comments to initial state"
          className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-zinc-405 hover:text-rose-600 bg-white hover:bg-rose-50/20 border border-zinc-200 hover:border-rose-100 rounded-lg cursor-pointer transition-all text-xs font-semibold font-sans"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>

        {/* Global Level Indicator using bright Yellow styles */}
        <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-bold text-zinc-500 whitespace-nowrap uppercase font-mono">Solved</span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-zinc-200 px-2 py-0.5 rounded">
            <span className="text-xs font-mono font-bold text-zinc-900">{totalSolvedCount}</span>
            <span className="text-[10px] text-zinc-400 font-mono">/</span>
            <span className="text-xs text-zinc-500 font-mono">{totalExercisesCount}</span>
          </div>
          <div className="hidden md:block w-16 h-1.5 bg-zinc-200 rounded-full overflow-hidden border border-zinc-250">
            <div
              className="h-full bg-[#F7DF1E] transition-all duration-500"
              style={{ width: `${totalExercisesCount > 0 ? (totalSolvedCount / totalExercisesCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sync & Backup Popup Modal Layout */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-205 flex flex-col space-y-5 text-left animate-scale-up">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-emerald-600 shrink-0" />
                <h3 className="text-base font-bold text-zinc-900 font-sans">
                  Data Portability & State Sync
                </h3>
              </div>
              <button
                onClick={() => setShowBackupModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-650 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Sandbox iframe LocalStorage Limitation Prompt */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-855">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1.5 font-sans leading-relaxed">
                <p className="font-bold text-amber-900">Why does progress reset when closing tabs?</p>
                <p>
                  Because the application is rendered inside an **iframe** in AI Studio, web browsers restrict and partition third-party local storage. When the tab closes, the browser wipes the sandbox storage to guard security!
                </p>
                <div className="pt-1">
                  <a
                    href={window.location.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold font-mono text-[10px] uppercase shadow-sm transition-all hover:scale-102"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open in a New Browser Tab (Permanent)
                  </a>
                </div>
                <p className="text-[10px] text-amber-750 font-medium">
                  💡 Running in a direct browser tab bypasses iframe isolation, securing localStorage native persistence permanently!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                Manual Backup Operations
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Download backup button */}
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100/70 hover:border-emerald-300 transition-all text-center cursor-pointer group"
                >
                  <Download className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform mb-2" />
                  <span className="text-xs font-bold text-zinc-800">Export Backup JSON</span>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Download an offline copy of your lessons, checkpoint states, checklists and notes.
                  </p>
                </button>

                {/* Upload backup button */}
                <label className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100/70 hover:border-emerald-300 transition-all text-center cursor-pointer group">
                  <Upload className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform mb-2" />
                  <span className="text-xs font-bold text-zinc-800">Import Backup JSON</span>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Load a previously exported backup file to restore your settings and written codes.
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-zinc-150 pt-3 flex justify-end">
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 text-xs font-mono font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-150 border border-zinc-250 rounded-lg cursor-pointer transition-colors"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
