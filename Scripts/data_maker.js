document.addEventListener("DOMContentLoaded", function () {
    //load_test_texts();
});

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

function handlePaste(textareaId) {
    // Use setTimeout to allow the paste to complete first
    setTimeout(function() {
        const textarea = document.getElementById(textareaId);
        // Replace backtick apostrophes with normal apostrophes
        textarea.value = textarea.value.replace(/‘/g, "'").replace(/’/g, "'").replace(/“/g, '"').replace(/”/g, '"');
        
        // Update line numbers after paste and replacement
        const lineNumberId = textareaId === 'textbox1' ? 'line-numbers-1' : 'line-numbers-2';
        updateLineNumbers(textareaId, lineNumberId);
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
        if (line.startsWith('"') && line.endsWith('"') && line.length > 1) {
            return line.slice(1, -1);
        }
        return line;
    });
    textbox1.value = processedLines1.join('\n');
    
    // Process textbox2
    const lines2 = textbox2.value.split('\n');
    const processedLines2 = lines2.map(line => {
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
}

function make_data_samples(orig, correcteds) {
    let dtype = document.getElementById('dtype').value;
    let src = document.getElementById('source').value;
    let phone1 = document.getElementById('phone1').value;
    let phone2 = document.getElementById('phone2').value;
    //console.log(`Source: ${JSON.stringify(src)}\nDtype: ${JSON.stringify(dtype)}\nPhone #1: ${JSON.stringify(phone1)}\nPhone #2: ${JSON.stringify(phone2)}`);

    // Format homophone inputs (Capital letter followed by all lowercase)
    if (phone1.length > 0) {
        phone1 = phone1.charAt(0).toUpperCase() + phone1.slice(1).toLowerCase();
    }
    if (phone2.length > 0) {
        phone2 = phone2.charAt(0).toUpperCase() + phone2.slice(1).toLowerCase();
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
        
        jsonObjects.push({
            ...(dtype !== "" ? { type: dtype } : {}),   // Add "type" field if dtype does not equal ""
            ...(phone1 !== "" ? { phones: [phone1, phone2] } : {}),   // Add "phones" field if phone1 does not equal ""
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
    document.getElementById('textbox1').innerHTML = `I spent hours poring over the script with my co-stars to memorize my lines.
He pored over his notes the night before the exam.
Pieces of food keep getting caught in the sponge's pores.

In this narrative analysis, I chose research participants whose work aligned with the
theories previously described; yet these participants didn’t always express views that
aligned with those theories during our interviews.


The success of the project depends on whether we secure funding.`;
    document.getElementById('textbox2').innerHTML = `I spent hours poring over the script with my co-stars to memorize my lines.
He pored over his notes the night before the exam.
Pieces of food keep getting caught in the sponge's pores.

Hello
World!

Therefore, it is inaccurate to characterise the socialist realist art of the 1930s as simply
the product of uniformly oppressive Stalinist policy; socialist realism was also driven
from below by some artists and by the public.

The success of the project depends on whether we secure funding.`;

}