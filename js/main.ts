declare const gsap: any;
declare const ScrollTrigger: any;

interface TerminalLine {
  text: string;
  type: string;
}

interface TerminalCommand {
  cmd: string;
  output: TerminalLine[];
}

document.getElementById('year')!.textContent = new Date().getFullYear().toString();

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));

const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const mobileThemeBtn = document.getElementById('mobileThemeToggle');

const getStoredTheme = (): string | null => localStorage.getItem('theme');
const setStoredTheme = (t: string): void => { localStorage.setItem('theme', t); };

const applyTheme = (t: string): void => {
  if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
  }
};

const initTheme = (): void => {
  let t = getStoredTheme();
  if (!t) { t = 'system'; setStoredTheme(t); }
  applyTheme(t);
};

initTheme();

themeBtn?.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  setStoredTheme(next);
  applyTheme(next);
});

mobileThemeBtn?.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  setStoredTheme(next);
  applyTheme(next);
});

const progress = document.getElementById('progress');

const setProgress = (): void => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const width = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  if (progress) progress.style.width = width + '%';
};

setProgress();
window.addEventListener('scroll', setProgress, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email') as HTMLInputElement | null;
      const successMessage = document.getElementById('newsletter-success');
      if (emailInput && successMessage) {
        emailInput.value = '';
        successMessage.classList.remove('hidden');
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 3000);
      }
    });
  }
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const terminalCommands: TerminalCommand[] = [
  { cmd: 'mcp-maker --help', output: [
    { text: 'mcp-maker v1.2.0 - MCP server scaffolding CLI', type: 'info' },
    { text: '', type: '' },
    { text: 'USAGE:', type: 'info' },
    { text: '  mcp-maker init <project-name> [options]', type: '' },
    { text: '  mcp-maker list                          List available templates', type: '' },
    { text: '  mcp-maker --version                     Show version', type: '' },
    { text: '', type: '' },
    { text: 'OPTIONS:', type: 'info' },
    { text: '  --template, -t   Choose a template (default/server/minimal)', type: '' },
    { text: '  --typescript, -ts  Use TypeScript', type: '' },
    { text: '  --help, -h       Show this help message', type: '' },
  ]},
  { cmd: 'mcp-maker init my-server --typescript', output: [
    { text: '✓ Scaffolding MCP server...', type: 'success' },
    { text: '✓ Creating project structure...', type: 'success' },
    { text: '✓ Installing dependencies...', type: 'success' },
    { text: '', type: '' },
    { text: 'Server created successfully!', type: 'success' },
    { text: 'Run: cd my-server && npm run dev', type: 'info' },
  ]},
  { cmd: 'help', output: [
    { text: 'Available commands:', type: 'info' },
    { text: '  help     - Show this help message', type: '' },
    { text: '  clear    - Clear terminal', type: '' },
    { text: '  projects - List featured projects', type: '' },
    { text: '  contact  - Get in touch', type: '' },
  ]},
  { cmd: 'projects', output: [
    { text: 'Featured Projects:', type: 'info' },
    { text: '', type: '' },
    { text: '  1. mcp-maker (CLI tool)', type: 'success' },
    { text: '     Scaffold TypeScript MCP servers', type: '' },
    { text: '', type: '' },
    { text: '  2. AnoTech (Web App)', type: 'success' },
    { text: '     Technology platform project', type: '' },
    { text: '', type: '' },
    { text: '  3. CIOsChallenge PPT', type: 'success' },
    { text: '     Interactive presentation platform', type: '' },
  ]},
  { cmd: 'contact', output: [
    { text: 'Get in touch:', type: 'info' },
    { text: '', type: '' },
    { text: '  Email: codewithp.dev@gmail.com', type: '' },
    { text: '  GitHub: github.com/yadav-prakhar', type: '' },
    { text: '  LinkedIn: linkedin.com/in/prakhar-yadav', type: '' },
  ]},
];

let currentCommandIndex = 0;
let currentCharIndex = 0;
let currentOutputIndex = 0;
let isTyping = false;
let isOutputting = false;
let currentOutput: TerminalLine[] = [];
let inputEnabled = true;

const terminalCommand = document.getElementById('terminal-command');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');

function typeCommand(): void {
  if (currentCommandIndex >= terminalCommands.length) {
    currentCommandIndex = 0;
  }
  
  const command = terminalCommands[currentCommandIndex];
  isTyping = true;
  inputEnabled = false;
  if (terminalCommand) terminalCommand.textContent = '';
  currentCharIndex = 0;
  
  function typeChar(): void {
    if (currentCharIndex < command.cmd.length) {
      if (terminalCommand) terminalCommand.textContent += command.cmd[currentCharIndex];
      currentCharIndex++;
      setTimeout(typeChar, 50 + Math.random() * 50);
    } else {
      isTyping = false;
      setTimeout(showOutput, 300);
    }
  }
  
  typeChar();
}

function showOutput(): void {
  isOutputting = true;
  const command = terminalCommands[currentCommandIndex];
  currentOutput = command.output;
  currentOutputIndex = 0;
  if (terminalOutput) terminalOutput.innerHTML = '';
  
  function addLine(): void {
    if (currentOutputIndex < currentOutput.length) {
      const line = currentOutput[currentOutputIndex];
      const lineEl = document.createElement('div');
      lineEl.className = `output-line ${line.type}`;
      lineEl.textContent = line.text;
      if (terminalOutput) terminalOutput.appendChild(lineEl);
      currentOutputIndex++;
      if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
      setTimeout(addLine, 100);
    } else {
      isOutputting = false;
      currentCommandIndex++;
      if (currentCommandIndex < terminalCommands.length) {
        setTimeout(() => {
          inputEnabled = true;
          addNewCommandLine();
        }, 1000);
      } else {
        setTimeout(() => {
          currentCommandIndex = 0;
          inputEnabled = true;
          addNewCommandLine();
        }, 2000);
      }
    }
  }
  
  addLine();
}

function addNewCommandLine(): void {
  const newLine = document.createElement('div');
  newLine.className = 'terminal-line';
  newLine.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-command"></span><span class="terminal-cursor" aria-hidden="true"></span>`;
  if (terminalOutput) terminalOutput.appendChild(newLine);
  
  const newCommandEl = newLine.querySelector('.terminal-command');
  const newCursorEl = newLine.querySelector('.terminal-cursor');
  
  if (terminalCommand) terminalCommand.textContent = '';
  
  let newCharIndex = 0;
  const command = terminalCommands[currentCommandIndex];
  
  function typeNextChar(): void {
    if (newCharIndex < command.cmd.length) {
      if (newCommandEl) newCommandEl.textContent += command.cmd[newCharIndex];
      newCharIndex++;
      setTimeout(typeNextChar, 50 + Math.random() * 50);
    } else {
      if (newCursorEl) (newCursorEl as HTMLElement).style.display = 'none';
      setTimeout(showOutput, 300);
    }
  }
  
  setTimeout(typeNextChar, 200);
}

const terminalWidget = document.querySelector('.terminal-widget');
if (terminalWidget && !prefersReducedMotion) {
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.querySelector('.terminal-cursor')) {
        setTimeout(typeCommand, 800);
        terminalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  terminalObserver.observe(terminalWidget);
}

if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  const heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline) {
    const spans = heroHeadline.querySelectorAll('span');
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heroHeadline,
        start: 'top 80%',
      }
    });
  }
  
  document.querySelectorAll('section h2').forEach(heading => {
    if (!heading.closest('.hero-section')) {
      gsap.from(heading, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
        }
      });
    }
  });
  
  document.querySelectorAll('#projects .fade-up').forEach((card, i) => {
    gsap.from(card, {
      scale: 0.9,
      rotation: -1,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      }
    });
  });
  
  document.querySelectorAll('.floating-badge').forEach((badge) => {
    gsap.to(badge, {
      y: -30,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
  
  const timelineLine = document.querySelector('.timeline-line-fill');
  if (timelineLine) {
    const timelineSection = document.querySelector('#experience');
    if (timelineSection) {
      gsap.to(timelineLine, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineSection,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true
        }
      });
    }
  }
  
  document.querySelectorAll('#skills .fade-up').forEach((card, i) => {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      }
    });
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { 
    if (e.isIntersecting) e.target.classList.add('is-visible'); 
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up, .fade-right, .fade-left').forEach((el) => {
  const delay = el.classList.contains('delay-50') ? 50 : 
                el.classList.contains('delay-100') ? 100 : 
                el.classList.contains('delay-150') ? 150 : 
                el.classList.contains('delay-200') ? 200 : 
                el.classList.contains('delay-300') ? 300 : 
                el.classList.contains('delay-500') ? 500 : 0;
  (el as HTMLElement).style.transitionDelay = delay + 'ms';
  io.observe(el);
});
