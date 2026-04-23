import { Plugin, Notice } from 'obsidian';

function toUnicode(text: string, type: 'bold' | 'italic' | 'boldItalic'): string {
    const chars = text.split('');
    return chars.map(c => {
        const code = c.charCodeAt(0);
        // Uppercase A-Z (65-90)
        if (code >= 65 && code <= 90) {
            if (type === 'bold') return String.fromCodePoint(0x1D5D4 + (code - 65));
            if (type === 'italic') return String.fromCodePoint(0x1D608 + (code - 65));
            if (type === 'boldItalic') return String.fromCodePoint(0x1D63C + (code - 65));
        }
        // Lowercase a-z (97-122)
        if (code >= 97 && code <= 122) {
            if (type === 'bold') return String.fromCodePoint(0x1D5EE + (code - 97));
            if (type === 'italic') return String.fromCodePoint(0x1D622 + (code - 97));
            if (type === 'boldItalic') return String.fromCodePoint(0x1D656 + (code - 97));
        }
        // Digits 0-9 (48-57)
        if (code >= 48 && code <= 57) {
            if (type === 'bold') return String.fromCodePoint(0x1D7EC + (code - 48));
            // No specific italic digits in sans-serif typically used, leave as is
        }
        return c;
    }).join('');
}

function markdownToLinkedIn(md: string): string {
    let text = md;
    
    // Headers -> Bold (e.g., # Header)
    text = text.replace(/^#+\s+(.*)$/gm, (match, p1) => toUnicode(p1, 'bold'));
    
    // Bold Italic (***text*** or ___text___)
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, (match, p1) => toUnicode(p1, 'boldItalic'));
    text = text.replace(/\b___(.*?)___\b/g, (match, p1) => toUnicode(p1, 'boldItalic'));
    
    // Bold (**text** or __text__)
    text = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => toUnicode(p1, 'bold'));
    text = text.replace(/\b__(.*?)__\b/g, (match, p1) => toUnicode(p1, 'bold'));
    
    // Italic (*text* or _text_)
    text = text.replace(/\*(.*?)\*/g, (match, p1) => toUnicode(p1, 'italic'));
    text = text.replace(/\b_(.*?)_\b/g, (match, p1) => toUnicode(p1, 'italic'));
    
    // Lists (- item or * item)
    text = text.replace(/^(\s*)[-*+]\s+/gm, '$1● ');
    
    // Links ([text](url))
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
    
    // Inline code (`code`)
    text = text.replace(/`([^`]+)`/g, '$1');
    
    // Blockquotes (> quote)
    text = text.replace(/^>\s+(.*)$/gm, (match, p1) => toUnicode(p1, 'italic'));

    return text;
}

export default class LinkedInCopyPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'copy-as-linkedin',
			name: 'Copy as LinkedIn Format',
			editorCallback: async (editor) => {
				const selectedText = editor.getSelection();
				
				if (!selectedText) {
					new Notice('No text selected. Please select markdown text to copy.');
					return;
				}

				try {
					const linkedInText = markdownToLinkedIn(selectedText);
					await navigator.clipboard.writeText(linkedInText);
					new Notice('Copied as LinkedIn Format!');
				} catch (err) {
					console.error('Failed to copy text: ', err);
					new Notice('Failed to copy text to clipboard.');
				}
			}
		});
	}

	onunload() {
	}
}
