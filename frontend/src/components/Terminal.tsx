import { useEffect, useState } from 'react';

interface Command {
  output: string;
  description: string;
}

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

const commands: Record<string, Command> = {
  whoami: {
    output: `Developer-Designer | React + Django Fullstack
Passionate about building fast, scalable web experiences
Location: 🌍 Worldwide
Status: Open to exciting projects`,
    description: 'Who am I'
  },
  'ls projects': {
    output: `[1] E-commerce Platform
    └─ Impact: 45% faster checkout flow
    └─ Tech: React, Django, PostgreSQL
    
[2] Real-time Dashboard
    └─ Impact: 99.9% uptime achieved
    └─ Tech: React, WebSocket, Node.js
    
[3] API Gateway
    └─ Impact: 60% reduction in response time
    └─ Tech: Django REST, PostgreSQL, Redis`,
    description: 'List projects'
  },
  'cat skills.txt': {
    output: `FRONTEND:
├─ React 18 (Hooks, Context, Performance optimization)
├─ TypeScript (Type-safe development)
├─ Tailwind CSS (Utility-first design)
└─ Responsive & accessible UIs

BACKEND:
├─ Django & Django REST Framework
├─ PostgreSQL (Complex queries, optimization)
├─ Redis (Caching & real-time features)
└─ API design & RESTful principles

TOOLS & WORKFLOW:
├─ Git & GitHub (Version control mastery)
├─ Docker (Containerization)
├─ Performance optimization (Lighthouse, DevTools)
└─ TDD & clean code practices`,
    description: 'Show technical skills'
  },
  help: {
    output: `Available commands:
├─ whoami        Show who I am
├─ ls projects   List my projects with impact metrics
├─ cat skills.txt Display my technical stack
├─ contact      Get in touch
└─ clear        Clear terminal`,
    description: 'Show help'
  },
  contact: {
    output: `📧 Email: riverflow@example.com
💼 LinkedIn: linkedin.com/in/riverflow
🐙 GitHub: github.com/riverflow
🌐 Portfolio: riverflow.dev

Ready to discuss your next project? Let's talk!`,
    description: 'Contact information'
  }
};

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
        <span className="text-pink-400">~</span>
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
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: 'whoami', output: commands.whoami.output, completed: true }
  ]);
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
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyan-500/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-gray-500 text-xs">RiverFlow Terminal</span>
        <div className="w-20" />
      </div>

      {/* Terminal Content */}
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

      {/* Input Area */}
      <div className="flex items-center gap-2 border-t border-cyan-500/10 pt-4">
        <span className="text-emerald-400">➜</span>
        <span className="text-pink-400">~</span>
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

      {/* Quick Commands */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-cyan-500/10">
        {Object.keys(commands).map((cmd) => (
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

      {/* Help Text */}
      <div className="text-xs text-gray-500 mt-4 text-center">
        Type commands or click quick commands above. Type 'help' for available commands.
      </div>
    </div>
  );
}
