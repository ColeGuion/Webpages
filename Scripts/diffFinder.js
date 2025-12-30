
document.addEventListener('DOMContentLoaded', function() {
    const findDiffBtn = document.getElementById('findDiffBtn');
    const string1Input = document.getElementById('string1');
    const string2Input = document.getElementById('string2');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const markupContainer = document.getElementById('markupContainer');
    //DummyFill();

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

            displayResult(string1, data.result);
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

    function displayResult(prompt, data_result) {
        if (data_result == null) {
            console.log("NULL data_result variable.");
            let newMarkup = `<div class="marked-text"><span class="textSpan"></span></div>\n`;
            markupContainer.innerHTML = newMarkup + markupContainer.innerHTML;
            markupContainer.classList.remove('hidden');
            return;
        }
        let markupList = data_result.map(item => [item.length, item.index, item.message]);
        console.log('Markups:', markupList);
        let markedText = markupText(prompt, markupList);

        // Append result to start of markup container
        /* let newMarkup = `<div id="markupItem" class="markup-item">
            <div class="markup-title">Marked Text:</div>
            <div class="marked-text">
                <span class="textSpan">${markedText}</span>
            </div>
        </div>\n`; */
        let newMarkup = `<div class="marked-text">
            <span class="textSpan">${markedText}</span>
        </div>\n`;
        markupContainer.innerHTML = newMarkup + markupContainer.innerHTML;
        markupContainer.classList.remove('hidden');
    }

    function hideResult() {
        markupContainer.classList.add('hidden');
    }
});

function DummyFill() {
    document.getElementById('string1').value = `========== TEXT ==========  
The fleet was led by an U.S. ship during the exercise.
The instructor looked through his briefcase through his desk and around the office for the lost grade book.
The axe sharp and deadly was brand new.
wilson, the mayor of our city, gave an inspirational speech.
My dad has two brothers, but brother Paul is his favorite.
If I knew than what I know now
She effected an air of superiority.
Didnt he say when he would arrive at Arnies house?
The moons rays shone feebly on the path, and I heard a lone crickets chirpings and whistlings.`;
    document.getElementById('string2').value = `========== CORRECT ==========
The fleet was led by a U.S. ship during the exercise.
The instructor looked through his briefcase, through his desk, and around the office for the lost grade book.
The axe, sharp and deadly, was brand new.
Wilson, the mayor of our city, gave an inspirational speech.
My dad has two brothers, but Brother Paul is his favorite.
If I knew then what I know now.
She affected an air of superiority.
Didn't he say when he would arrive at Arnie's house?
The moon's rays shone feebly on the path, and I heard a lone cricket's chirpings and whistlings.`;

}

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
