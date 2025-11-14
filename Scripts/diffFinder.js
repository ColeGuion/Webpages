
document.addEventListener('DOMContentLoaded', function() {
    const findDiffBtn = document.getElementById('findDiffBtn');
    const string1Input = document.getElementById('string1');
    const string2Input = document.getElementById('string2');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    //const resultContainer = document.getElementById('resultContainer');
    const resultList = document.getElementById('resultList');
    const markupContainer = document.getElementById('markupContainer');

    findDiffBtn.addEventListener('click', async function() {
        const string1 = string1Input.value.trim();
        const string2 = string2Input.value.trim();

        // Basic validation
        if (!string1 || !string2) {
            showError('Please enter both strings');
            return;
        }

        // Show loading state
        setLoading(true);
        hideError();
        hideResult();

        try {
            // Call the Netlify function
            const response = await fetch('/.netlify/functions/finddiff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ string1: string1, string2: string2})
            });

            const data = await response.json();
            console.log("Data received:", data);

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            let markupList = [];
            let resp = data.result;
            console.log("Data Result:", resp);
            if (resp != null) {
                markupList = resp.map(item => {
                    return [item.length, item.index, item.message];
                });
            }
            console.log('Markups:', markupList);
            let markedText = markupText(string1, markupList);

            // Append result to start of markup container
            let newMarkup = `<div id="markupItem" class="markup-item">
                <div class="markup-title">Marked Text:</div>
                <div class="marked-text"><span class="textSpan">${markedText}</span></div>
            </div>\n`;
            markupContainer.innerHTML = newMarkup + markupContainer.innerHTML;
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (isLoading) {
            loadingElement.classList.remove('hidden');
            findDiffBtn.disabled = true;
            findDiffBtn.textContent = 'Processing...';
        } else {
            loadingElement.classList.add('hidden');
            findDiffBtn.disabled = false;
            findDiffBtn.textContent = 'Find Differences';
        }
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideError() {
        errorElement.classList.add('hidden');
    }

    function displayResults(differences) {
        resultList.innerHTML = '';
        
        if (differences && differences.length > 0) {
            differences.forEach(diff => {
                const li = document.createElement('li');
                li.className = 'result-item';
                li.textContent = diff;
                resultList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.className = 'result-item';
            li.textContent = 'No differences found';
            resultList.appendChild(li);
        }
        
        markupContainer.classList.remove('hidden');
    }

    function hideResult() {
        markupContainer.classList.add('hidden');
    }

    // Add some example text for quick testing
    //string1Input.value = "Hello World!";
    //string2Input.value = "Hello Netlify!";
});

/**
 * Markup the text given an array of markups.
 * Markups will be highlighted in red.
 * Gibberish markups will be highlighted in orange.
 * 
 * @param {string} text - The original text to be marked up
 * @param {array} ranges - Text Markup ranges array.    Example: [[2,0,Did you mean “My”?], [2,265,Add comma “Hi,”], ...]
 * @returns {string} - HTML formatted string of the original text marked up
 */
function markupText(text, ranges) {
    // Sort ranges by start index, and if equal, by decreasing length
    ranges.sort((a, b) => a[1] - b[1] || b[0] - a[0]);

    // Array to store start and end tags at each position
    let markup = Array(text.length + 1).fill('').map(() => ({ start: '', end: '' }));
    
    ranges.forEach(range => {
        const [length, start, msg] = range;
        let end = start + length - 1;
        let spanCls = msg === "Text is unclear." ? "markGibb" : "markTxt";
        
        // Insert start and end tags at the right positions
        markup[start].start += `<span class="${spanCls}" data-tooltip="${msg}">`;
        markup[end].end = `</span>` + markup[end].end;
    });

    // Build the final marked-up string
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += markup[i].start + text[i] + markup[i].end;
    }
    result += markup[text.length].end; // Append any remaining closing tags

    return result;
}
