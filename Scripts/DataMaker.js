// Visual Loading Timeline
//   1. DOM Parsing Starts
//   2. DOMContentLoaded
//       - HTML is loaded and parsed, DOM is built
//       - Does NOT wait for stylesheets, images, and subframes to finish loading
//   3. Resources Loading
//   4. Window.load
//       - The entire page has loaded, including all dependent resources

// Track last Ctrl+D search state per textarea
const ctrlDState = new WeakMap();

function selectNextOccurrence(textarea) {
    const text = textarea.value;
    let state = ctrlDState.get(textarea);

    // If no state or selection changed, initialize
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;

    if (!state || state.start !== selStart || state.end !== selEnd) {
        if (selStart === selEnd) return; // nothing selected

        const selectedText = text.slice(selStart, selEnd);
        if (!selectedText.trim()) return;

        state = {
            query: selectedText,
            index: selEnd
        };
    }

    const nextIndex = text.indexOf(state.query, state.index);

    if (nextIndex !== -1) {
        textarea.setSelectionRange(
            nextIndex,
            nextIndex + state.query.length
        );
        state.index = nextIndex + state.query.length;
        ctrlDState.set(textarea, state);
    } else {
        // Wrap around like VS Code
        const wrapIndex = text.indexOf(state.query);
        if (wrapIndex !== -1) {
            textarea.setSelectionRange(
                wrapIndex,
                wrapIndex + state.query.length
            );
            state.index = wrapIndex + state.query.length;
            ctrlDState.set(textarea, state);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fill_dtype_list();
    add_textbox_shortcuts();
    load_test_texts();
});

// Initialize line numbers on page load
window.addEventListener('load', function() {
    updateLineNumbers('textbox1', 'line-numbers-1');
    updateLineNumbers('textbox2', 'line-numbers-2');
});

// Add keyboard shortcuts for textareas
//*   CTRL + D        ->  Select next occurence
//*   CTRL + X        ->  Delete Line
//*    ALT + Up/Down  ->  Move Line Up/Down
//*    ALT + X        ->  Clear both text boxes
//*    ALT + C        ->  Copies JSON objects
function add_textbox_shortcuts() {
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
            // CTRL + D → select next occurrence
            if (e.ctrlKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                selectNextOccurrence(textarea);
                return;
            }
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

    // Add event listeners for textareas
    document.addEventListener('keydown', function(event) {
        //* ALT+X - Clear both text boxes
        //if (event.altKey && event.key.toLowerCase() === 'x') {
        //    event.preventDefault();
        //    clearTextarea('textbox1');
        //    clearTextarea('textbox2');
        //}
        
        //* ALT+C - Copy JSON objects
        if (event.altKey && event.key.toLowerCase() === 'c') {
            event.preventDefault();
            if (window.currentResult) {
                copyResult();
            }
        }
    });
}

function fill_dtype_list() {
    let dtypeList = document.getElementById("dtype-list");
    const dtype_values = [
        "Abbreviations", "Adjective & Adverbs", "Affect vs. Effect", "Apostrophes", "Articles", 
        "Capitalization", "Capitalization - Directions", "Capitalization - Family Titles", "Colons", "Commas",
        "Comparatives & Superlatives", "Date Formatting", "Good vs Well", "Homophones", "Hyphens",
        "Irregular Verbs", "Its vs. It's", "Me vs I", "More", "Periods",
        "Plurality", "Preposition", "Pronouns", "Quotation Marks", "Semicolons",
        "Subject-Verb Agreement", "Their, There, They're", "Then vs. Than", "Times", "To, Too, Two",
        "Verb Tense & Form", "Who vs. Whom", "Writing Decades & Centuries", "You, Your, You're",
    ];
    // Sort values alphabetically
    dtype_values.sort();
    dtype_values.forEach(val => {
        dtypeList.innerHTML += `<option value="${val}">${val}</option>`;
    });
}

function clearInput(inputId) {
    document.getElementById(inputId).value = '';
    // If clearing dtype, hide phones section
    if (inputId === 'dtype') {
        togglePhonesSection();
    }
}

function togglePhonesSection() {    
    const dtypeInput = document.getElementById('dtype');
    const phonesSection = document.getElementById('phones-section');
    
    if (dtypeInput.value.trim().toLowerCase() === 'homophones') {
        phonesSection.style.display = 'flex';
    } else {
        phonesSection.style.display = 'none';
        // Clear phones inputs when hiding
        document.getElementById('phone1').value = '';
        document.getElementById('phone2').value = '';
        document.getElementById('phone3').value = '';
    }
}

function clearTextarea(textareaId) {
    document.getElementById(textareaId).value = '';
    // Update line numbers when clearing
    const lineNumberId = textareaId === 'textbox1' ? 'line-numbers-1' : 'line-numbers-2';
    updateLineNumbers(textareaId, lineNumberId);
}

function updateLineNumbers(textareaId, lineNumbersId) {
    const textarea = document.getElementById(textareaId);
    const lineNumbers = document.getElementById(lineNumbersId);
    
    const lines = textarea.value.split('\n');
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
    const textareaStyles = getComputedStyle(textarea);
    const textareaWidth = textarea.clientWidth - parseFloat(textareaStyles.paddingLeft) - parseFloat(textareaStyles.paddingRight);

    // Create a temporary canvas to measure text width
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = textareaStyles.fontSize + ' ' + textareaStyles.fontFamily;
    
    // Clear existing line numbers
    lineNumbers.innerHTML = '';
    
    lines.forEach((line, index) => {
        // Calculate how many visual lines this logical line takes
        let visualLines = 1;
        if (line.length > 0) {
            const textWidth = ctx.measureText(line).width;
            visualLines = Math.max(1, Math.ceil(textWidth / textareaWidth));
        }
        
        const lineNumberDiv = document.createElement('div');
        lineNumberDiv.textContent = index + 1;
        lineNumberDiv.style.height = (lineHeight * visualLines) + 'px';
        lineNumberDiv.style.lineHeight = lineHeight + 'px';
        lineNumberDiv.style.display = 'flex';
        lineNumberDiv.style.alignItems = 'flex-start';
        lineNumbers.appendChild(lineNumberDiv);
    });
}

function syncScroll(textareaId, lineNumberId) {
    const textarea = document.getElementById(textareaId);
    const lineNumbers = document.getElementById(lineNumberId);
    
    lineNumbers.scrollTop = textarea.scrollTop;
}

/* function handlePaste(textareaId) {
    // Use setTimeout to allow the paste to complete first
    setTimeout(function() {
        const textarea = document.getElementById(textareaId);
        // Replace weird quotes with normal quotes
        textarea.value = textarea.value.replace(/‘/g, "'").replace(/’/g, "'").replace(/“/g, '"').replace(/”/g, '"');
        // Remove empty/blank lines (lines that are only whitespace)
        //textarea.value = textarea.value
        //    .split('\n')
        //    .filter(line => line.trim() !== '')
        //    .join('\n');
        // Update line numbers after paste and replacement
        const lineNumberId = textareaId === 'textbox1' ? 'line-numbers-1' : 'line-numbers-2';
        updateLineNumbers(textareaId, lineNumberId);
    }, 0);
} */

function handlePaste(textareaId) {
    const textarea = document.getElementById(textareaId);
    
    // Store the current selection/cursor position and existing content
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const existingContent = textarea.value;
    
    // Use setTimeout to allow the paste to complete first
    setTimeout(function() {
        // Get the new content after paste
        const newContent = textarea.value;
        
        // Extract only the pasted portion
        const beforePaste = existingContent.substring(0, startPos);
        const afterPaste = existingContent.substring(endPos);
        const pastedText = newContent.substring(startPos, newContent.length - afterPaste.length);
        
        // Process only the pasted text
        let processedPastedText = pastedText;
        // Replace weird quotes with normal quotes in pasted text
        processedPastedText = processedPastedText.replace(/'/g, "'").replace(/'/g, "'").replace(/"/g, '"').replace(/"/g, '"');
        // Remove empty/blank lines from pasted text only
        processedPastedText = processedPastedText
            .split('\n')
            .filter(line => line.trim() !== '')
            .join('\n');
        
        // Reconstruct the textarea content with processed pasted text
        textarea.value = beforePaste + processedPastedText + afterPaste;
        
        // Update line numbers after paste and replacement
        const lineNumberId = textareaId === 'textbox1' ? 'line-numbers-1' : 'line-numbers-2';
        updateLineNumbers(textareaId, lineNumberId);
        replaceApostrophes();
    }, 0);
}

function copyTextarea(textareaId) {
    const textarea = document.getElementById(textareaId);
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        // Brief visual feedback
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Copied!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 1000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

function removeNumbers() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');
    
    // Process textbox1
    const lines1 = textbox1.value.split('\n');
    const processedLines1 = lines1.map(line => {
        // Remove numbers (optionally followed by '.' or ')') at starts of lines
        line = line.replace(/^\d+([.)]| )\s*/, '');
        return line;
    });
    textbox1.value = processedLines1.join('\n');

    // Process textbox1
    const lines2 = textbox2.value.split('\n');
    const processedLines2 = lines2.map(line => { 
        // Remove numbers (optionally followed by '.' or ')') at starts of lines
        line = line.replace(/^\d+([.)]| )\s*/, '');
        return line;
    });
    textbox2.value = processedLines2.join('\n');
}

function removeQuotes() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');
    
    // Process textbox1
    const lines1 = textbox1.value.split('\n');
    const processedLines1 = lines1.map(line => {
        if (line.trim().startsWith("•")) {
            // Remove bullet point at start of line
            line = line.trim().slice(1).trim();
        }
        if (line.trim().startsWith('"') && line.trim().endsWith('"')) {
            return line.trim().slice(1, -1).trim();
        }
        return line;
    });
    textbox1.value = processedLines1.join('\n');
    
    // Process textbox2
    const lines2 = textbox2.value.split('\n');
    const processedLines2 = lines2.map(line => {
        if (line.startsWith("•")) {
            // Remove bullet point at start of line
            line = line.slice(1).trim();
        }
        if (line.startsWith('"') && line.endsWith('"') && line.length > 1) {
            return line.slice(1, -1);
        }
        return line;
    });
    textbox2.value = processedLines2.join('\n');
}

function replaceApostrophes() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');
    
    // Replace weird single and double quotes (‘’ “”) with normal quotes
    textbox1.value = textbox1.value.replace(/‘/g, "'").replace(/’/g, "'").replace(/“/g, '"').replace(/”/g, '"');
    textbox2.value = textbox2.value.replace(/‘/g, "'").replace(/’/g, "'").replace(/“/g, '"').replace(/”/g, '"');
}

// Remove empty/blank lines in both textboxes
function removeEmptyLines() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');
    
    // Remove empty lines from phones textarea
    textbox1.value = textbox1.value
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');
        
    // Remove empty lines from emails textarea
    textbox2.value = textbox2.value
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');
    
    updateLineNumbers('textbox1', 'line-numbers-1');
    updateLineNumbers('textbox2', 'line-numbers-2');
}

function combineToSentences() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');

    textbox1.value = combineSentences(textbox1.value);
    textbox2.value = combineSentences(textbox2.value);
    updateLineNumbers('textbox1', 'line-numbers-1');
    updateLineNumbers('textbox2', 'line-numbers-2');
}

function combineSentences(input) {
    // Split input into lines and trim whitespace
    const lines = input.split("\n").map((line) => line.trim());

    // Initialize result array and current sentence
    let sentences = [];
    let currentSentence = [];

    // Process each line
    for (let line of lines) {
        if (line) {
            currentSentence.push(line);
            // If line ends with any of `.!?` then combine current sentence and reset
            if (line.endsWith(".") || line.endsWith("!") || line.endsWith("?")) {
                let sentence = currentSentence.join(" ").replace(/\s+([;,.])/g, "$1");
                sentences.push(sentence);
                currentSentence = [];
            }
        }
    }

    // Handle any remaining lines that don't end with a period
    if (currentSentence.length > 0) {
        let sentence = currentSentence.join(" ").replace(/\s+([;,.])/g, "$1");
        sentences.push(sentence);
    }

    // Join sentences with newlines
    return sentences.join("\n");
}

function submitData() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');
    
    // Split text into arrays by lines
    // Filter out any empty lines for formatting and text matchings
    const orig = textbox1.value.split('\n').filter(line => line.trim() !== '');
    const correcteds = textbox2.value.split('\n').filter(line => line.trim() !== '');

    console.log(`Orig Length: ${orig.length}\nCorrecteds Length: ${correcteds.length}`);
    if (orig.length == correcteds.length) {
        // Call the make_data_samples function
        make_data_samples(orig, correcteds);
    } else {
        // Throw error
        const resultContainer = document.getElementById('result-container');
        const resultDisplay = document.getElementById('result-display');
        resultContainer.style.display = 'block';
        resultDisplay.textContent = `ERROR: Mismatched number of texts!\nTextBox #1 = ${orig.length}\nTextBox #2 = ${correcteds.length}`;
    }
    copyResult();
}

function make_data_samples(orig, correcteds) {
    let dtype = document.getElementById('dtype').value.trim();
    let src = document.getElementById('source').value.trim();
    let phone1 = document.getElementById('phone1').value.trim();
    let phone2 = document.getElementById('phone2').value.trim();
    let phone3 = document.getElementById('phone3').value.trim();
    //console.log(`Source: ${JSON.stringify(src)}\nDtype: ${JSON.stringify(dtype)}\nPhone #1: ${JSON.stringify(phone1)}\nPhone #2: ${JSON.stringify(phone2)}`);

    // Format homophone inputs (Capital letter followed by all lowercase)
    if (phone1.length > 0) {
        phone1 = phone1.charAt(0).toUpperCase() + phone1.slice(1).toLowerCase();
    }
    if (phone2.length > 0) {
        phone2 = phone2.charAt(0).toUpperCase() + phone2.slice(1).toLowerCase();
    }
    if (phone3.length > 0) {
        phone3 = phone3.charAt(0).toUpperCase() + phone3.slice(1).toLowerCase();
    }


    // Strip whitespace from all strings
    const trimmedOrig = orig.map(str => str.trim());
    const trimmedCorrecteds = correcteds.map(str => str.trim());
    
    // Create JSON objects
    const jsonObjects = [];
    const maxLength = Math.max(trimmedOrig.length, trimmedCorrecteds.length);
    
    for (let i = 0; i < maxLength; i++) {
        const text = trimmedOrig[i] || '';
        const correct = trimmedCorrecteds[i] || '';
        
        // Skip empty pairs
        if (text.trim() === '' && correct.trim() === '') {
            continue;
        }

        phone_list = [phone1, phone2];
        if (dtype.toLowerCase() === 'homophones') {
            // Ensure both phone fields are filled for homophones
            if (phone1 === '' || phone2 === '') {
                alert("For 'Homophones' dtype, both Phone #1 and Phone #2 fields must be filled.");
                return;
            }

            if (phone3 === '') {
                text_has_phone1 = text.toLowerCase().includes(phone1.toLowerCase());
                text_has_phone2 = text.toLowerCase().includes(phone2.toLowerCase());
                correct_has_phone1 = correct.toLowerCase().includes(phone1.toLowerCase());
                correct_has_phone2 = correct.toLowerCase().includes(phone2.toLowerCase());

                if (text_has_phone1 && correct_has_phone2) {
                    phone_list = [phone1, phone2];
                } else if (text_has_phone2 && correct_has_phone1) {
                    phone_list = [phone2, phone1];
                } else if (text_has_phone1 && correct_has_phone1) {
                    phone_list = [phone1, phone1];
                } else if (text_has_phone2 && correct_has_phone2) {
                    phone_list = [phone2, phone2];
                } else {
                    phone_list = ["PHONE", "PHONE"];
                }
            } else {
                text_has_phone1 = text.toLowerCase().includes(phone1.toLowerCase());
                text_has_phone2 = text.toLowerCase().includes(phone2.toLowerCase());
                text_has_phone3 = text.toLowerCase().includes(phone3.toLowerCase());
                correct_has_phone1 = correct.toLowerCase().includes(phone1.toLowerCase());
                correct_has_phone2 = correct.toLowerCase().includes(phone2.toLowerCase());
                correct_has_phone3 = correct.toLowerCase().includes(phone3.toLowerCase());

                if (text_has_phone1 && correct_has_phone2) {
                    phone_list = [phone1, phone2];
                } else if (text_has_phone1 && correct_has_phone3) {
                    phone_list = [phone1, phone3];
                } else if (text_has_phone2 && correct_has_phone1) {
                    phone_list = [phone2, phone1];
                } else if (text_has_phone2 && correct_has_phone3) {
                    phone_list = [phone2, phone3];
                } else if (text_has_phone3 && correct_has_phone1) {
                    phone_list = [phone3, phone1];
                } else if (text_has_phone3 && correct_has_phone2) {
                    phone_list = [phone3, phone2];
                } else if (text_has_phone1 && correct_has_phone1) {
                    phone_list = [phone1, phone1];
                } else if (text_has_phone2 && correct_has_phone2) {
                    phone_list = [phone2, phone2];
                } else if (text_has_phone3 && correct_has_phone3) {
                    phone_list = [phone3, phone3];
                } else {
                    phone_list = ["PHONE", "PHONE"];
                }
            }
        }
        
        jsonObjects.push({
            ...(dtype !== "" ? { type: dtype } : {}),   // Add "type" field if dtype does not equal ""
            //...(phone1 !== "" ? { phones: [phone1, phone2] } : {}),   // Add "phones" field if phone1 does not equal ""
            ...(phone1 !== "" ? { phones: phone_list } : {}),   // Add "phones" field if phone1 does not equal ""
            text: text,
            correct: correct,
            ...(src !== "" ? { source: src } : {}),   // Add "source" field if src does not equal ""
        });

    }
    
    // Display the result
    displayResult(jsonObjects);
}

function displayResult(jsonObjects) {
    const resultContainer = document.getElementById('result-container');
    const resultDisplay = document.getElementById('result-display');
    
    // Update header with number of objects made
    document.getElementById('result-objects-header').innerText = `Generated JSON Objects (${jsonObjects.length})`;
    
    // Throw error if any objects have any empty value in their "text" or "correct" fields
    const hasEmptyField = jsonObjects.some(obj => 
        obj.text === "" || obj.correct === ""
    );
    if (hasEmptyField) {
        alert("A generated JSON object contains an empty string field");
    }

    // Format as individual JSON objects (not as an array)
    const formattedResult = jsonObjects.map(obj => {
        // Custom JSON formatting to keep arrays on single line
        let jsonStr = JSON.stringify(obj, null, 4);

        // Replace multi-line array formatting with single-line
        jsonStr = jsonStr.replace(/(\[\s+)"([^"]+)",\s+"([^"]+)"\s+\]/g, '["$2", "$3"]');

        return jsonStr;
    }).join(',\n');
    
    resultDisplay.textContent = formattedResult;
    resultContainer.style.display = 'block';
    
    // Store the result for copying
    window.currentResult = formattedResult;
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

function copyResult() {
    const textToCopy = window.currentResult || '';

    // Create a temporary textarea to copy the text
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = textToCopy;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Copied!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 1000);
    } catch (err) {
        console.error('Failed to copy result: ', err);
    }
    
    document.body.removeChild(tempTextarea);
}



function load_test_texts() {
    let content1 = `I need to getten some groceries before the store closes at nine.
Please getten your shoes on so we aren't late for the appointment.
If you practice every day, you will getten much better at playing the piano.
It is often difficult to getten a good night's sleep when you are stressed.
Yesterday, I gotten a surprising phone call from an old college friend.
He gotten the highest score in the class on his final exam.
We gotten caught in a sudden downpour on our way home from the park.
She gotten a new bike for her birthday and rode it all afternoon.
I have got much more comfortable with public speaking this year.
She has got a lot of praise for her innovative design work.
The situation has got completely out of control.
He has got used to the noisy city after living there for a year.
I would have got you a ticket if I had known you wanted to come.
He gotten the answer correct on his first attempt.
I've gotten to finish this report before the meeting starts.
They gotten caught in the rain without an umbrella.
`;
    let content2 = `I need to get some groceries before the store closes at nine.
Please get your shoes on so we aren't late for the appointment.
If you practice every day, you will get much better at playing the piano.
It is often difficult to get a good night's sleep when you are stressed.
Yesterday, I got a surprising phone call from an old college friend.
He got the highest score in the class on his final exam.
We got caught in a sudden downpour on our way home from the park.
She got a new bike for her birthday and rode it all afternoon.
I have gotten much more comfortable with public speaking this year.
She has gotten a lot of praise for her innovative design work.
The situation has gotten completely out of control.
He has gotten used to the noisy city after living there for a year.
I would have gotten you a ticket if I had known you wanted to come.
He got the answer correct on his first attempt.
I've got to finish this report before the meeting starts.
They got caught in the rain without an umbrella.
`;
    content1 = "\n\n\n\n\n";
    content2 = "\n\n\n\n\n";
    document.getElementById('textbox1').innerHTML = content1;
    document.getElementById('textbox2').innerHTML = content2;
    updateLineNumbers('textbox1', 'line-numbers-1');
    updateLineNumbers('textbox2', 'line-numbers-2');
}
