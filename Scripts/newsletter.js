document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const resultBlock = document.getElementById('newsletter');

    //let xx = "\u003cdiv class=\"container\"\u003e\u003ch1\u003eHello\u003c/h1\u003e\u003cp\u003eWorld \u0026 \"More\"\u003c/p\u003e\u003c/div\u003e";
    //let xx = "According to Forrester, 88% of engineering, product, and design leaders think prototyping needs to happen earlier. Wait til late in the lifecycle to surface changes and you'll get months of delays.\u003cp\u003e\u003c/p\u003e\u003cp\u003e🤔 But to find issues when you still have time to fix them, you need tools that create editable prototypes, not fully fleshed bad ideas. \u003c/p\u003e\u003cp\u003eIn this \u003ca href=\"https://miro.com/resources/ai-prototyping-landscape-guide/?utm_campaign=glb-26q4-nsp-wp-c3_o2-prototypes_product_guide\u0026amp;utm_source=tldr\u0026amp;utm_medium=paidmedia\u0026amp;utm_content=sponsorship\u0026amp;src=-tldr_glb\" rel=\"noopener noreferrer nofollow\" target=\"_blank\"\u003eMiro guide\u003c/a\u003e, product leaders get a:\u003c/p\u003e\u003cp\u003e1️⃣ Question set to define requirements \u0026amp; priorities\u003c/p\u003e\u003cp\u003e2️⃣ AI prototyping landscape overview\u003c/p\u003e\u003cp\u003e3️⃣ \u003ca href=\"https://miro.com/resources/ai-prototyping-landscape-guide/?utm_campaign=glb-26q4-nsp-wp-c3_o2-prototypes_product_guide\u0026amp;utm_source=tldr\u0026amp;utm_medium=paidmedia\u0026amp;utm_content=sponsorship\u0026amp;src=-tldr_glb\" rel=\"noopener noreferrer nofollow\" target=\"_blank\"\u003eTooling evaluation framework + scorecard\u003c/a\u003e \u003c/p\u003e\u003cp\u003eTackle problems early in the lifecycle by accelerating your prototyping strategy. \u003ca href=\"https://miro.com/resources/ai-prototyping-landscape-guide/?utm_campaign=glb-26q4-nsp-wp-c3_o2-prototypes_product_guide\u0026amp;utm_source=tldr\u0026amp;utm_medium=paidmedia\u0026amp;utm_content=sponsorship\u0026amp;src=-tldr_glb\" rel=\"noopener noreferrer nofollow\" target=\"_blank\"\u003eGet the guide to learn how. \u003c/a\u003e\u003c/p\u003e";
    //xx="Learn how Ramp became one of the most productive companies in the world by adopting a Builder mindset—understanding that work is fundamentally changing and actively building an AI operating system instead of waiting for the perfect tool.\u003cp\u003e\u003c/p\u003e\u003cp\u003eKey takeaways from the story:\u003c/p\u003e\u003cul\u003e\u003cli\u003eThe Builder mindset: Don\u0026#39;t wait for AI to get easier—start designing your future work now\u003c/li\u003e\u003cli\u003eThree steps to scale: Getting precise with AI, centralizing information, and building workflows without engineers\u003c/li\u003e\u003cli\u003eReal results: 270 features shipped in H1 2025 (more than all of 2024 combined) with 90% of 1,200 employees using Notion AI monthly\u003c/li\u003e\u003c/ul\u003e\u003cp\u003eThe blog includes a CTA to watch the Make with Notion session with Ben Levik (Ramp\u0026#39;s operations and AI product leader)                                                                                    \u003c/p\u003e";
    //document.getElementById('tmp').innerHTML = xx;
    dummyFill();
    
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


function dummyFill() {
    document.getElementById('newsletter').innerHTML += `<div class="news-block"><h3>How Ramp built an AI operating system for scalable work (Sponsor)</h3><div class="news-content">Learn how Ramp became one of the most productive companies in the world by adopting a Builder mindset—understanding that work is fundamentally changing and actively building an AI operating system instead of waiting for the perfect tool.<p></p><p>Key takeaways from the story:</p><ul><li>The Builder mindset: Don't wait for AI to get easier—start designing your future work now</li><li>Three steps to scale: Getting precise with AI, centralizing information, and building workflows without engineers</li><li>Real results: 270 features shipped in H1 2025 (more than all of 2024 combined) with 90% of 1,200 employees using Notion AI monthly</li></ul><p>The blog includes a CTA to watch the Make with Notion session with Ben Levik (Ramp's operations and AI product leader)                                                                                    </p></div></div>
    <div class="news-block"><h3>OpenAI is quietly adopting skills, now available in ChatGPT and Codex CLI (8 minute read)</h3><div class="news-content">Skills support is quietly showing up in OpenAI's Codex CLI tool and ChatGPT. The skills folder can be accessed by prompting, 'Create a zip file of /home/oai/skills'. So far, the skills cover spreadsheets, docx, and PDFs. A link to a repository with a copy of the skills is available in the article.</div></div>`;

}