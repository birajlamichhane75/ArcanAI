import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GitBranch, 
  Github, 
  Rocket, 
  Zap, 
  Code2, 
  CheckCircle2, 
  Eye, 
  MessageSquare, 
  Activity,
  ArrowRight,
  Terminal,
  Folder,
  FileCode,
  Clock,
  ChevronRight
} from "lucide-react";
import { REPO_FILES, CHECKPOINTS } from "./LaunchData";

const MINI_SCORES = [
  { id: "visibility", name: "Visibility", score: 88, color: "bg-violet-500", icon: Eye },
  { id: "accuracy", name: "Accuracy", score: 92, color: "bg-blue-500", icon: CheckCircle2 },
  { id: "sentiment", name: "Sentiment", score: 85, color: "bg-emerald-500", icon: MessageSquare },
  { id: "freshness", name: "Freshness", score: 95, color: "bg-amber-500", icon: Zap },
  { id: "coverage", name: "Coverage", score: 89, color: "bg-pink-500", icon: Activity }
];

export default function Launch() {
  const [launchState, setLaunchState] = useState<"idle" | "analyzing" | "comparison" | "optimizing" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState("components/ProductCard.js");
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(3);

  const startAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunchState("analyzing");
    
    setTimeout(() => {
      setLaunchState("comparison");
    }, 2000);
  };

  const startFix = () => {
    setLaunchState("optimizing");
    setLogs([]);
    
    const fixLogs = [
      "Analyzing new-gaming-laptops branch...",
      "Generating SEO-optimized descriptions...",
      "Adding structured JSON-LD schema...",
      "Enhancing product attributes...",
      "Creating Pull Request..."
    ];
    
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < fixLogs.length) {
        const currentLog = fixLogs[logIndex];
        setLogs(prev => [...prev, currentLog]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setLaunchState("done"), 1000);
      }
    }, 800);
  };

  const renderDiff = (original: string, optimized: string, type: 'original' | 'optimized') => {
    if (!original && !optimized) return "Select a file to view";
    
    const origLines = (original || "").split('\n');
    const optLines = (optimized || "").split('\n');
    
    if (type === 'original') {
      return origLines.map((line, i) => {
        const optLine = optLines[i];
        let bgColor = "transparent";
        let textColor = "text-zinc-300";
        let prefix = "  ";
        
        if (optLine !== undefined && line !== optLine) {
          bgColor = "bg-red-500/10";
          textColor = "text-red-400";
          prefix = "- ";
        } else if (optLine === undefined) {
          bgColor = "bg-red-500/10";
          textColor = "text-red-400";
          prefix = "- ";
        }
        
        return (
          <div key={i} className={`flex ${bgColor} ${textColor} px-2`}>
            <div className="w-8 text-right pr-4 text-zinc-500 select-none opacity-50">{i + 1}</div>
            <div className="select-none mr-2 opacity-50">{prefix}</div>
            <div>{line}</div>
          </div>
        );
      });
    } else {
      // For optimized side, we need to handle added lines
      // This is a very simplified diff that assumes lines are mostly 1:1 or added
      const result = [];
      let origIdx = 0;
      
      for (let i = 0; i < optLines.length; i++) {
        const line = optLines[i];
        const origLine = origLines[origIdx];
        
        let bgColor = "transparent";
        let textColor = "text-zinc-300";
        let prefix = "  ";
        
        if (origLine === line) {
          origIdx++;
        } else {
          // Check if it's a modified line or added line
          // Simple heuristic: if the next few lines match, it's added/modified
          bgColor = "bg-emerald-500/10";
          textColor = "text-emerald-400";
          prefix = "+ ";
          if (origLine && origLine !== line && optLines[i+1] === origLines[origIdx+1]) {
             // Modified
             bgColor = "bg-yellow-500/10";
             textColor = "text-yellow-400";
             prefix = "~ ";
             origIdx++;
          }
        }
        
        result.push(
          <div key={i} className={`flex ${bgColor} ${textColor} px-2`}>
            <div className="w-8 text-right pr-4 text-zinc-500 select-none opacity-50">{i + 1}</div>
            <div className="select-none mr-2 opacity-50">{prefix}</div>
            <div>{line}</div>
          </div>
        );
      }
      return result;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
          <Rocket className="w-8 h-8 text-indigo-400" />
          Launch Optimizer
        </h1>
        <p className="text-zinc-400 mt-2">Optimize new product sections before they go live.</p>
      </div>

      {/* Section 1: Input */}
      {launchState === "idle" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm max-w-2xl"
        >
          <form onSubmit={startAnalysis} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Repository Name</label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  defaultValue="exampletech-store"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Branch Name</label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  defaultValue="new-gaming-laptops"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                Analyze New Section
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Analyzing State */}
      {launchState === "analyzing" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-12 h-12 text-indigo-400 mb-6" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2">Analyzing Branch</h2>
          <p className="text-zinc-400">Arcana is scanning the new-gaming-laptops branch for AI readiness...</p>
        </motion.div>
      )}

      {/* Section 2: Code Comparison */}
      {(launchState === "comparison" || launchState === "optimizing" || launchState === "done") && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-semibold">Pre-launch Analysis</h2>
              <p className="text-zinc-400 mt-1">We found 3 critical missing elements for AI visibility.</p>
            </div>
            
            {launchState === "comparison" && (
              <div className="flex gap-4">
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors">
                  Do It Yourself
                </button>
                <button 
                  onClick={startFix}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  <Zap className="w-4 h-4" />
                  Let Our Agent Fix It
                </button>
              </div>
            )}
          </div>

          {/* Optimization Explanation Panel */}
          {(launchState === "optimizing" || launchState === "done") && (
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 flex gap-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg h-fit">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-indigo-100 mb-1">AI Optimization Summary</h3>
                <p className="text-sm text-indigo-200/70 leading-relaxed">
                  Arcana AI detected missing structured product metadata and incomplete schema markup.
                  The optimization adds Schema.org structured data, price metadata, and product attributes so AI assistants can correctly understand and recommend the product.
                </p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-6">
            {/* File Explorer */}
            <div className="lg:col-span-3 bg-[#1e1e1e] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[500px]">
              <div className="h-12 border-b border-zinc-800 bg-[#252526] flex items-center px-4 gap-2">
                <Folder className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-300">Repository</span>
              </div>
              <div className="flex-1 p-2 overflow-y-auto">
                {REPO_FILES.map((item, i) => (
                  <div key={i} className="mb-1">
                    {item.type === "folder" ? (
                      <div>
                        <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800/50 rounded cursor-pointer">
                          <ChevronRight className="w-3 h-3 text-zinc-500" />
                          <Folder className="w-4 h-4 text-zinc-400" />
                          {item.name}
                        </div>
                        <div className="pl-6 border-l border-zinc-800 ml-3 mt-1 space-y-1">
                          {item.children?.map((child, j) => {
                            const path = `${item.name}/${child.name}`;
                            const isSelected = selectedFile === path;
                            return (
                              <div 
                                key={j}
                                onClick={() => setSelectedFile(path)}
                                className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer transition-colors ${
                                  isSelected ? "bg-indigo-500/20 text-indigo-300" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                                }`}
                              >
                                <FileCode className="w-4 h-4 opacity-70" />
                                {child.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => setSelectedFile(item.name)}
                        className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer transition-colors ${
                          selectedFile === item.name ? "bg-indigo-500/20 text-indigo-300" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                        }`}
                      >
                        <FileCode className="w-4 h-4 opacity-70" />
                        {item.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Comparison */}
            <div className="lg:col-span-9 grid md:grid-cols-2 gap-4">
              {/* Left Side: Current Code */}
              <div className="bg-[#1e1e1e] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[500px]">
                <div className="h-12 border-b border-zinc-800 bg-[#252526] flex items-center px-4 gap-4">
                  <Code2 className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-300 font-mono">{selectedFile.split('/').pop()}</span>
                  <span className="text-xs text-red-400 ml-auto bg-red-400/10 px-2 py-1 rounded">Original</span>
                </div>
                <div className="flex-1 py-4 font-mono text-sm overflow-y-auto whitespace-pre">
                  {renderDiff(
                    CHECKPOINTS.find(c => c.id === selectedCheckpoint)?.files[selectedFile as keyof typeof CHECKPOINTS[0]['files']]?.original || "",
                    CHECKPOINTS.find(c => c.id === selectedCheckpoint)?.files[selectedFile as keyof typeof CHECKPOINTS[0]['files']]?.optimized || "",
                    'original'
                  )}
                </div>
              </div>

              {/* Right Side: Optimized Code */}
              <div className="bg-[#1e1e1e] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[500px] relative">
                <div className="h-12 border-b border-zinc-800 bg-[#252526] flex items-center px-4 gap-4">
                  <Code2 className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-300 font-mono">{selectedFile.split('/').pop()}</span>
                  <span className="text-xs text-emerald-400 ml-auto bg-emerald-400/10 px-2 py-1 rounded">Optimized</span>
                </div>
                
                {launchState === "comparison" && (
                  <div className="absolute inset-0 top-12 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center">
                      <Zap className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                      <p className="text-zinc-300 font-medium">Ready to optimize</p>
                    </div>
                  </div>
                )}

                <div className="flex-1 py-4 font-mono text-sm overflow-y-auto whitespace-pre">
                  {renderDiff(
                    CHECKPOINTS.find(c => c.id === selectedCheckpoint)?.files[selectedFile as keyof typeof CHECKPOINTS[0]['files']]?.original || "",
                    CHECKPOINTS.find(c => c.id === selectedCheckpoint)?.files[selectedFile as keyof typeof CHECKPOINTS[0]['files']]?.optimized || "",
                    'optimized'
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Repository Optimization Timeline */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-indigo-400" />
              Repository Optimization Timeline
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
              
              {/* Timeline Nodes */}
              <div className="relative z-10 flex justify-between">
                {CHECKPOINTS.map((checkpoint, index) => {
                  const isSelected = selectedCheckpoint === checkpoint.id;
                  const isPast = index <= CHECKPOINTS.findIndex(c => c.id === selectedCheckpoint);
                  
                  return (
                    <div 
                      key={checkpoint.id}
                      onClick={() => setSelectedCheckpoint(checkpoint.id)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      {/* Node */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                        isSelected 
                          ? "bg-indigo-500 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                          : isPast
                            ? "bg-zinc-800 border-indigo-500/50 text-indigo-300"
                            : "bg-zinc-900 border-zinc-700 text-zinc-500 group-hover:border-zinc-500"
                      }`}>
                        {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-medium">{index + 1}</span>}
                      </div>
                      
                      {/* Label */}
                      <div className="mt-3 text-center w-32">
                        <p className={`text-xs font-medium transition-colors ${
                          isSelected ? "text-indigo-300" : isPast ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-400"
                        }`}>
                          {checkpoint.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-1 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          {checkpoint.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Checkpoint Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCheckpoint}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {CHECKPOINTS.find(c => c.id === selectedCheckpoint)?.name}
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-2xl">
                      {CHECKPOINTS.find(c => c.id === selectedCheckpoint)?.description}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        if (selectedCheckpoint > 1) {
                          setSelectedCheckpoint(selectedCheckpoint - 1);
                        }
                      }}
                      disabled={selectedCheckpoint === 1}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      Compare Previous
                    </button>
                    <button 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Changes
                    </button>
                    <button 
                      onClick={() => {
                        alert(`Restoring snapshot: ${CHECKPOINTS.find(c => c.id === selectedCheckpoint)?.name}`);
                      }}
                      className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-sm font-medium rounded-lg transition-colors border border-indigo-500/20 flex items-center gap-2"
                    >
                      <GitBranch className="w-4 h-4" />
                      Restore Snapshot
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* AI Agent Process & Mini Dashboard */}
      {(launchState === "optimizing" || launchState === "done") && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Process Logs */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col h-[250px]">
            <div className="h-12 border-b border-zinc-800 flex items-center px-4 gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-300">Agent Activity Logs</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2 text-zinc-400"
                  >
                    <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-indigo-400">{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {launchState === "optimizing" && (
                <motion.div 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-4 bg-indigo-500"
                />
              )}
            </div>
          </div>

          {/* Mini Dashboard */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
            <h3 className="text-lg font-medium mb-4">Projected AI Visibility</h3>
            <p className="text-sm text-zinc-400 mb-6">Estimated metrics for this section after deployment.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {MINI_SCORES.map((score, i) => {
                const Icon = score.icon;
                const showScore = launchState === "done" || selectedCheckpoint >= 3;
                const displayScore = showScore ? score.score - (5 - selectedCheckpoint) * 2 : "--";
                
                return (
                  <motion.div 
                    key={score.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: showScore ? i * 0.1 : 0 }}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                      <Icon className={`w-3 h-3 ${score.color.replace('bg-', 'text-')}`} />
                      {score.name}
                    </div>
                    <div className="text-xl font-semibold text-zinc-100">
                      {displayScore}{showScore ? "%" : ""}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {(launchState === "done" || selectedCheckpoint >= 4) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-auto pt-6"
              >
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Approve & Merge PR
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
