// CTRL+X => Delete Line
// ALT+Up/Down => Move Line Up/Down
document.addEventListener('DOMContentLoaded', function() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');

    // Function to handle line deletion (CTRL+X)
    function deleteLine(textarea) {
        const cursorPos = textarea.selectionStart;
        const text = textarea.value;
        const lines = text.split('\n');
        
        // Find the current line
        let currentLine = 0;
        let charCount = 0;
        for (let i = 0; i < lines.length; i++) {
            charCount += lines[i].length + 1; // +1 for newline
            if (charCount > cursorPos) {
                currentLine = i;
                break;
            }
        }

        // Remove the current line
        lines.splice(currentLine, 1);
        textarea.value = lines.join('\n');

        // Adjust cursor position
        let newPos = 0;
        if (currentLine > 0) {
            newPos = lines.slice(0, currentLine).join('\n').length + 1;
        }
        textarea.setSelectionRange(newPos, newPos);
    }

    // Function to move line up or down
    function moveLine(textarea, direction) {
        const cursorPos = textarea.selectionStart;
        const text = textarea.value;
        const lines = text.split('\n');
        
        // Find the current line
        let currentLine = 0;
        let charCount = 0;
        for (let i = 0; i < lines.length; i++) {
            charCount += lines[i].length + 1;
            if (charCount > cursorPos) {
                currentLine = i;
                break;
            }
        }

        // Check if move is possible
        if (direction === 'up' && currentLine === 0) return;
        if (direction === 'down' && currentLine === lines.length - 1) return;

        // Swap lines
        const targetLine = direction === 'up' ? currentLine - 1 : currentLine + 1;
        [lines[currentLine], lines[targetLine]] = [lines[targetLine], lines[currentLine]];
        textarea.value = lines.join('\n');

        // Adjust cursor position
        let newPos = 0;
        if (direction === 'up') {
            newPos = lines.slice(0, currentLine - 1).join('\n').length;
            if (currentLine > 1) newPos += 1;
            //newPos += lines[currentLine - 1].length + 1;
        } else {
            //console.log(`Moving DOWN\nCurrent Line: ${currentLine}\nTarget Line: ${targetLine}`);
            newPos = lines.slice(0, currentLine + 1).join('\n').length;
            //console.log(`New Position: ${newPos}`);
            if (currentLine < lines.length - 1) newPos += 1;
        }
        textarea.setSelectionRange(newPos, newPos);
    }

    // Add event listeners to both textareas
    [textbox1, textbox2].forEach(textarea => {
        textarea.addEventListener('keydown', function(e) {
            // CTRL+X for deleting line
            if (e.ctrlKey && e.key === 'x') {
                e.preventDefault();
                deleteLine(textarea);
            }
            // ALT+Up/Down Arrow for moving line
            if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
                moveLine(textarea, e.key === 'ArrowUp' ? 'up' : 'down');
            }
        });
    });
});