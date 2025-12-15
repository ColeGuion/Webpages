document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const resultBlock = document.getElementById('newsletter');

    //let xx = "\u003cdiv class=\"container\"\u003e\u003ch1\u003eHello\u003c/h1\u003e\u003cp\u003eWorld \u0026 \"More\"\u003c/p\u003e\u003c/div\u003e";
    let xx = "According to Forrester, 88% of engineering, product, and design leaders think prototyping needs to happen earlier. Wait til late in the lifecycle to surface changes and you'll get months of delays.\u003cp\u003e\u003c/p\u003e\u003cp\u003e🤔 But to find issues when you still have time to fix them, you need tools that create editable prototypes, not fully fleshed bad ideas. \u003c/p\u003e\u003cp\u003eIn this \u003ca href=\"https://miro.com/resources/ai-prototyping-landscape-guide/?utm_campaign=glb-26q4-nsp-wp-c3_o2-prototypes_product_guide\u0026amp;utm_source=tldr\u0026amp;utm_medium=paidmedia\u0026amp;utm_content=sponsorship\u0026amp;src=-tldr_glb\" rel=\"noopener noreferrer nofollow\" target=\"_blank\"\u003eMiro guide\u003c/a\u003e, product leaders get a:\u003c/p\u003e\u003cp\u003e1️⃣ Question set to define requirements \u0026amp; priorities\u003c/p\u003e\u003cp\u003e2️⃣ AI prototyping landscape overview\u003c/p\u003e\u003cp\u003e3️⃣ \u003ca href=\"https://miro.com/resources/ai-prototyping-landscape-guide/?utm_campaign=glb-26q4-nsp-wp-c3_o2-prototypes_product_guide\u0026amp;utm_source=tldr\u0026amp;utm_medium=paidmedia\u0026amp;utm_content=sponsorship\u0026amp;src=-tldr_glb\" rel=\"noopener noreferrer nofollow\" target=\"_blank\"\u003eTooling evaluation framework + scorecard\u003c/a\u003e \u003c/p\u003e\u003cp\u003eTackle problems early in the lifecycle by accelerating your prototyping strategy. \u003ca href=\"https://miro.com/resources/ai-prototyping-landscape-guide/?utm_campaign=glb-26q4-nsp-wp-c3_o2-prototypes_product_guide\u0026amp;utm_source=tldr\u0026amp;utm_medium=paidmedia\u0026amp;utm_content=sponsorship\u0026amp;src=-tldr_glb\" rel=\"noopener noreferrer nofollow\" target=\"_blank\"\u003eGet the guide to learn how. \u003c/a\u003e\u003c/p\u003e";
    document.getElementById('tmp').innerHTML = xx;

    //TODO: Add link to article to top of page
    //  OR add link to headers to specific article (tldr-ai or tldr-design)
    extractBtn.addEventListener('click', async function() {
        const today = new Date().toISOString().split('T')[0];
        const url_string = "https://tldr.tech/ai/" + today;
        console.log("URL String:", url_string);
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

    function displayResult(data_result) {
        //resultBlock.innerHTML = data_result;
        data_result.forEach(article => {
            console.log("Article:", article);
            let newsDiv = document.createElement('div');
            let newsHead = document.createElement('h3');
            let newsContent = document.createElement('div');
            newsDiv.classList.add('news-block');
            newsContent.classList.add('news-content');
            newsHead.textContent = article.title;
            if (article.htmlContent) {
                newsContent.innerHTML = article.htmlContent;
            } else {
                newsContent.textContent = article.text;
            }

            newsDiv.appendChild(newsHead);
            newsDiv.appendChild(newsContent);
            resultBlock.appendChild(newsDiv);
        });
    }

    function setLoading(isLoading) {
        if (isLoading) {
            loadingElement.classList.remove('hidden');
            extractBtn.disabled = true;
            extractBtn.textContent = 'Processing...';
        } else {
            loadingElement.classList.add('hidden');
            extractBtn.disabled = false;
            extractBtn.textContent = 'Extract Content';
        }
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideError() {
        errorElement.classList.add('hidden');
    }
});
