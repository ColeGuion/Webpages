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
            const response = await fetch('/.netlify/functions/newsletter', {
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

});

async function fetchNewsletterContent(url) {
    try {
        // Call the Netlify function
        const response = await fetch('/.netlify/functions/newsletter', {
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

}