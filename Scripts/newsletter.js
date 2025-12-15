
document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    //const aiNewsletter = document.getElementById('ai-newsletter');
    const buttonGroup = document.querySelector('.button-group-two.design-3');
    const buttons = buttonGroup.querySelectorAll('.toggle-button');

    // Global variable to store the article type
    let article_type = 'ai';

    dummyFill();

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


    //TODO: Add link to article to top of page
    //  OR add link to headers to specific article (tldr-ai or tldr-design)
    //const today = new Date().toISOString().split('T')[0];
    //const url_string = "https://tldr.tech/" + article_type + "/" + today;
    //console.log("URL String:", url_string);
    FetchNews("ai");
    FetchNews("design");
    /* extractBtn.addEventListener('click', async function() {
        const today = new Date().toISOString().split('T')[0];
        const url_string = "https://tldr.tech/" + article_type + "/" + today;
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
    }); */

    function displayResult(data_result, newsletterBlock) {
        //newsletterBlock.innerHTML = data_result;
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
            newsletterBlock.appendChild(newsDiv);
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

            if (articleType === 'ai') {
                const aiNewsletterBlock = document.getElementById('ai-newsletter');
                displayResult(data.result, aiNewsletterBlock);
            } else if (articleType === 'design') {
                const designNewsletterBlock = document.getElementById('design-newsletter');
                displayResult(data.result, designNewsletterBlock);
            }

            //displayResult(data.result);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    }
});


function dummyFill() {
    document.getElementById('ai-newsletter').innerHTML += `<div class="news-block"><h3>How Ramp built an AI operating system for scalable work (Sponsor)</h3><div class="news-content">Learn how Ramp became one of the most productive companies in the world by adopting a Builder mindset—understanding that work is fundamentally changing and actively building an AI operating system instead of waiting for the perfect tool.<p></p><p>Key takeaways from the story:</p><ul><li>The Builder mindset: Don't wait for AI to get easier—start designing your future work now</li><li>Three steps to scale: Getting precise with AI, centralizing information, and building workflows without engineers</li><li>Real results: 270 features shipped in H1 2025 (more than all of 2024 combined) with 90% of 1,200 employees using Notion AI monthly</li></ul><p>The blog includes a CTA to watch the Make with Notion session with Ben Levik (Ramp's operations and AI product leader)                                                                                    </p></div></div>
    <div class="news-block"><h3>OpenAI is quietly adopting skills, now available in ChatGPT and Codex CLI (8 minute read)</h3><div class="news-content">Skills support is quietly showing up in OpenAI's Codex CLI tool and ChatGPT. The skills folder can be accessed by prompting, 'Create a zip file of /home/oai/skills'. So far, the skills cover spreadsheets, docx, and PDFs. A link to a repository with a copy of the skills is available in the article.</div></div>`;

}