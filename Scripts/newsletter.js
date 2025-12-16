
document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const buttonGroup = document.querySelector('.button-group-two.design-3');
    const buttons = buttonGroup.querySelectorAll('.toggle-button');

    // Global variable to store the article type
    let article_type = 'ai';

    //dummyFill();

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'selected' class from all buttons
            buttons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            this.classList.add('selected');
            if (this.textContent === 'AI') {
                console.log("AI button clicked");
                article_type = 'ai';
                //document.getElementById('main-heading').innerText = 'TLDR AI';
                document.getElementById('ai-newsletter').classList.remove('hidden');
                document.getElementById('design-newsletter').classList.add('hidden');
            } else if (this.textContent === 'Design') {
                console.log("Design button clicked");
                article_type = 'design';
                document.getElementById('design-newsletter').classList.remove('hidden');
                document.getElementById('ai-newsletter').classList.add('hidden');
                //document.getElementById('main-heading').innerText = 'TLDR Design';
            }
            console.log(`Selected Button: ${this.textContent}`);
        });
    });

    // Load right away
    FetchNews("ai");
    FetchNews("design");
    //TODO: Add link to article to top of page
    //  OR add link to headers to specific article (tldr-ai or tldr-design)

    async function FetchNews(articleType) {
        const today = new Date().toISOString().split('T')[0];
        const url_string = "https://tldr.tech/" + articleType + "/" + today;
        console.log("Fetching URL String:", url_string);
        if (!url_string) {
            showError('Please enter URL string');
            return;
        }

        // Show loading state
        setLoading(true);
        hideError();

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

            if (articleType === 'ai') {
                const aiNewsletterBlock = document.getElementById('ai-newsletter');
                displayResult(aiNewsletterBlock, data.result, url_string);
            } else if (articleType === 'design') {
                const designNewsletterBlock = document.getElementById('design-newsletter');
                displayResult(designNewsletterBlock, data.result, url_string);
            }

            //displayResult(data.result);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    
    function displayResult(newsletterBlock, data_result, url_string) {
        const mainHead = newsletterBlock.querySelector(".main-heading");
        mainHead.innerHTML = `<a href="${url_string}" target="_blank">${mainHead.textContent}</a>`
        //newsletterBlock.innerHTML = data_result;
        data_result.forEach(article => {
            console.log("Article:", article);
            let newsDiv = document.createElement('div');
            let newsHead = document.createElement('h3');
            let newsContent = document.createElement('div');
            newsDiv.classList.add('news-block');
            newsContent.classList.add('news-content');
            //newsHead.textContent = article.title;

            //let title = article.title;
            const match = article.title.match(/^(.*?)(\s*\(.*\))$/);
            if (match) {
                //newsHead.innerHTML = `${match[1].trim()} <span class="subhead">${match[2].trim()}</span>`;
                newsHead.innerHTML = `<a href="${article.link}" target="_blank">${match[1].trim()} <span class="subhead">${match[2].trim()}</span></a>`;
            } else {
                //newsHead.innerHTML = article.title;
                newsHead.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a>`;
            } 

            if (article.htmlContent) {
                newsContent.innerHTML = article.htmlContent;
            } else {
                newsContent.textContent = article.text;
            }

            newsDiv.appendChild(newsHead);
            newsDiv.appendChild(newsContent);
            newsletterBlock.appendChild(newsDiv);
        });
    }

    function setLoading(isLoading) {
        if (isLoading) {
            loadingElement.classList.remove('hidden');
        } else {
            loadingElement.classList.add('hidden');
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
    document.getElementById('ai-newsletter').innerHTML += `<div class="news-block"><h3>How Ramp built an AI operating system for scalable work (Sponsor)</h3><div class="news-content">Learn how Ramp became one of the most productive companies in the world by adopting a Builder mindset—understanding that work is fundamentally changing and actively building an AI operating system instead of waiting for the perfect tool.<p></p><p>Key takeaways from the story:</p><ul><li>The Builder mindset: Don't wait for AI to get easier—start designing your future work now</li><li>Three steps to scale: Getting precise with AI, centralizing information, and building workflows without engineers</li><li>Real results: 270 features shipped in H1 2025 (more than all of 2024 combined) with 90% of 1,200 employees using Notion AI monthly</li></ul><p>The blog includes a CTA to watch the Make with Notion session with Ben Levik (Ramp's operations and AI product leader)                                                                                    </p></div></div>
    <div class="news-block"><h3><a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" target="_blank">Tools to align AI pricing with value <span class="subhead">(Sponsor)</span></a></h3><div class="news-content">It might seem like everyone is struggling with sustainable monetization for AI, but Metronome works with the companies who have actually figured it out - Anyscale, NVIDIA, Databricks, and many others. Their team has created <a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" rel="noopener noreferrer nofollow" target="_blank">two resources</a> to help you do the same:<p></p><p>1️⃣ <a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" rel="noopener noreferrer nofollow" target="_blank">Self-assessment (5 minutes)</a>: Answer 8 quick questions to discover which pricing model best fits how your customers get value from your product.</p><p>2️⃣ <a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" rel="noopener noreferrer nofollow" target="_blank">The Pricing Experimentation Playbook</a>: This guide can help you test, validate, and optimize your pricing strategy. (Complete the assessment to get the most out of the guide.)</p></div></div>
    <div class="news-block"><h3><a href="https://www.testingcatalog.com/anthropic-testing-new-agentic-tasks-mode-for-claude/?utm_source=tldrai" target="_blank">Anthropic preparing new Agentic Tasks Mode for Claude <span class="subhead">(2 minute read)</span></a></h3><div class="news-content">Anthropic is testing a new interface for tasks in Claude's Agent mode. It is also introducing new modes for research, analysis, writing, and building. The updated interface introduces a toggle that allows users to switch between classic chat and agent modes. Screenshots of the new interface are available in the article.</div></div>
    <div class="news-block"><h3><a href="https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models?utm_source=tldrai" target="_blank">NVIDIA Debuts Nemotron 3 Family of Open Models <span class="subhead">(4 minute read)</span></a></h3><div class="news-content">Nvidia released Nemotron 3 Nano (30B parameters, 3B active) with Super (100B) and Ultra (500B) coming in early 2026, with Nano's benchmark scores rivaling or exceeding closed-source rivals. Nvidia is publishing training data and releasing libraries for agent customization in what appears to be an attempt to undermine OpenAI, Google, and Anthropic, which are increasingly developing their own chips instead of using Nvidia.</div></div>`;

}