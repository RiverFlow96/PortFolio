import { useEffect, useState } from 'react';
import { useTerminalCommands } from '../datas/usePortfolio';

interface HistoryItem {
  command: string;
  output: string;
  completed: boolean;
}

interface TerminalLineProps {
  command: string;
  output: string;
  isTyping: boolean;
}

function TerminalLine({ command, output, isTyping }: TerminalLineProps): JSX.Element {
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < output.length) {
        setDisplayedOutput(output.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isTyping, output]);

  return (
    <div className="font-mono text-sm space-y-2">
      <div className="flex items-center gap-2 text-cyan-400">
        <span className="text-emerald-400">➜</span>
        <span className="text-cyan-400">~</span>
        <span>{command}</span>
      </div>
      <div className="text-gray-300 whitespace-pre-wrap pl-4 leading-relaxed">
        {isTyping ? displayedOutput : output}
        {isTyping && !isComplete && <span className="animate-pulse">█</span>}
      </div>
    </div>
  );
}

export function Terminal(): JSX.Element {
  const commands = useTerminalCommands();
  const commandsList = Object.keys(commands);
  const firstCommand = commandsList[0];

  const [history, setHistory] = useState<HistoryItem[]>(
    firstCommand ? [{ command: firstCommand, output: commands[firstCommand].output, completed: true }] : []
  );
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleCommand = (cmd: string): void => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;
    if (trimmedCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (commands[trimmedCmd]) {
      setIsTyping(true);
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { command: trimmedCmd, output: commands[trimmedCmd].output, completed: true }
        ]);
        setIsTyping(false);
      }, 500);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: trimmedCmd,
          output: `Command not found: ${trimmedCmd}\nTry 'help' for available commands`,
          completed: true
        }
      ]);
    }

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full bg-[#0f0f14]/80 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm font-mono text-sm">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyan-500/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-gray-500 text-xs">Terminal</span>
        <div className="w-20" />
      </div>

      <div className="space-y-6 mb-6 max-h-96 overflow-y-auto">
        {history.map((line, idx) => (
          <div key={idx}>
            <TerminalLine
              command={line.command}
              output={line.output}
              isTyping={isTyping && idx === history.length - 1}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-cyan-500/10 pt-4">
        <span className="text-emerald-400">➜</span>
        <span className="text-cyan-400">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a command (try 'help')"
          className="flex-1 bg-transparent outline-none text-cyan-400 placeholder-gray-600"
          disabled={isTyping}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-cyan-500/10">
        {commandsList.map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInput(cmd);
              setTimeout(() => handleCommand(cmd), 100);
            }}
            disabled={isTyping}
            className="px-3 py-1 text-xs rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ${cmd}
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-500 mt-4 text-center">
        Type commands or click quick commands above. Type 'help' for available commands.
      </div>
    </div>
  );
}