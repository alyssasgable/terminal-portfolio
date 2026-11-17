import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Minimize2, X } from 'lucide-react';

interface TerminalProps {
  onPortfolioCommand: () => void;
  onExperienceCommand: () => void;
  ready: boolean;
}

interface InfoPopup {
  title: string;
  lines: string[];
}

export const Terminal: React.FC<TerminalProps> = ({
  onPortfolioCommand,
  onExperienceCommand,
  ready,
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [infoPopup, setInfoPopup] = useState<InfoPopup | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showInfo = (title: string, lines: string[]) => {
    setInfoPopup({ title, lines });
  };

  const commands = {
    help: () => [
      'AVAILABLE COMMANDS:',
      '  about       - Learn about me',
      '  skills      - Explore my technical skills',
      '  experience  - Browse my work experience',
      '  portfolio   - Open my portfolio showcase',
      '  contact     - Get my contact information',
      '  clear       - Clear the terminal',
    ],

    about: () => {
      showInfo('ABOUT ME', [
        "Hello! I'm Alyssa Gable.",
        '',
        "I'm a developer and creative technologist with experience building full stack and mobile applications.",
        '',
        'I enjoy turning ideas into things people can actually use, experience, and interact with.',
        '',
        "I'm exploring AV, interactive experiences, TouchDesigner, visual systems, and creative technology.",
      ]);
      return [];
    },

    skills: () => {
      showInfo('TECHNICAL SKILLS', [
        'LANGUAGES',
        'Swift, HTML, CSS, JavaScript, Python, C, C++, Java, SQL',
        '',
        'TESTING',
        'Selenium, JUnit, Zephyr',
        '',
        'TOOLS',
        'Git, GitHub, Jira, Xcode, Jenkins',
        '',
        'PLATFORMS',
        'Linux, Windows, macOS',
        '',
        'COMMUNITY',
        'Youth Education, Garden-Based Learning',
        '',
        'OTHER',
        'Command Line, Agile Development, Automation',
      ]);
      return [];
    },

    experience: () => {
      onExperienceCommand();
      return ['Loading work experience...'];
    },

    portfolio: () => {
      onPortfolioCommand();
      return ['Opening portfolio showcase...'];
    },

    contact: () => {
      showInfo('CONTACT INFORMATION', [
        'EMAIL',
        'alyssasgable@gmail.com',
        '',
        'WEBSITE',
        'https://alyssasvg.online',
        '',
        'LINKEDIN',
        '/in/alyssagable',
        '',
        'GITHUB',
        '/alyssasgable',
      ]);
      return [];
    },

    clear: () => {
      setIsClearing(true);
      setTimeout(() => {
        setOutput([]);
        setIsClearing(false);
      }, 300);
      return [];
    },
  };

  useEffect(() => {
    if (ready) {
      setOutput([
        'Type a command to get to know me!',
        '',
        '  about       - Learn about me',
        '  skills      - Explore my technical skills',
        '  experience  - View my work experience',
        '  portfolio   - Open my portfolio showcase',
        '  contact     - Get my contact information',
        '  help        - Show available commands',
        '  clear       - Clear the terminal',
      ]);
    }
  }, [ready]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const newOutput = [...output, `$ ${cmd}`];

    if (command in commands) {
      const result = commands[command as keyof typeof commands]();

      if (result.length > 0) {
        newOutput.push(...result, '');
      }
    } else if (command !== '') {
      newOutput.push(
        `Command not found: ${command}`,
        'Type "help" for available commands.',
        ''
      );
    }

    setOutput(newOutput);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <>
      {isMinimized ? (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={() => setIsMinimized(false)}
            className="rounded border border-green-400 bg-gray-900 px-4 py-2 text-green-400 transition-colors hover:bg-gray-800"
          >
            Terminal
          </button>
        </div>
      ) : (
        <div className="w-full min-w-0 overflow-hidden rounded-lg border border-green-400 bg-gray-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-green-400 bg-gray-800 px-3 py-3 sm:px-4">
            <div className="flex min-w-0 items-center gap-2">
              <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
              <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-500" />
              <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
              <span className="ml-2 truncate text-xs text-green-400 sm:ml-4 sm:text-sm">
                alyssa@portfolio:~
              </span>
            </div>

            <button
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize terminal"
              className="shrink-0 text-green-400 transition-colors hover:text-green-200"
            >
              <Minimize2 size={17} />
            </button>
          </div>

          <div className="h-[55vh] min-h-[280px] max-h-[520px] overflow-y-auto bg-black p-3 sm:p-4">
            <div
              className={`space-y-1 transition-opacity duration-300 ${
                isClearing ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`break-words whitespace-pre-wrap font-mono text-xs leading-relaxed sm:text-sm ${
                    line.startsWith('$') ? 'text-green-300' : 'text-green-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-3 flex min-w-0 items-center">
              <ChevronRight className="mr-2 shrink-0 text-green-400" size={16} />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-w-0 flex-1 bg-transparent font-mono text-base text-green-400 outline-none sm:text-sm"
                placeholder="Type a command..."
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              <div className="ml-1 h-5 w-2 shrink-0 animate-pulse bg-green-400" />
            </div>
          </div>
        </div>
      )}

      {infoPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setInfoPopup(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-popup-title"
            className="w-full max-w-xl overflow-hidden rounded-lg border border-green-400 bg-gray-950 shadow-2xl shadow-green-950/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-green-800 bg-gray-900 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <h2
                  id="info-popup-title"
                  className="font-mono text-sm font-bold tracking-widest text-green-400"
                >
                  {infoPopup.title}
                </h2>
              </div>
              <button
                onClick={() => setInfoPopup(null)}
                aria-label="Close popup"
                className="text-green-500 transition hover:text-green-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-7">
              <div className="space-y-3 font-mono text-sm leading-relaxed text-green-300">
                {infoPopup.lines.map((line, index) => (
                  <p
                    key={index}
                    className={line === line.toUpperCase() && line.length > 0
                      ? 'font-bold tracking-wider text-green-400'
                      : ''}
                  >
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>
            </div>

            <div className="border-t border-green-900 px-5 py-3 text-right">
              <button
                onClick={() => setInfoPopup(null)}
                className="font-mono text-xs tracking-widest text-green-500 transition hover:text-green-300"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
