// Thank you for using my template! It's kind of my first time making one so uhh yaaa, enjoy!! :3
// Also, there might be some issues with the welcome message. It works 50% of the time, if someone could open a pull request I'd gladly appreciate it!
const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('command-input');
const themeSwitcher = document.getElementById('theme-switcher');

let isLightTheme = false;

// Commands and their output.
const commands = {
    help: `
Available commands:
  <span class="command-echo">about</span>      - Who's John Doe?
  <span class="command-echo">projects</span>   - View my work
  <span class="command-echo">contact</span>    - How to reach me
  <span class="command-echo">clear</span>      - Clear the terminal screen
  <span class="command-echo">theme</span>      - Change the theme (e.g., 'theme light', 'theme dark')
  <span class="command-echo">help</span>       - Show this help message
    `,
    about: `
Hello! I'm John Doe, a full-stack developer with a passion for building creative and functional web applications.
With over 5 years of experience, I've had the chance to work with technologies like React, Node.js, Python, and SQL.
I enjoy turning complex problems into simple, beautiful, and intuitive designs.
When I'm not coding, you can find me hiking, exploring new technologies, or brewing the perfect cup of coffee.
    `,
    projects: `
Here are some of my projects:

<ul class="projects">
    <li>
        <p class="project-title">Project Alpha</p>
        <p>A web-based platform for real-time data visualization. Built with D3.js and WebSockets.</p>
        <a href="example.com" target="_blank">[Live Demo]</a> <a href="github.com" target="_blank">[GitHub]</a>
    </li>
    <li>
        <p class="project-title">Project Beta</p>
        <p>An e-commerce site for a local business, featuring a custom CMS. Built with Django and Stripe.</p>
        <a href="example.com" target="_blank">[Live Demo]</a> <a href="github.Com" target="_blank">[GitHub]</a>
    </li>
    <li>
        <p class="project-title">Project Gamma</p>
        <p>A mobile-first progressive web app for task management. Built with Vue.js and Firebase.</p>
        <a href="example.com" target="_blank">[Live Demo]</a> <a href="github.com" target="_blank">[GitHub]</a>
    </li>
</ul>
    `,
    contact: `
You can reach me via email or find me on social media:

Email:   <a href="mailto:john.doe@example.com">john.doe@example.com</a>
GitHub:  <a href="https://github.com/johndoe" target="_blank">github.com/johndoe</a>
LinkedIn:<a href="https://linkedin.com/in/johndoe" target="_blank">linkedin.com/in/johndoe</a>
    `,
};

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        isLightTheme = true;
        localStorage.setItem('portfolioTheme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        isLightTheme = false;
        localStorage.setItem('portfolioTheme', 'dark');
    }
}

function toggleTheme() {
    applyTheme(isLightTheme ? 'dark' : 'light');
}

function handleThemeCommand(args) {
    const theme = args[0];
    if (theme === 'light' || theme === 'dark') {
        applyTheme(theme);
        print(`Theme set to ${theme}.`);
    } else {
        print(`Usage: theme [light|dark]`);
    }
}

function printWelcomeMessage() {
    const welcome = `
Welcome to John Doe's portfolio!
Type 'help' to see a list of available commands.
    `;
    print(welcome);
}

function print(message) {
    const p = document.createElement('div');
    p.innerHTML = message;
    output.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(e) {
    if (e.key === 'Enter') {
        const fullCommand = input.value.trim().toLowerCase();
        input.value = '';

        if (fullCommand) {
            print(`<span class="prompt">&gt;</span> <span class="command-echo">${fullCommand}</span>`);
            const [command, ...args] = fullCommand.split(/\s+/);

            if (command === 'clear') {
                output.innerHTML = '';
            } else if (command === 'theme') {
                handleThemeCommand(args);
            } else if (commands[command]) {
                print(commands[command]);
            } else {
                print(`Command not found: ${command}. Type 'help' for a list of commands.`);
            }
        }
    }
}

// Focus the input when the terminal is clicked
terminal.addEventListener('click', () => {
    input.focus();
});

// Handle keydown events for commands
input.addEventListener('keydown', handleCommand);

// Handle theme switcher click
themeSwitcher.addEventListener('click', toggleTheme);

// Initial setup
const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
applyTheme(savedTheme);
printWelcomeMessage();
input.focus();
