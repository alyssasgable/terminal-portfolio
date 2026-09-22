
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Minimize2, Maximize2, X } from 'lucide-react';

interface TerminalProps {
  onPortfolioCommand: () => void;
  onExperienceCommand: () => void;
  ready: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ onPortfolioCommand, onExperienceCommand, ready }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const commands = {
    help: () => [
      'Available commands:',
      '  about       - Learn about me',
      '  skills      - View my some of my skills',
      '  tech help   - Need help with a tech project?',
      '  experience  - Browse my work experience',
      '  portfolio   - Open my portfolio showcase',
      '  contact     - Get my contact information',
      '  clear       - Clear the terminal',
      '  whoami      - Display current user'
    ],
    about: () => [
      'Hello! I\'m Alyssa Gable.',
      'I\'m a developer and creative technologist with 8+ years of experience building full stack and mobile applications, and I\'m currently a WGU IT student continuing to expand my technical foundation.',
      'I enjoy turning ideas into things people can actually use, experience, and interact with. I work across web development, automation, and digital experiences, and I enjoy collaborating on everything from professional projects to personal ideas that need a little technology to bring them to life.',
      'I\'m also exploring the world of AV and interactive experiences, with a growing interest in TouchDesigner, visual systems, and bringing digital ideas into physical spaces.',
    ],
    skills: () => [
     'Technical Skills:',
      '├── Languages: Swift, HTML, CSS, JavaScript, Python, C, C++, Java, SQL',
      '├── Testing: Selenium, JUnit, Zephyr',
      '├── Tools: Git, GitHub, Jira, Xcode',
      '├── Platforms: Linux, Windows, macOS',
      '├── Community: Youth Education, Garden-Based Learning, Nonprofit Program Support',
      '├── Teaching: Classroom Management, Lesson Planning, Curriculum Design (AmeriCorps, CYEA)',
      '└── Other: OS X, Command Line, Agile Development, Cross-functional Teamwork'
    ],
    "tech-help": () => [
     "TECH HELP SESSION",
     "────────────────────────────────",
     "Have a tech problem? You don't need to know",
     "how to fix it before you book.",
     "",
     "✓ Website problems",
     "✓ Domains & DNS",
     "✓ Business email",
     "✓ Forms & business tools",
     "✓ Email marketing",
     "✓ App connections",
     "✓ Automation & workflows",
     "✓ General tech troubleshooting",
     "",
     "30-minute session — $75",
     "",
     "Book: https://cal.com/alyssa-gable/tech-help",
   ],
    experience: () => {
      onExperienceCommand();
      return ['Loading work experience...'];
    },
    portfolio: () => {
      onPortfolioCommand();
      return ['Opening portfolio showcase...'];
    },
    contact: () => [
      'Contact Information:',
      '📧 Email: alyssasgable@gmail.com',
      '🌐 Website: alyssagable.art',
      '💼 LinkedIn: /in/alyssagable',
      '🐙 GitHub: /alyssasgable'
    ],
    whoami: () => ['alyssa@terminal:~$'],
    clear: () => {
      setIsClearing(true);
      setTimeout(() => {
        setOutput([]);
        setIsClearing(false);
      }, 300);
      return [];
    }
  };

  useEffect(() => {
    if (ready) {
      setOutput([
        'Welcome to Alyssa G\'s Terminal',
        'Curious about my work? Here are some commands you can type in to get started:',
        '',
        '  about     - Learn about me',
        '  experience    - View my work experience',
        '  skills    - View my some of my skills',
        '  portfolio - Open my portfolio showcase',
        '  contact   - Get my contact information',
        '  clear     - Clear the terminal',
        '  whoami    - Display current user'
      ]);
    }
  }, [ready]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const newOutput = [...output, `$ ${cmd}`];
    
    if (commands[command as keyof typeof commands]) {
      const result = commands[command as keyof typeof commands]();
      if (result.length > 0) {
        newOutput.push(...result, '');
      }
    } else if (command === '') {
      // Empty command
    } else {
      newOutput.push(`Command not found: ${command}`, 'Type "help" for available commands.', '');
    }
    
    setOutput(newOutput);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gray-800 text-green-400 px-4 py-2 rounded border border-green-400 hover:bg-gray-700 transition-colors animate-pulse"
        >
          Terminal
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-green-400 rounded-lg shadow-2xl animate-fade-in">
      {/* Terminal header */}
      <div className="bg-gray-800 border-b border-green-400 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-green-400">alyssa@portfolio:~</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <Minimize2 size={16} />
          </button>
          <button className="text-green-400 hover:text-green-300 transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4 h-96 overflow-y-auto bg-black">
        {/* Output */}
        <div className={`space-y-1 transition-opacity duration-300 ${isClearing ? 'opacity-0' : 'opacity-100'}`}>
          {output.map((line, index) => (
            <div 
              key={index} 
              className={`${line.startsWith('$') ? 'text-green-300' : 'text-green-400'} font-mono text-sm`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Input line */}
        <div className="flex items-center mt-2">
          <ChevronRight className="text-green-400 mr-2" size={16} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent text-green-400 outline-none flex-1 font-mono text-sm"
            placeholder="Type a command..."
            autoFocus
          />
          <div className="w-2 h-5 bg-green-400 animate-pulse ml-1"></div>
        </div>
      </div>
    </div>
  );
};
