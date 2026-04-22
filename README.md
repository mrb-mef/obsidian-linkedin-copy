# Obsidian LinkedIn Copy Plugin

A simple Obsidian plugin that copies your selected markdown text and seamlessly transforms it into a LinkedIn-friendly format using Unicode math alphanumeric characters. 

Since LinkedIn doesn't natively support markdown formatting, this plugin converts your markdown tags (like bold and italics) into specialized Unicode characters that LinkedIn displays correctly.

## Features & Formatting

- **Headers**: `# Header` becomes **𝗛𝗲𝗮𝗱𝗲𝗿**
- **Bold**: `**text**` becomes **𝗯𝗼𝗹𝗱 𝘁𝗲𝘅𝘁**
- **Italics**: `*text*` becomes *𝘪𝘵𝘢𝘭𝘪𝘤 𝘵𝘦𝘹𝘵*
- **Bold Italics**: `***text***` becomes ***𝙗𝙤𝙡𝙙 𝙞𝙩𝙖𝙡𝙞𝙘 𝙩𝙚𝙭𝙩***
- **Bullet Lists**: `- item` and `* item` convert to `● item`
- **Blockquotes**: `> quote` become *𝘪𝘵𝘢𝘭𝘪𝘤 𝘲𝘶𝘰𝘵𝘦*
- **Links**: `[My Link](https://example.com)` becomes `My Link (https://example.com)`
- **Code Blocks**: Inline code backticks are cleanly stripped.

## Installation

### Manual Installation
1. Download the latest release (which includes `main.js` and `manifest.json`) from the Releases page.
2. Extract the folder into your vault's `.obsidian/plugins/` directory.
3. Make sure the folder is named something like `obsidian-linkedin-copy`.
4. Restart Obsidian (or go to Settings -> Community Plugins and reload the list).
5. Enable **LinkedIn Copy** in your plugins list.

## Usage
1. Highlight the markdown text you want to post in your editor.
2. Open the command palette (`Ctrl/Cmd + P`).
3. Search for and execute **Copy as LinkedIn Format**.
4. Paste the content directly into your LinkedIn post draft!

> **Tip:** You can assign a hotkey (e.g. `Ctrl+Shift+C`) to the "Copy as LinkedIn Format" command in your Obsidian Hotkeys settings for an even faster workflow!

## Development & Architecture
This plugin is intentionally built using Vanilla JavaScript (`main.js`) instead of TypeScript to maximize portability and avoid the need for Node.js build dependencies. All of the conversion logic resides entirely within `main.js`. 

If you'd like to contribute new formatting options or fix edge cases, feel free to submit a Pull Request!

## License
[MIT License](LICENSE)
