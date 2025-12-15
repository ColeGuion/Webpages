
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
    
    
    function displayResult(data_result, newsletterBlock) {
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
    
                <div class="news-block">
                    <h3>Disney Signs Deal with OpenAI to Allow Sora to Generate AI Videos Featuring its Characters <span class="subhead">(3 minute read)</span></h3>
                    <div class="news-content">Disney signed a three-year partnership with OpenAI and invested $1 billion, allowing Sora
                        and ChatGPT Images to generate content featuring over 200 characters from Disney, Marvel, Pixar, and Star Wars.
                        Users can create videos and images using iconic characters like Mickey Mouse and Darth Vader, though talent
                        likenesses and voices are excluded from the agreement. Despite previously suing Midjourney and sending
                        cease-and-desist letters to Character.AI over IP violations, Disney will become a major OpenAI customer to build
                        new products.</div>
                </div>
                <div class="news-block">
                    <h3>Instagram Supercharges Creation and Feed Control with new Edits App Features and “Your Algorithm” <span class="subhead">(2 minute read)</span></h3>
                    <div class="news-content">Instagram's Edits app now includes pre-built templates, storyboards, advanced text tools,
                        and an iPhone lock screen widget for instant camera access and quick content capture. The platform is
                        introducing "Your Algorithm" in the US, allowing users to view and modify the topics Instagram uses to curate
                        their Reels feed by adding or removing interests. These updates aim to streamline content creation for creators
                        while giving regular users more control over their algorithmic feeds, with similar Explore page features
                        planned.</div>
                </div>
                <div class="news-block">
                    <h3>With iOS 26.2, Apple lets you roll back Liquid Glass again — this time on the Lock Screen <span class="subhead">(3 minute read)</span></h3>
                    <div class="news-content">Apple's iOS 26.2 adds another control to reduce Liquid Glass transparency—this time for
                        the Lock Screen clock—continuing Apple's rollback via user-controlled settings after complaints that the new
                        glassy UI hurt readability. The update also brings AirDrop codes, Reminders alarms, offline lyrics in Apple
                        Music, AI features in Podcasts, a Sleep Score on Apple Watch, and critical security patches across Apple
                        devices.</div>
                </div>`;

}