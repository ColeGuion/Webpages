document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const resultBlock = document.getElementById('resultBlk');

    extractBtn.addEventListener('click', async function() {
        const url_string = "https://tldr.tech/ai/2025-12-08";

        // Basic validation
        if (!url_string) {
            showError('Please enter URL string');
            return;
        }

        // Show loading state
        setLoading(true);
        hideError();
        //hideResult();

        try {
            // Call the Netlify function
            const response = await fetch('/.netlify/functions/finddiff/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url_string})
            });

            const data = await response.json();
            console.log("Data received:", data);

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            displayResult(data.result);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (isLoading) {
            loadingElement.classList.remove('hidden');
            extractBtn.disabled = true;
            extractBtn.textContent = 'Processing...';
        } else {
            loadingElement.classList.add('hidden');
            extractBtn.disabled = false;
            extractBtn.textContent = 'Find Differences';
        }
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideError() {
        errorElement.classList.add('hidden');
    }

    function displayResult(data_result) {
        resultBlock.innerHTML = data_result;
        //resultBlock.textContent = data_result;
    }

    /* function hideResult() {
        markupContainer.classList.add('hidden');
    } */
});
