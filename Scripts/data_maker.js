document.addEventListener("DOMContentLoaded", function () {
    //load_test_texts();

    // Initialize line numbers on page load
    updateLineNumbers('textbox1', 'line-numbers-1');
    updateLineNumbers('textbox2', 'line-numbers-2');
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

function submitData() {
    const textbox1 = document.getElementById('textbox1');
    const textbox2 = document.getElementById('textbox2');
    
    // Split text into arrays by lines
    const orig = textbox1.value.split('\n');
    const correcteds = textbox2.value.split('\n');
    
    // Call the make_data_samples function
    make_data_samples(orig, correcteds);
}

function make_data_samples(orig, correcteds) {
    let dtype = document.getElementById('dtype').value;
    let src = document.getElementById('source').value;
    let phone1 = document.getElementById('phone1').value;
    let phone2 = document.getElementById('phone2').value;
    //console.log(`Source: ${JSON.stringify(src)}\nDtype: ${JSON.stringify(dtype)}\nPhone #1: ${JSON.stringify(phone1)}\nPhone #2: ${JSON.stringify(phone2)}`);

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
    
    // Format as individual JSON objects (not as an array)
    const formattedResult = jsonObjects.map(obj => {
        //JSON.stringify(obj, null, 4)
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

It's time for retailers to help people find products in their precise moment of need—and perhaps before they even perceive that need—whether or not they're logged in or ready to click a 'buy' button on a screen.
I wonder whether the Earth is really flat.

She wants to discuss whether your story is accurate.
I can't decide whether to go to the party or stay home.
Please let me know whether you'll be able to attend the meeting.
The success of the project depends on whether we secure funding.`;
    document.getElementById('textbox2').innerHTML = `I spent hours poring over the script with my co-stars to memorize my lines.
He pored over his notes the night before the exam.
Pieces of food keep getting caught in the sponge's pores.

I wonder whether the Earth is really flat.
It's time for retailers to help people find products in their precise moment of need—and perhaps before they even perceive that need—whether or not they're logged in or ready to click a 'buy' button on a screen.

She wants to discuss whether your story is accurate.
I can't decide whether to go to the party or stay home.
Please let me know whether you'll be able to attend the meeting.
The success of the project depends on whether we secure funding.`;

}