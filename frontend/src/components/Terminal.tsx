import { useEffect, useState } from 'react';
import { useTerminalCommands } from '../data/usePortfolio';

interface HistoryItem {
  command: string;
  output: string;
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
    }, 15);

    return () => clearInterval(interval);
  }, [isTyping, output]);

  return (
    <div className="font-mono text-sm space-y-2">
      <div className="flex items-center gap-2 text-[var(--accent)]">
        <span className="text-[var(--text-muted)]">$</span>
        <span>{command}</span>
      </div>
      <div className="text-[var(--text-secondary)] whitespace-pre-wrap pl-4 leading-relaxed">
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
    firstCommand ? [{ command: firstCommand, output: commands[firstCommand].output }] : []
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
          { command: trimmedCmd, output: commands[trimmedCmd].output }
        ]);
        setIsTyping(false);
      }, 300);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: trimmedCmd,
          output: `Command not found: ${trimmedCmd}\nTry 'help' for available commands`,
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
    <div className="w-full glass rounded-2xl p-5 font-mono text-sm">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
          <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]" />
          <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]" />
        </div>
        <span className="text-[var(--text-muted)] text-xs">river@flow</span>
        <div className="w-16" />
      </div>

      <div className="space-y-5 mb-5 max-h-80 overflow-y-auto">
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

      <div className="flex items-center gap-2 border-t border-[var(--border)] pt-4">
        <span className="text-[var(--accent)]">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="type a command..."
          className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)]"
          disabled={isTyping}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[var(--border)]">
        {commandsList.map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInput(cmd);
              setTimeout(() => handleCommand(cmd), 100);
            }}
            disabled={isTyping}
            className="px-3 py-1.5 text-xs rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--accent)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
