
document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const buttonGroup = document.getElementById('BtnGroup');
    //const buttonGroup = document.querySelector('.button-group-two.design-3');
    const buttons = buttonGroup.querySelectorAll('.toggle-button');
    dummyFill();
    //TODO: Fix error management when no website is fetched

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'selected' class from all buttons
            buttons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            this.classList.add('selected');

            let btnType = this.textContent;
            let newsId = `${btnType.toLowerCase()}-newsletter`;
            console.log(`${btnType} button clicked!\nID: "${newsId}"`);

            // Hide all .newsletter elements
            document.querySelectorAll('.newsletter').forEach(el => {
                if (!el.classList.contains('hidden')) {
                    el.classList.add('hidden');
                }
            });
            // Show the right newsletter block
            document.getElementById(newsId).classList.remove('hidden');
        });
    });

    // Load right away
    FetchNews("ai");
    FetchNews("design");
    FetchNews("tech");
    FetchNews("dev");
    FetchNews("data");

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
                body: JSON.stringify({ url: url_string })
            });

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            const data = await response.json();
            console.log("Data received:", data);

            const newsletterBlock = document.getElementById(`${articleType}-newsletter`);
            displayResult(newsletterBlock, data.result, url_string);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    function displayResult(newsletterBlock, data_result, url_string) {
        const mainHead = newsletterBlock.querySelector(".main-heading");
        mainHead.innerHTML = `<a href="${url_string}" target="_blank">${mainHead.textContent}</a>`
        data_result.forEach(article => {
            console.log("Article:", article);
            let newsDiv = document.createElement('div');
            let newsHead = document.createElement('h3');
            let newsContent = document.createElement('div');
            newsDiv.classList.add('news-block');
            newsContent.classList.add('news-content');

            const match = article.title.match(/^(.*?)(\s*\(.*\))$/);
            if (match) {
                newsHead.innerHTML = `<a href="${article.link}" target="_blank">${match[1].trim()} <span class="subhead">${match[2].trim()}</span></a>`;
            } else {
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


function dummyFill1() {
    document.getElementById('ai-newsletter').innerHTML += `<div class="news-block"><h3>How Ramp built an AI operating system for scalable work (Sponsor)</h3><div class="news-content">Learn how Ramp became one of the most productive companies in the world by adopting a Builder mindset—understanding that work is fundamentally changing and actively building an AI operating system instead of waiting for the perfect tool.<p></p><p>Key takeaways from the story:</p><ul><li>The Builder mindset: Don't wait for AI to get easier—start designing your future work now</li><li>Three steps to scale: Getting precise with AI, centralizing information, and building workflows without engineers</li><li>Real results: 270 features shipped in H1 2025 (more than all of 2024 combined) with 90% of 1,200 employees using Notion AI monthly</li></ul><p>The blog includes a CTA to watch the Make with Notion session with Ben Levik (Ramp's operations and AI product leader)                                                                                    </p></div></div>
    <div class="news-block"><h3><a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" target="_blank">Tools to align AI pricing with value <span class="subhead">(Sponsor)</span></a></h3><div class="news-content">It might seem like everyone is struggling with sustainable monetization for AI, but Metronome works with the companies who have actually figured it out - Anyscale, NVIDIA, Databricks, and many others. Their team has created <a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" rel="noopener noreferrer nofollow" target="_blank">two resources</a> to help you do the same:<p></p><p>1️⃣ <a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" rel="noopener noreferrer nofollow" target="_blank">Self-assessment (5 minutes)</a>: Answer 8 quick questions to discover which pricing model best fits how your customers get value from your product.</p><p>2️⃣ <a href="https://metronome.com/quiz?utm_campaign=pricing%20quiz&amp;utm_medium=newsletter&amp;utm_source=tldr-ai&amp;utm_content=" rel="noopener noreferrer nofollow" target="_blank">The Pricing Experimentation Playbook</a>: This guide can help you test, validate, and optimize your pricing strategy. (Complete the assessment to get the most out of the guide.)</p></div></div>
    <div class="news-block"><h3><a href="https://www.testingcatalog.com/anthropic-testing-new-agentic-tasks-mode-for-claude/?utm_source=tldrai" target="_blank">Anthropic preparing new Agentic Tasks Mode for Claude <span class="subhead">(2 minute read)</span></a></h3><div class="news-content">Anthropic is testing a new interface for tasks in Claude's Agent mode. It is also introducing new modes for research, analysis, writing, and building. The updated interface introduces a toggle that allows users to switch between classic chat and agent modes. Screenshots of the new interface are available in the article.</div></div>
    <div class="news-block"><h3><a href="https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models?utm_source=tldrai" target="_blank">NVIDIA Debuts Nemotron 3 Family of Open Models <span class="subhead">(4 minute read)</span></a></h3><div class="news-content">Nvidia released Nemotron 3 Nano (30B parameters, 3B active) with Super (100B) and Ultra (500B) coming in early 2026, with Nano's benchmark scores rivaling or exceeding closed-source rivals. Nvidia is publishing training data and releasing libraries for agent customization in what appears to be an attempt to undermine OpenAI, Google, and Anthropic, which are increasingly developing their own chips instead of using Nvidia.</div></div>`;
}
function dummyFill() {
    // Fill all newsletter sections
    document.getElementById('ai-newsletter').innerHTML = `<h1 class="main-heading"><a href="https://tldr.tech/ai/2025-12-18" target="_blank">TLDR AI</a></h1>
    <div class="news-block">
        <h3><a href="https://www.warp.dev/agents?utm_source=publications&amp;utm_medium=newsletter&amp;utm_campaign=agents_announcement_11_18_primary&amp;utm_content=tldr_ai"
                target="_blank">⚡️ Warp's big Agents update catapults it to #1 on Terminal-Bench <span
                    class="subhead">(Sponsor)</span></a></h3>
        <div class="news-content">Warp just launched its biggest Agents update yet, propelling it to<a
                href="https://www.warp.dev/agents?utm_source=publications&amp;utm_medium=newsletter&amp;utm_campaign=agents_announcement_11_18_primary&amp;utm_content=tldr_ai"
                rel="noopener noreferrer nofollow" target="_blank"> #1 on Terminal-Bench and #5 on SWE-bench
                Verified</a>, ahead of Claude Code and Codex CLI.<p></p>
            <p>Warp's #1 Agent now includes:</p>
            <p>✅ Full terminal use: agents can interact with long-running commands like servers, debuggers, and more.
            </p>
            <p>✅ Steerable planning: review and edit plans as agents work to stop them going off the rails.</p>
            <p>✅ Full lifecycle: planning → coding → deployment</p>
            <p>With over 700K users and 56% of the Fortune 500 on board, <a
                    href="https://www.warp.dev/agents?utm_source=publications&amp;utm_medium=newsletter&amp;utm_campaign=agents_announcement_11_18_primary&amp;utm_content=tldr_ai"
                    rel="noopener noreferrer nofollow" target="_blank">Warp</a> is emerging as the platform of choice
                for developers.</p>
            <p><a href="https://www.warp.dev/agents?utm_source=publications&amp;utm_medium=newsletter&amp;utm_campaign=agents_announcement_11_18_primary&amp;utm_content=tldr_ai"
                    rel="noopener noreferrer nofollow" target="_blank">Try the world's best coding agent, free →</a></p>
        </div>
    </div>
    <div class="news-block">
        <h3><a href="https://blog.google/products/gemini/gemini-3-flash/?utm_source=tldrai" target="_blank">Gemini 3
                Flash <span class="subhead">(7 minute read)</span></a></h3>
        <div class="news-content">Google has introduced Gemini 3 Flash, a fast, lightweight model designed to deliver
            frontier-level intelligence with lower latency. It's built to help users quickly learn, plan, and build
            across a range of everyday tasks and applications.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.reuters.com/business/google-works-erode-nvidias-software-advantage-with-metas-help-2025-12-17/?utm_source=tldrai"
                target="_blank">Google works to erode Nvidia's software advantage with Meta's help <span
                    class="subhead">(7 minute read)</span></a></h3>
        <div class="news-content">Google and Meta are working together on a new initiative to make Google's Tensor
            Processing Units better at running PyTorch. The move is aimed at weakening Nvidia's longstanding dominance
            in the AI computing market. TorchTPU will remove a key barrier that has slowed the adoption of TPU chips. It
            will make existing infrastructure built using PyTorch software fully compatible with TPUs. Google is
            considering open-sourcing parts of the software to speed uptake.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://x.ai/news/grok-voice-agent-api?utm_source=tldrai" target="_blank">Grok Voice Agent API
                <span class="subhead">(4 minute read)</span></a></h3>
        <div class="news-content">xAI has opened up the voice stack powering Grok in Tesla vehicles to all developers.
            The API ranks #1 on Big Bench Audio with sub-1-second time-to-first-audio at $0.05 per minute (half the cost
            of OpenAI's Realtime API).</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.caseyaccidental.com/p/when-agents-attack-how-ai-collapses?utm_source=tldrai"
                target="_blank">When Agents Attack: How AI Collapses and Rebuilds Marketplace Moats <span
                    class="subhead">(11 minute read)</span></a></h3>
        <div class="news-content">AI agents, like those launched by OpenAI, threaten marketplace moats by taking over
            discovery, transactions, and supply workflows, thus collapsing traditional marketing funnels. Marketplaces
            must adapt by optimizing brand experiences, personalizing interactions, and integrating supply to maintain
            value. Founders should focus on high-frequency markets, fortify customer connections, and explore new
            monetization strategies like subscriptions or data licensing to stay competitive.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://danfu.org/notes/agi/?utm_source=tldrai" target="_blank">Yes, AGI Can Happen – A
                Computational Perspective <span class="subhead">(5 minute read)</span></a></h3>
        <div class="news-content">Current models vastly underutilize hardware: DeepSeek-V3 and Llama-4 achieve only ~20%
            FLOP utilization during training, and inference runs at single-digit utilization because autoregressive
            models are bottlenecked on loading weights from memory, not compute. Models we see today are also lagging
            indicators, trained on last-gen hardware that's unoptimized for the massive size of modern clusters and the
            latest training methods.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.wsj.com/finance/stocks/the-squishy-number-behind-the-rise-and-fall-of-oracles-stock-45461595?st=w2yMUG&amp;reflink=desktopwebshare_permalink&amp;utm_source=tldrai"
                target="_blank">The Squishy Number Behind the Rise and Fall of Oracle's Stock <span class="subhead">(6
                    minute read)</span></a></h3>
        <div class="news-content">Oracle is down 43% from its September high despite reporting $523 billion in
            "remaining performance obligations". About $300 billion of that comes from a five-year OpenAI contract, but
            analysts are skeptical that OpenAI, which only has ~$20B in annualized revenue, will be able to pay.
            Nvidia's stalled $100 billion OpenAI investment (announced in September but still unsigned) compounds the
            anxiety over the circular deals plaguing AI infrastructure.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://about.you.com/ai-use-cases?utm_campaign=29264642-TLDR%20AI%20Q4&amp;utm_source=external-newsletter&amp;utm_medium=email&amp;utm_term=tldrai_secondary_1218&amp;utm_content=tldrai_secondary_1218"
                target="_blank">Find out how to make every AI investment count <span
                    class="subhead">(Sponsor)</span></a></h3>
        <div class="news-content">AI is all the rage, but are you really using it to your advantage? <a
                href="https://about.you.com/ai-use-cases?utm_campaign=29264642-TLDR%20AI%20Q4&amp;utm_source=external-newsletter&amp;utm_medium=email&amp;utm_term=tldrai_secondary_1218&amp;utm_content=tldrai_secondary_1218"
                rel="noopener noreferrer nofollow" target="_blank">This practical guide from You.com</a> guides you
            through the process of identifying and prioritizing opportunities where AI can best serve your org. Explore
            where AI can drive the most impact in your organization, both internally and externally. <p></p>
            <p><a href="https://about.you.com/ai-use-cases?utm_campaign=29264642-TLDR%20AI%20Q4&amp;utm_source=external-newsletter&amp;utm_medium=email&amp;utm_term=tldrai_secondary_1218&amp;utm_content=tldrai_secondary_1218"
                    rel="noopener noreferrer nofollow" target="_blank">Learn more with this AI Use Case Discovery
                    Guide.</a></p>
        </div>
    </div>
    <div class="news-block">
        <h3><a href="https://github.com/resemble-ai/chatterbox?utm_source=tldrai" target="_blank">Chatterbox <span
                    class="subhead">(GitHub Repo)</span></a></h3>
        <div class="news-content">Chatterbox is an open-source state-of-the-art text-to-speech (TTS) model with
            multilingual support, emotion control, and zero-shot voice cloning.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://blog.google/technology/google-labs/mini-apps-opal-gemini-app-experiment/?utm_source=tldrai"
                target="_blank">Build interactive mini apps with Opal in the Gemini app <span class="subhead">(1 minute
                    read)</span></a></h3>
        <div class="news-content">Opal is a tool for building AI-powered mini apps. It is now directly available in the
            Gemini web app. Users can use it to create experimental Gems to unlock even more customized Gemini
            experiences. The tool can be found in the Gems manager.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/?utm_source=tldrai" target="_blank">What
                Actually Is Claude Code's Plan Mode? <span class="subhead">(11 minute read)</span></a></h3>
        <div class="news-content">Plan mode is a feature in Claude Code that pauses execution until users approve of a
            plan. A plan in Claude Code is a markdown file written into Claude's plans folder by Claude in plan mode.
            Users can review and edit the plan before Claude executes whatever task it needs to. The tool brings in more
            complexity into the user interface, taking away some of the magic. It replicates something that natural
            language can already do, making the user experience a little less natural.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.theregister.com/2025/12/17/jassy_taps_peter_desantis_to_run_agi/?utm_source=tldrai"
                target="_blank">Jassy taps 27-year Amazon veteran to run AGI org, which is now definitely a thing that
                exists <span class="subhead">(4 minute read)</span></a></h3>
        <div class="news-content">Peter DeSantis, SVP of Utility Computing at AWS, is taking two of his teams from AWS
            and putting them into a unit called 'AGI'. The unit will report directly to Andy Jassy, Amazon's Lead
            Product Market for GenAI and CEO. AI and AI-related compute is now an all-Amazon thing, not just an AWS
            thing. The unit is building things that are so important that Amazon is taking one of its most senior AWS
            leaders and putting him in charge of all of it.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.reuters.com/world/china/how-china-built-its-manhattan-project-rival-west-ai-chips-2025-12-17/?utm_source=tldrai"
                target="_blank">Inside China's 'Manhattan Project' to Rival the West in AI Chips <span
                    class="subhead">(8 minute read)</span></a></h3>
        <div class="news-content">Chinese scientists have built a working prototype of an EUV lithography machine, the
            $250 million tool that only ASML knows how to make and which the US has blocked from being sold to China
            since 2018. A team of former ASML engineers reverse-engineered the machines in a high-security Shenzhen lab,
            with recruits given fake IDs and signing bonuses up to $700,000. The prototype hasn't yet produced working
            chips, but sources expect it will by 2028-2030.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://ngrok.com/blog/prompt-caching?utm_source=tldrai&amp;utm_medium=paid-community&amp;utm_campaign=aigateway-fy26q4-evergreen&amp;utm_content=blog_prompt-caching"
                target="_blank">Do you know what a cached prompt or cached token really is? Ngrok guide <span
                    class="subhead">(Sponsor)</span></a></h3>
        <div class="news-content">Cached prompts are 10x cheaper and 85% faster. What actually gets cached isn't the
            response, but the K and V matrices from the attention mechanism. <a
                href="https://ngrok.com/blog/prompt-caching?utm_source=tldrai&amp;utm_medium=paid-community&amp;utm_campaign=aigateway-fy26q4-evergreen&amp;utm_content=blog_prompt-caching"
                rel="noopener noreferrer nofollow" target="_blank">See the exact math from ngrok</a></div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.reuters.com/world/india/with-freebies-openai-google-vie-indian-users-training-data-2025-12-17/?utm_source=tldrai"
                target="_blank">With freebies, OpenAI, Google vie for Indian users and training data <span
                    class="subhead">(3 minute read)</span></a></h3>
        <div class="news-content">ChatGPT's daily active users in India surged 600% year-on-year to 73 million, more
            than double its US base, after OpenAI made its Go plan free for a year.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.cnbc.com/2025/12/16/openai-in-talks-with-amazon-about-investment-could-top-10-billion.html?utm_source=tldrai"
                target="_blank">OpenAI in talks with Amazon about investment that could exceed $10 billion <span
                    class="subhead">(2 minute read)</span></a></h3>
        <div class="news-content">In another circular deal, OpenAI is looking for a $10 billion investment from Amazon
            alongside an agreement to use AWS' Trainium chips.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.testingcatalog.com/icymi-opera-launches-neon-browser-globally/?utm_source=tldrai"
                target="_blank">Opera launches Neon browser globally with paid early access <span class="subhead">(2
                    minute read)</span></a></h3>
        <div class="news-content">Opera has globally launched its Neon browser with paid early access at $19.90/month,
            targeting AI power users.</div>
    </div>`;
    document.getElementById('design-newsletter').innerHTML = `<h1 class="main-heading"><a href="https://tldr.tech/design/2025-12-18" target="_blank">TLDR Design</a></h1>
<div class="news-block">
    <h3><a href="https://framer.link/TLDR" target="_blank">Design, build, and publish a beautiful site in hours.
            It's free for your first year <span class="subhead">(Sponsor)</span></a></h3>
    <div class="news-content">First impressions matter. On <a href="https://framer.link/TLDR"
            rel="noopener noreferrer nofollow" target="_blank">Framer</a>, you can build a production-ready website
        in hours - and if you're an early-stage startup, you can join hundreds of YC-backed companies and <a
            href="https://framer.link/TLDR" rel="noopener noreferrer nofollow" target="_blank">get Framer FREE for
            your first year</a>.<p></p>
        <p>Here's what you can expect:</p>
        <ul>
            <li>No code, no delays: Launch a polished site in hours, not weeks, without committing developers.</li>
            <li>Built to grow: Scale your site from MVP to full product with CMS, analytics, and AI localization.
            </li>
            <li>Stay in control: Test ideas, publish instantly, and keep your site fresh without waiting.</li>
        </ul>
        <p>👉 <a href="https://framer.link/TLDR" rel="noopener noreferrer nofollow" target="_blank">Apply to claim
                your free year →</a></p>
        <p>(Pre-seed and seed-stage startups, new to Framer.)</p>
    </div>
</div>
<div class="news-block">
    <h3><a href="https://www.creativebloq.com/design/logos-icons/new-bmw-logo-sparks-debate-as-first-irl-photos-appear-online?utm_source=tldrdesign"
            target="_blank">New BMW logo sparks debate as first IRL photos appear online <span class="subhead">(3
                minute read)</span></a></h3>
    <div class="news-content">BMW has quietly refined its logo, making it flatter and more minimal by removing
        chrome from the inner circle and flag while keeping a matte black outer rim, signalling a subtle
        modernisation rather than a full redesign. Reactions are mixed: some fans welcome the restrained update,
        while others feel any change risks diluting the brand's heritage, highlighting the delicate balance of
        evolving an iconic identity.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.findarticles.com/pixel-search-bar-changes-to-a-more-generic-google-ui/?utm_source=tldrdesign"
            target="_blank">Pixel search bar changes to a more generic Google UI <span class="subhead">(5 minute
                read)</span></a></h3>
    <div class="news-content">Google has replaced Pixel's distinctive on-device search overlay with the standard
        Google app search, prioritising web and AI (Gemini) results and making Pixel search feel more generic and
        less tightly integrated with the launcher. While this aligns with Google's AI-first strategy and simplifies
        access to AI Mode, it weakens Pixel's unique identity and slows everyday local search for users who valued
        speed and cohesion.</div>
</div>
<div class="news-block">
    <h3><a href="https://siliconangle.com/2025/12/16/openai-launches-new-gpt-image-1-5-model-optimized-image-editing/?utm_source=tldrdesign"
            target="_blank">OpenAI Launches New GPT Image 1.5 Model Optimized for Image Editing <span class="subhead">(3
                minute read)</span></a></h3>
    <div class="news-content">OpenAI's GPT Image 1.5 is a new AI model for image generation that offers 20% lower
        API pricing and generates images up to 4x faster than its predecessor. The model excels at preserving
        important details during edits, handling multi-step modifications, and rendering small dense text for tasks
        like infographics. GPT Image 1.5 is accessible through ChatGPT's interface with pre-configured filters and
        via API for developers. It has limitations with certain drawing styles and scientifically complex images.
    </div>
</div>
<div class="news-block">
    <h3><a href="https://www.figma.com/blog/prototypes-are-the-new-prds/?utm_source=tldrdesign"
            target="_blank">Prototypes are the New PRDs <span class="subhead">(12 minute read)</span></a></h3>
    <div class="news-content">Product managers at Figma are increasingly using Figma Make to create interactive
        prototypes instead of traditional PRDs, enabling faster exploration and more precise team alignment. The
        tool helps PMs validate concepts through user testing, communicate nuanced product behaviors, and make
        decisions by showing rather than describing features. By building working prototypes early, teams
        pressure-test assumptions, gather stakeholder buy-in, and create detailed specifications that engineers can
        use as development foundations.</div>
</div>
<div class="news-block">
    <h3><a href="https://blog.tubikstudio.com/the-anatomy-of-a-good-design-review/?utm_source=tldrdesign"
            target="_blank">The Anatomy of a Good Design Review <span class="subhead">(3 minute read)</span></a>
    </h3>
    <div class="news-content">A good design review examines whether an interface guides users effectively through a
        clear visual hierarchy, adherence to accessibility standards, and brand consistency. The process varies by
        stage—sketches need questions, prototypes need structure checks, and launched products require comprehensive
        analysis across product, structure, flow, and screen levels. Reviews focus on real user behavior,
        identifying where people hesitate or get confused, with annotated findings in Figma that tie recommendations
        to research and principles.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.loop11.com/why-dark-mode-isnt-always-the-best-choice-a-ux-perspective/?utm_source=tldrdesign"
            target="_blank">Why Dark Mode Isn't Always the Best Choice: A UX Perspective <span class="subhead">(6
                minute read)</span></a></h3>
    <div class="news-content">Dark mode has become a popular design trend, but it's not a universal UX solution and
        can actually weaken readability, increase cognitive load, and create accessibility challenges when misused.
        While dark mode works well in low-light environments and for creative or entertainment applications, it
        struggles in bright settings, with text-heavy content, and for users with astigmatism or low vision due to
        contrast issues and halation effects. The most effective UX strategy is to offer both light and dark modes
        based on user context, not forcing dark mode everywhere simply because it looks modern.</div>
</div>
<div class="news-block">
    <h3><a href="https://pageai.pro/?utm_source=tldrdesign" target="_blank">Design and Code Your Landing Page in
            Minutes <span class="subhead">(Website)</span></a></h3>
    <div class="news-content">Get a production-ready website from a single prompt. Customize it with a click, then
        download or deploy anywhere.</div>
</div>
<div class="news-block">
    <h3><a href="https://stickertop.art/?utm_source=tldrdesign" target="_blank">Laptop Sticker Art <span
                class="subhead">(Website)</span></a></h3>
    <div class="news-content">Discover a unique collection of laptops adorned with creative stickers from around the
        world.</div>
</div>
<div class="news-block">
    <h3><a href="https://imaginex.video/?utm_source=tldrdesign" target="_blank">Create Viral Content that Gets
            Noticed <span class="subhead">(Website)</span></a></h3>
    <div class="news-content">ImagineX is a professional AI video and image generator built for modern creators. It
        lets users produce engaging content faster than ever before.</div>
</div>
<div class="news-block">
    <h3><a href="https://designyoutrust.com/2025/12/finnish-illustrator-creates-dream-like-forest-worlds-with-watercolour-ink-and-starlight-turning-nordic-folklore-into-soft-escapist-magic/?utm_source=tldrdesign"
            target="_blank">Finnish Illustrator Creates Dream‑like Forest Turning Nordic Folklore Into Soft,
            Escapist Magic <span class="subhead">(1 minute read)</span></a></h3>
    <div class="news-content">Ulla Thynell, a Finnish artist near Helsinki, crafts dreamy fantasy imagery inspired
        by forests, folklore, and Nordic mythology using watercolour, ink, and coloured pencils. Dense woods, starry
        skies, foxes and unicorns emerge in soft, layered colours that transport viewers into quiet, escapist
        worlds. Her traditional drawings, enhanced with digital touches, appear in art books, calendars, and
        children's titles.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.designweek.co.uk/morson-combines-19-brands-into-four-in-fundamental-reshaping/?utm_source=tldrdesign"
            target="_blank">Morson combines 19 brands into four in “fundamental reshaping” <span class="subhead">(5
                minute read)</span></a></h3>
    <div class="news-content">The Morson Group has streamlined its 19 brands into four clear business units—Praxis
        (technical consultancy), Edge (recruitment), Vital (expert project teams), and Nexus (training)—to simplify
        messaging and strengthen cross-selling. Alongside this restructure, the company introduced a modern visual
        and verbal identity with a bold colour palette, 45-degree design elements, geometric typography, and a more
        human-focused art direction, guided by the principle of being “uncommonly clever,” which has been well
        received internally and externally.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.creativeboom.com/tips/how-to-recover-when-creative-burnout-strikes/?utm_source=tldrdesign"
            target="_blank">How to recover when creative burnout strikes <span class="subhead">(7 minute
                read)</span></a></h3>
    <div class="news-content">Burnout is widespread, reversible, and not a personal failure. Recovery comes from
        acknowledging it, ruling out health issues, resting without guilt, and making gentle changes—like stepping
        away, switching mediums, learning something new, or reducing pressure—until creative energy slowly returns.
    </div>
</div>
<div class="news-block">
    <h3><a href="https://worldbranddesign.com/innocent-super-smoothies-redesign-by-derekeric/?utm_source=tldrdesign"
            target="_blank">Innocent Super Smoothies Redesign by Derek&amp;Eric <span class="subhead">(3 minute
                read)</span></a></h3>
    <div class="news-content">The refreshed Super Smoothies identity restores Innocent's iconic simplicity.</div>
</div>
<div class="news-block">
    <h3><a href="https://graphicdesignjunction.com/2025/12/2026-graphic-design-trends/?utm_source=tldrdesign"
            target="_blank">10 Top Graphic Design Trends for 2026 <span class="subhead">(8 minute read)</span></a>
    </h3>
    <div class="news-content">Some of the key graphic design trends emerging in 2026 include manually adjusted
        typography, raw mixed-media assemblages, and AI-assisted but selectively edited work.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.creativereview.co.uk/movie-posters-of-the-year-2025/?utm_source=tldrdesign"
            target="_blank">The Best Movie Posters of the Year 2025 <span class="subhead">(4 minute read)</span></a>
    </h3>
    <div class="news-content">The most creative 2025 movie posters work comes from lower-budget films without
        recognizable IP rather than big franchise releases.</div>
</div>`;
    document.getElementById('tech-newsletter').innerHTML = `<h1 class="main-heading"><a href="https://tldr.tech/tech/2025-12-18" target="_blank">TLDR Tech</a></h1>
<div class="news-block">
    <h3><a href="https://ref.wisprflow.ai/tldr" target="_blank">The AI voice tool that helps you move faster
            everywhere <span class="subhead">(Sponsor)</span></a></h3>
    <div class="news-content">For 150 years, we've been stuck typing. <a href="https://ref.wisprflow.ai/tldr"
            rel="noopener noreferrer nofollow" target="_blank">Wispr Flow</a> ends that era.<p></p>
        <p>It turns your voice into clean, perfectly formatted writing the moment you stop speaking — in Slack,
            Notion, Gmail, ChatGPT, or anywhere you already work.</p>
        <p><a href="https://ref.wisprflow.ai/tldr" rel="noopener noreferrer nofollow" target="_blank">Flow learns
                your phrasing</a>, edits as you speak, and helps you move 4× faster across every app — from
            enhancing GPT prompts to capturing ideas or writing docs in seconds.</p>
        <p>It's how builders, founders, and vibe coders stay in flow all day.</p>
        <p>Less typing. More creating.</p>
        <p><a href="https://ref.wisprflow.ai/tldr" rel="noopener noreferrer nofollow" target="_blank">Try Wispr Flow
                for free →</a></p>
    </div>
</div>
<div class="news-block">
    <h3><a href="https://arstechnica.com/google/2025/12/google-releases-gemini-3-flash-promising-improved-intelligence-and-efficiency/?utm_source=tldrnewsletter"
            target="_blank">Google releases Gemini 3 Flash, promising improved intelligence and efficiency <span
                class="subhead">(4 minute read)</span></a></h3>
    <div class="news-content">Gemini 3 Flash is coming to the Gemini app, Search, the Gemini API, Vertex AI, AI
        Studio, and Antigravity. It offers better performance than Gemini 2.5 Pro while running workloads three
        times faster. Gemini 3 Flash will become the new default model in the Gemini and web interface. Google will
        be adjusting the free limits for Gemini 3 Pro, but it has yet to specify what the changes will be.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.testingcatalog.com/openai-opens-chatgpt-to-third-party-apps-after-review-process/?utm_source=tldrnewsletter"
            target="_blank">OpenAI opens ChatGPT to third-party apps after review process <span class="subhead">(1
                minute read)</span></a></h3>
    <div class="news-content">OpenAI has opened submissions for third-party apps inside ChatGPT. Developers can
        publish their tools directly to the platform following a review process. Apps will be positioned alongside
        existing built-in tools. The rollout is global. Monetization details have not been fully outlined yet.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.corememory.com/p/exclusive-connectome-pioneer-sebastian-seuing-memazing?utm_source=tldrnewsletter"
            target="_blank">Connectome Pioneer Sebastian Seung Is Building A Digital Brain <span class="subhead">(9
                minute read)</span></a></h3>
    <div class="news-content">Sebastian Seung, a neuroscience and computer science professor at Princeton
        University, was one of the researchers who helped create the first complete wiring diagram of a fly's brain.
        He has created a startup called Memazing to create the technology needed to reverse engineer the fly brain
        (and eventually more complex organisms) and create full recreations of the brain in software. The company's
        goal is to use an existing map of how nature has produced intelligence to create a new form of artificial
        intelligence. The startup is still in a very early stage and is in the process of raising funds, but the
        team has already begun work on the fly brain emulation and has started connecting a model to a simple
        robotics system.</div>
</div>
<div class="news-block">
    <h3><a href="https://arstechnica.com/space/2025/12/nasa-finally-and-we-really-do-mean-it-this-time-has-a-full-time-leader/?utm_source=tldrnewsletter"
            target="_blank">NASA finally—and we really do mean it this time—has a full-time leader <span
                class="subhead">(5 minute read)</span></a></h3>
    <div class="news-content">Jared Isaacman, at 42 years old, is the youngest person to lead NASA. The agency has
        faced an extraordinarily difficult year. About 20% of the agency employees took buyouts or early retirements
        thanks to the Department of Government Efficiency. NASA is locked into a high-stakes race with China to
        return humans to the Moon, but the agency has to deal with an administration that sought to cut its budget
        by 24%.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.semrush.com/lp/tldr-offer/en/?utm_source=tldr_marketing&amp;utm_medium=email&amp;utm_campaign=tldr_secondary_1218"
            target="_blank">TLDR readers: Save 30% on Semrush's LLM + SEO offering when you sign up by NYE <span
                class="subhead">(Sponsor)</span></a></h3>
    <div class="news-content">213M+ AI prompts. 27.6B+ keywords. 17 years of search leadership. <a
            href="https://www.semrush.com/lp/tldr-offer/en/?utm_source=tldr_marketing&amp;utm_medium=email&amp;utm_campaign=tldr_secondary_1218"
            rel="noopener noreferrer nofollow" target="_blank">Semrush One</a> is built to give you total coverage
        of AI &amp; SEO visibility in 2026. When you sign up by the end of 2025, you get 30% off an annual
        subscription. Claim your savings and <a
            href="https://www.semrush.com/lp/tldr-offer/en/?utm_source=tldr_marketing&amp;utm_medium=email&amp;utm_campaign=tldr_secondary_1218"
            rel="noopener noreferrer nofollow" target="_blank">make 2026 the year you win every search</a></div>
</div>
<div class="news-block">
    <h3><a href="https://survey.stackoverflow.co/2025/technology/?utm_source=tldrnewsletter" target="_blank">2025
            Stack Overflow Developer Survey <span class="subhead">(17 minute read)</span></a></h3>
    <div class="news-content">Stack Overflow Developer Survey looks at the tools and technologies developers are
        currently using and the ones they want to use. This year's survey included questions about embedded
        technology tools and industry-sourced, community-vetted technology options. Python's adoption has
        accelerated significantly due to its ability to be the go-to language for AI, data science, and back-end
        development. Redis saw significant growth in usage, demonstrating the need for high-speed, in-memory caching
        and data structures. Docker is now a near-universal tool for cloud development. AI-enabled IDEs weren't able
        to topple the dominance of Visual Studio and Visual Studio Code - both have maintained the top spots for
        four years.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.greptile.com/state-of-ai-coding-2025?utm_source=tldrnewsletter" target="_blank">The
            State of AI Coding 2025 <span class="subhead">(10 minute read)</span></a></h3>
    <div class="news-content">Greptile's State of AI Coding report is a cross-industry study on recent trends in AI
        software development. It covers productivity gain across development workflows, AI tool adoption, model
        growth trends, performance across latency, cost, and tokenization, and recent papers on foundational models
        and applications. Code output has increased across teams. OpenAI is still the leading model provider, but
        the gap is closing.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.bloomberg.com/news/articles/2025-12-18/openai-discussed-funding-at-750-billion-value-information-says?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb3VyY2UiOiJTdWJzY3JpYmVyR2lmdGVkQXJ0aWNsZSIsImlhdCI6MTc2NjAzMjc0MywiZXhwIjoxNzY2NjM3NTQzLCJhcnRpY2xlSWQiOiJUN0ZWTVFUOTZPU08wMCIsImJjb25uZWN0SWQiOiJCMzZENUE5QzIxMDQ0NjU4OTFBMTc1MTVDRDNBQkZFNiJ9.C9vuzBGTMa-1rfetuigmk91WXmNi0dtULrSenZTKSqk&amp;utm_source=tldrnewsletter"
            target="_blank">OpenAI Discussed Funding at $750 Billion Value <span class="subhead">(1 minute
                read)</span></a></h3>
    <div class="news-content">OpenAI has held preliminary funding talks with investors to raise tens of billions of
        dollars at a valuation of $750 billion. The yet-to-be-profitable startup plans to spend trillions on
        infrastructure to support the development of AI technology. It has raised billions in recent years at
        ever-larger valuations. The startup was most recently valued at $500 billion in the fall.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.cnbc.com/2025/12/17/youtube-stream-oscars-2029.html?utm_source=tldrnewsletter"
            target="_blank">The Oscars are heading to YouTube in 2029 <span class="subhead">(2 minute
                read)</span></a></h3>
    <div class="news-content">The 101st Academy Awards will be hosted on YouTube starting in 2029 through 2033. The
        Academy of Motion Picture Arts and Sciences has signed an exclusive rights deal with YouTube that includes
        red carpet coverage, behind-the-scenes content, and access to the Governors Ball. The coverage of the
        Academy Awards will be available to YouTube TV subscribers in the US and for free on YouTube for viewers
        around the world.</div>
</div>
<div class="news-block">
    <h3><a href="https://advertise.tldr.tech/?utm_source=tldr&amp;utm_medium=newsletter&amp;utm_campaign=quicklinks12182025"
            target="_blank">Reach real buyers in TLDR instead of fighting for attention on social <span
                class="subhead">(Sponsor)</span></a></h3>
    <div class="news-content">TLDR puts you in front of 6+ million tech professionals with almost no competition. <a
            href="https://advertise.tldr.tech/?utm_source=tldr&amp;utm_medium=newsletter&amp;utm_campaign=quicklinks12182025"
            rel="noopener noreferrer nofollow" target="_blank">Learn more</a> about running a test campaign.</div>
</div>
<div class="news-block">
    <h3><a href="https://sherwood.news/tech/google-is-reportedly-working-with-meta-to-expand-software-support-for-its-ai/?utm_source=tldrnewsletter"
            target="_blank">Google is reportedly working with Meta to expand software support for its AI chips <span
                class="subhead">(1 minute read)</span></a></h3>
    <div class="news-content">Google is working with Meta on TorchTPU, a project that aims to make it easier for AI
        developers who use PyTorch to switch the hardware layer to Google's tensor processing units.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.understandingai.org/p/waymo-and-teslas-self-driving-systems?utm_source=tldrnewsletter"
            target="_blank">Waymo and Tesla's self-driving systems are more similar than people think <span
                class="subhead">(15 minute read)</span></a></h3>
    <div class="news-content">This post explains how Waymo's technology works and why it's more similar to Wayve and
        Tesla's technology than many people think.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.cnbc.com/2025/12/17/coinbase-prediction-markets-stock-trading-stablecoins.html?utm_source=tldrnewsletter"
            target="_blank">Coinbase adds prediction markets and stock trading in push to be one-stop trading app
            <span class="subhead">(7 minute read)</span></a></h3>
    <div class="news-content">Coinbase's CEO, Brian Armstrong, wants to make the platform a place to trade
        everything.</div>
</div>
<div class="news-block">
    <h3><a href="https://infosec.press/brunomiguel/is-mozilla-trying-hard-to-kill-itself?utm_source=tldrnewsletter"
            target="_blank">📝 Is Mozilla trying hard to kill itself? <span class="subhead">(3 minute
                read)</span></a></h3>
    <div class="news-content">Mozilla's new CEO has hinted that axing ad blockers is something that was considered
        due to the profit it would bring.</div>
</div>
<div class="news-block">
    <h3><a href="https://world.hey.com/bb/new-product-mode-48a43806?utm_source=tldrnewsletter" target="_blank">New
            product mode <span class="subhead">(6 minute read)</span></a></h3>
    <div class="news-content">New product mode is optimizing for optionality and speed without too much planning or
        commitment when building something new.</div>
</div>
<div class="news-block">
    <h3><a href="https://docs.google.com/document/d/1S7nazV5nKmYYkzxhmf3G-Ftb3DPAjV5Migokw3u8BsQ/edit?tab=t.0&amp;utm_source=tldrnewsletter"
            target="_blank">Paying $3 for a Dollar: The Rational Irrationality of Venture Capital <span
                class="subhead">(6 minute read)</span></a></h3>
    <div class="news-content">VCs are forced to chase momentum against their better judgment, and once they enter
        the game, they are structurally unable to stop bidding.</div>
</div>`;
    document.getElementById('dev-newsletter').innerHTML = `<h1 class="main-heading"><a href="https://tldr.tech/dev/2025-12-18" target="_blank">TLDR Dev</a></h1>
<div class="news-block">
    <h3><a href="https://zencoder.ai/e3t/Ctc/JA+23284/d5qd4C04/Jk82-6qcW5BW0B06lZ3pMW5Gxwcy64MpQlW7DMt3g8M6FWLN516Mrg2yvMCW8WsJLJ31VG4tW7zWBhf8FfCF2W1mQB8Q7vyYvHW3Bj6YX1YrL2NW7tVl9D3wlC7JW95cJPg77NJc1W1G1Tb95ltVHhN534HVqNhSnLN1mN5b1RmtwXW4r8CrW1KD4clW3h4H5v7sV6DmVrbgxd7BqDSZW2RFxsP2x1YyBW4p8YB55w0tYwMf3Wd3z3yQCdhLHtl04"
            target="_blank">Struggling to ship AI? Go from random prompts to an audit-based, spec-driven workflow
            <span class="subhead">(Sponsor)</span></a></h3>
    <div class="news-content">Shifting requirements slowing your AI production cadence? <a
            href="https://zencoder.ai/e3t/Ctc/JA+23284/d5qd4C04/Jk82-6qcW5BW0B06lZ3pMW5Gxwcy64MpQlW7DMt3g8M6FWLN516Mrg2yvMCW8WsJLJ31VG4tW7zWBhf8FfCF2W1mQB8Q7vyYvHW3Bj6YX1YrL2NW7tVl9D3wlC7JW95cJPg77NJc1W1G1Tb95ltVHhN534HVqNhSnLN1mN5b1RmtwXW4r8CrW1KD4clW3h4H5v7sV6DmVrbgxd7BqDSZW2RFxsP2x1YyBW4p8YB55w0tYwMf3Wd3z3yQCdhLHtl04"
            rel="noopener noreferrer nofollow" target="_blank">Zenflow</a> (by Zencoder) is an orchestration
        platform grounded in well-defined specs, built-in verification, and parallel execution. <p></p>
        <p>Here's how it works:</p>
        <p>1️⃣ Tell Zenflow what to build and choose a template or custom pattern that fits your business.</p>
        <p>2️⃣ <a
                href="https://zencoder.ai/e3t/Ctc/JA+23284/d5qd4C04/Jk82-6qcW5BW0B06lZ3pMW5Gxwcy64MpQlW7DMt3g8M6FWLN516Mrg2yvMCW8WsJLJ31VG4tW7zWBhf8FfCF2W1mQB8Q7vyYvHW3Bj6YX1YrL2NW7tVl9D3wlC7JW95cJPg77NJc1W1G1Tb95ltVHhN534HVqNhSnLN1mN5b1RmtwXW4r8CrW1KD4clW3h4H5v7sV6DmVrbgxd7BqDSZW2RFxsP2x1YyBW4p8YB55w0tYwMf3Wd3z3yQCdhLHtl04"
                rel="noopener noreferrer nofollow" target="_blank">Zenflow's agents</a> execute, verify, and review
            to catch issues.</p>
        <p>3️⃣ Review and ship verified, production-ready code.</p>
        <p>Teams use Zenflow to eliminate rework, reduce regressions, and ship complex AI features far faster.</p>
        <p><a href="https://zencoder.ai/e3t/Ctc/JA+23284/d5qd4C04/Jk82-6qcW5BW0B06lZ3pMW5Gxwcy64MpQlW7DMt3g8M6FWLN516Mrg2yvMCW8WsJLJ31VG4tW7zWBhf8FfCF2W1mQB8Q7vyYvHW3Bj6YX1YrL2NW7tVl9D3wlC7JW95cJPg77NJc1W1G1Tb95ltVHhN534HVqNhSnLN1mN5b1RmtwXW4r8CrW1KD4clW3h4H5v7sV6DmVrbgxd7BqDSZW2RFxsP2x1YyBW4p8YB55w0tYwMf3Wd3z3yQCdhLHtl04"
                rel="noopener noreferrer nofollow" target="_blank">See the power of spec-driven AI</a></p>
    </div>
</div>
<div class="news-block">
    <h3><a href="https://mdisec.com/inside-posthog-how-ssrf-a-clickhouse-sql-escaping-0day-and-default-postgresql-credentials-formed-an-rce-chain-zdi-25-099-zdi-25-097-zdi-25-096/?utm_source=tldrdev"
            target="_blank">Inside PostHog: How SSRF, a ClickHouse SQL Escaping 0day, and Default PostgreSQL
            Credentials Formed an RCE Chain <span class="subhead">(ZDI-25-099, ZDI-25-097, ZDI-25-096) (17 minute
                read)</span></a></h3>
    <div class="news-content">A security researcher uncovered a critical Remote Code Execution (RCE) chain in
        PostHog by chaining several vulnerabilities. The initial vector was a Server-Side Request Forgery (SSRF)
        vulnerability that bypassed webhook URL validation, allowing an attacker to save and trigger requests to
        internal URLs via a Rust worker.</div>
</div>
<div class="news-block">
    <h3><a href="https://sqlite.org/testing.html?utm_source=tldrdev" target="_blank">How SQLite Is Tested <span
                class="subhead">(36 minute read)</span></a></h3>
    <div class="news-content">SQLite has a thorough and multi-faceted testing process, with test code outweighing
        its core library. This includes four independent test harnesses that collectively run billions of test cases
        to verify functionality, cross-database compatibility, and resilience to malicious inputs. Specialized
        anomaly tests simulate and verify proper handling of out-of-memory conditions, I/O errors, and power loss.
    </div>
</div>
<div class="news-block">
    <h3><a href="https://www.ivan.codes/blog/the-art-of-vibe-design?utm_source=tldrdev" target="_blank">The Art of
            Vibe Design <span class="subhead">(6 minute read)</span></a></h3>
    <div class="news-content">AI made not being a designer or developer less of a barrier. You provide the vision,
        and AI writes the code. Implementation used to be the bottleneck, but now we're only bottlenecked by taste.
        People who succeed in the new era will be those who know what they want and can communicate it clearly.
    </div>
</div>
<div class="news-block">
    <h3><a href="https://www.finalroundai.com/blog/aws-ceo-ai-cannot-replace-junior-developers?utm_source=tldrdev"
            target="_blank">AWS CEO Explains 3 Reasons AI Can't Replace Junior Devs <span class="subhead">(8 minute
                read)</span></a></h3>
    <div class="news-content">AWS' CEO has argued against replacing junior developers with AI, saying it is "one of
        the dumbest ideas" for several reasons. Junior devs are often the most proficient with new AI tools and,
        being the least expensive, don't offer much cost savings when cut. Additionally, removing them severs a
        company's talent pipeline.</div>
</div>
<div class="news-block">
    <h3><a href="https://msanroman.io/blog/ai-consumption-paradigm?utm_source=tldrdev" target="_blank">AI's real
            superpower: consuming, not creating <span class="subhead">(4 minute read)</span></a></h3>
    <div class="news-content">AI's real superpower is in consumption, not creation. Most people should use it less
        for generating content and more for its analytical capabilities. Connecting AI to a knowledge base, such as
        an Obsidian vault filled with notes and reflections, and having it act as a research assistant, allows it to
        uncover hidden patterns and connect disparate ideas across multitudes of information that would be
        impossible for a human to process.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.nmi.com/saas-dummies-lp/?utm_source=tldr_dev&amp;utm_medium=newsletter&amp;utm_campaign=SaaS_Payments_For_Dummies&amp;utm_content=12/18"
            target="_blank">10 mistakes developers make when integrating payments <span
                class="subhead">(Sponsor)</span></a></h3>
    <div class="news-content">Don't integrate payments until you read <a
            href="https://www.nmi.com/saas-dummies-lp/?utm_source=tldr_dev&amp;utm_medium=newsletter&amp;utm_campaign=SaaS_Payments_For_Dummies&amp;utm_content=12%2F18"
            rel="noopener noreferrer nofollow" target="_blank">Payments for SaaS Platforms for Dummies.</a> This
        guide provides the technical blueprint for fast and secure payments at scale. Stop handling PCI compliance;
        start building features. <a
            href="https://www.nmi.com/getyoursaasintopayments/?utm_source=tldr_dev&amp;utm_medium=newsletter&amp;utm_campaign=Contact_Experts&amp;utm_content=12/18"
            rel="noopener noreferrer nofollow" target="_blank">Want to learn more? Reach out to us here.</a></div>
</div>
<div class="news-block">
    <h3><a href="https://nithinbekal.com/posts/ruby-4-0/?utm_source=tldrdev" target="_blank">What's new in Ruby 4.0
            <span class="subhead">(5 minute read)</span></a></h3>
    <div class="news-content">Ruby 4.0 features a new JIT compiler, improvements to Ractors, a new mechanism to
        define namespaces, and more. There shouldn't be any serious breaking changes. The major version bump is to
        mark Ruby's 30th birthday. This post highlights some interesting changes. A link to the full list of changes
        is available.</div>
</div>
<div class="news-block">
    <h3><a href="https://github.com/cloudflare/telescope?utm_source=tldrdev" target="_blank">Telescope <span
                class="subhead">(GitHub Repo)</span></a></h3>
    <div class="news-content">Cloudflare's Telescope is a diagnostic, cross-browser performance testing agent for
        evaluating web page load performance. When run, it loads a specified URL in a chosen browser, applies custom
        parameters, and collects extensive data. This data includes console output, a video of the page load,
        various timing metrics, screenshots, and filmstrip images, all stored in a dedicated results directory.
    </div>
</div>
<div class="news-block">
    <h3><a href="https://blog.google/technology/developers/build-with-gemini-3-flash/?utm_source=tldrdev"
            target="_blank">Build with Gemini 3 Flash, frontier intelligence that scales with you <span
                class="subhead">(5 minute read)</span></a></h3>
    <div class="news-content">Gemini 3 Flash is now rolling out to developers. The model offers powerful performance
        at less than a quarter of the cost of Gemini 3 Pro. It surpasses Gemini 2.5 Pro across many benchmarks while
        delivering faster speeds. The model features Google's most advanced visual and spatial reasoning and now
        offers code execution to zoom, count, and edit visual inputs.</div>
</div>
<div class="news-block">
    <h3><a href="https://www.greptile.com/state-of-ai-coding-2025?utm_source=tldrdev" target="_blank">The State of
            AI Coding 2025 <span class="subhead">(10 minute read)</span></a></h3>
    <div class="news-content">AI coding tools have increased developer output and PR sizes. In AI memory, mem0 is
        the most popular package, while in SDKs, OpenAI and Anthropic lead. Anthropic models are the best in
        time-to-first-token, while OpenAI's GPT-5 series delivers higher throughput and more cost-effective
        performance.</div>
</div>
<div class="news-block">
    <h3><a href="https://frontendmasters.com/blog/web-monetization-is-still-inching-along-but-still-too-difficult?utm_source=tldrdev"
            target="_blank">Web Monetization is Still Inching Along, But Still Too Difficult <span class="subhead">(7
                minute read)</span></a></h3>
    <div class="news-content">Web Monetization is a developing web standard that would allow users to automatically
        send small payments to websites they visit through built-in browser functionality, similar to how Apple Pay
        works for purchases. However, recent attempts to test the current implementation through browser extensions
        and wallet providers like GateHub have been frustrating due to complex setup processes and regional
        restrictions.</div>
</div>
<div class="news-block">
    <h3><a href="https://firecrawl.dev/?utm_source=tldrdev" target="_blank">Firecrawl: open-source web data API for
            LLMs [69k+ GitHub stars] <span class="subhead">(Sponsor)</span></a></h3>
    <div class="news-content">Turn websites into LLM-ready data with Firecrawl. Find, fetch, and format clean data
        via simple APIs. Sign up for a plan <a href="https://firecrawl.link/adops-tldr-tech"
            rel="noopener noreferrer nofollow" target="_blank">here</a> and get hats, hoodies, or even AirPods Pro
        depending on the tier.Secure your limited edition swag today.</div>
</div>
<div class="news-block">
    <h3><a href="https://radar.cloudflare.com/year-in-review/2025?utm_source=tldrdev" target="_blank">Cloudflare
            Radar 2025 Year in Review <span class="subhead">(15 minute read)</span></a></h3>
    <div class="news-content">The Cloudflare Radar 2025 Year in Review goes over various Internet patterns and
        trends, including traffic, AI, adoption, connectivity, and security.</div>
</div>
<div class="news-block">
    <h3><a href="https://iafisher.com/blog/2025/12/my-67-bugs-in-2025?utm_source=tldrdev" target="_blank">My 67 bugs
            in 2025 <span class="subhead">(4 minute read)</span></a></h3>
    <div class="news-content">Keep a log of the bugs in code that you write to better understand the kinds of
        mistakes you tend to make and what you can do to avoid making more of them.</div>
</div>
<div class="news-block">
    <h3><a href="https://pushtoprod.substack.com/p/stop-saying-tradeoffs?utm_source=tldrdev" target="_blank">Please,
            Stop Talking About "Tradeoffs" <span class="subhead">(8 minute read)</span></a></h3>
    <div class="news-content">Decision-making is the hardest skill in software engineering.</div>
</div>
<div class="news-block">
    <h3><a href="https://stackoverflow.blog/2025/12/15/at-aws-re-invent-the-news-was-agents-but-the-focus-was-developers?utm_source=tldrdev"
            target="_blank">At AWS re:Invent, the news was agents, but the focus was developers <span class="subhead">(8
                minute read)</span></a></h3>
    <div class="news-content">At AWS re:Invent, the major focus was on AI agents, with AWS announcing three
        autonomous frontier agents for development, security, and DevOps that can work independently for days, plus
        a "tech debt killer" service called AWS Transform.</div>
</div>
<div class="news-block">
    <h3><a href="https://lucide-animated.com/?utm_source=tldrdev" target="_blank">Beautifully crafted animated icons
            <span class="subhead">(Website)</span></a></h3>
    <div class="news-content">This site contains a collection of smooth animated icons that can be used freely in
        personal projects.</div>
</div>`;
    document.getElementById('data-newsletter').innerHTML = `    <h1 class="main-heading"><a href="https://tldr.tech/data/2025-12-18" target="_blank">TLDR Data</a></h1>
    <div class="news-block">
        <h3><a href="https://www.atlassian.com/blog/atlassian-engineering/how-we-unlocked-performance-at-scale-with-jira-platform?utm_source=tldrdata"
                target="_blank">How We Unlocked Performance at Scale with Jira Platform <span class="subhead">(15 minute
                    read)</span></a></h3>
        <div class="news-content">Jira Cloud's rearchitecture shifted from a single-tenant, monolithic model to a
            cloud-native, multi-tenant platform built for extreme scale, with targeted support for up to 1 billion
            issues per tenant and 99.999% uptime. Core services leverage document stores, sharding, multi-level caching,
            and resilient ingestion pipelines to achieve sub-15ms reads, reduced tail latency, and efficient permission
            enforcement. The redesign enables robust, permission-aware JQL search, rapid data replication, and
            consistent user experience across millions of tenants and projects.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://clickhouse.com/blog/parallelizing-fixed-hashmap-aggregation-merge-in-clickhouse?utm_source=tldrdata"
                target="_blank">Parallelizing ClickHouse Aggregation Merge for Fixed Hash Map <span class="subhead">(7
                    minute read)</span></a></h3>
        <div class="news-content">ClickHouse 25.11 introduces parallel merge for small GROUP BY operations, harnessing
            multithreading to accelerate aggregations on 8-bit and 16-bit keys by partitioning FixedHashMap-based merge
            phases among threads. Performance gains are significant for complex aggregations, but overhead limits
            benefits for trivial operations, so the optimization is disabled in those cases. This enhancement directly
            boosts query efficiency for data processing workflows involving high-cardinality small-key groupings.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://netflixtechblog.com/how-temporal-powers-reliable-cloud-operations-at-netflix-73c69ccb5953?utm_source=tldrdata"
                target="_blank">How Temporal Powers Reliable Cloud Operations at Netflix <span class="subhead">(7 minute
                    read)</span></a></h3>
        <div class="news-content">Netflix moved Spinnaker Cloud Operations to Temporal, a durable execution platform,
            replacing Clouddriver's instance-local orchestration, retries, and homegrown rollback mechanism. Transient
            cloud-operation deployment failures fell from 4% to 0.0001% (~4.5 orders of magnitude) after a “Fast
            Properties” rollout that onboarded all apps within two quarters. Temporal made Clouddriver stateless,
            enforced idempotent API-call Activities with a 2-hour retry window, and improved debugging via workflow
            history/UI. Adoption now spans hundreds of control-plane use cases, doubling over the last year.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://motherduck.com/blog/analytics-agents/?utm_source=tldrdata" target="_blank">Building an
                Answering Machine <span class="subhead">(14 minute read)</span></a></h3>
        <div class="news-content">MotherDuck's new Answering Machine lets anyone ask plain-English questions about real,
            messy data from ChatGPT, Claude, or Gemini and get reliable answers without SQL. It works by using an
            agentic approach that explores tables, runs queries, checks results, and iterates like a human analyst,
            rather than guessing a single query. The result is practical self-service analytics that even non-technical
            users can trust on real business data.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.kdnuggets.com/emerging-trends-in-ai-ethics-and-governance-for-2026?utm_source=tldrdata"
                target="_blank">Emerging Trends in AI Ethics and Governance for 2026 <span class="subhead">(5 minute
                    read)</span></a></h3>
        <div class="news-content">Adaptive AI governance frameworks are now essential, integrating continuous oversight,
            dynamic policy versioning, and automated monitoring directly within deployment pipelines to address
            fast-evolving systems and live environment behaviors. Privacy engineering is a core design constraint,
            driving widespread adoption of differential privacy, secure enclaves, and synthetic data. Routine AI supply
            chain audits, real-time regulatory sandboxes, and advanced transparency stacks ensure traceability,
            multi-agent accountability, and stakeholder-aligned disclosures.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.ryft.io/blog/apache-iceberg-v3-is-it-ready?utm_source=tldrdata" target="_blank">Apache
                Iceberg V3: Is It Ready? <span class="subhead">(6 minute read)</span></a></h3>
        <div class="news-content">Apache Iceberg V3 delivers major improvements like deletion vectors, row lineage,
            better semi-structured data, and encryption foundations. In practice, it is production-ready mainly if you
            run on Spark or Flink, with partial support elsewhere and notable gaps in engines like Athena, Trino, and
            Snowflake. V3 is clearly the future, but for most teams, it is still a wait and watch adoption rather than a
            safe default today.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://medium.com/arcesium-engineering-blog/data-modeling-for-private-markets-a-field-guide-1ef1c7642abe?utm_source=tldrdata"
                target="_blank">Data Modeling for Private Markets: A Field Guide <span class="subhead">(10 minute
                    read)</span></a></h3>
        <div class="news-content">Private-markets data tends to be low volume but poorly standardized, adequate data
            models win on schema resilience, not throughput: expect ID churn, bespoke joins, and schema drift. Use
            “stable references” in master tables (canonical self-links) to merge duplicates without rewriting downstream
            foreign keys. Model hierarchies with extension tables and keep base entities ~10–20 columns (worry at 25).
            Keep BI usable by targeting ~80% one-hop joins and standardizing a transactional+reference domain model via
            relation tags and an alias/view layer.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://ad.doubleclick.net/ddm/trackclk/N2655160.3973022TLDR/B34639274.435382365;dc_trk_aid=628655762;dc_trk_cid=246304382;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1"
                target="_blank">Agents that don't suck <span class="subhead">(Sponsor)</span></a></h3>
        <div class="news-content"><a href="https://links.tldrnewsletter.com/S3PHje" rel="noopener noreferrer nofollow"
                target="_blank">Agent Bricks</a> helps you build, evaluate and optimize AI agents grounded in your
            unique data. It evaluates automatically, scores outputs against your goals and improves with human feedback
            — giving you a clearer path to production. Build agents that work in the real world.<p></p>
            <p><a href="https://links.tldrnewsletter.com/S3PHje" rel="noopener noreferrer nofollow" target="_blank">See
                    why it's worth your time</a></p>
        </div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.dataprojecthunt.com/?utm_source=tldrdata" target="_blank">Data Project Hunt <span
                    class="subhead">(Website)</span></a></h3>
        <div class="news-content">Data Project Hunt is a community site for discovering and showcasing data engineering
            projects, built around weekly “launches,” voting, and maker recognition. It lets you submit projects, browse
            curated listings, filter by stack, follow recent activity, and see leaderboards for both projects and
            makers. A place to learn from real-world best practices and share your innovations.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://github.com/asg017/sqlite-dist/tree/main?utm_source=tldrdata" target="_blank">sqlite-dist
                <span class="subhead">(GitHub Repo)</span></a></h3>
        <div class="news-content">sqlite-dist is a CLI tool that builds/packs precompiled SQLite extensions so you can
            ship them as a simple installable artifact. It targets multiple distribution channels (GitHub Releases,
            PyPI, npm, RubyGems, plus plugin ecosystems like Datasette, sqlite-utils, and sqlpkg), so the same extension
            can be consumed by different developer stacks. The project is explicitly marked work-in-progress, so expect
            rough edges, shifting commands, and documentation that's still being filled in.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://github.com/ax-llm/ax/blob/main/docs/OPTIMIZE.md#-5-minute-quick-start?utm_source=tldrdata"
                target="_blank">LLM Optimization Made Simple: A Beginner's Guide to Ax <span class="subhead">(GitHub
                    Repo)</span></a></h3>
        <div class="news-content">Meta's Ax framework streamlines optimization of LLM “programs” for tasks like
            classification via automatic instruction + few-shot demo tuning. With as few as 3 to 5 labeled examples and
            a metric, optimization typically runs ~1-2 minutes and can move accuracy from 70% to 90% while cutting costs
            by ~80%. The optimized result is saved as an AxOptimizedProgram for reproducible production rollout. A
            teacher-student workflow claims 50x lower token cost.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://www.datagravity.dev/p/inference-economics-101-reserved?utm_source=tldrdata"
                target="_blank">Inference Economics 101: Reserved Compute Versus Inference APIs <span
                    class="subhead">(12 minute read)</span></a></h3>
        <div class="news-content">AI inference infrastructure is diverging into two dominant models: reserved/hourly
            compute platforms prioritizing predictability and control, and inference APIs that offer abstraction, high
            utilization (60–85%), and elastic scaling through customer aggregation. Reserved compute excels for
            deterministic, compliance-driven workloads with high individual GPU utilization, while inference APIs unlock
            superior cost efficiency by leveraging statistical multiplexing, even when individual customer utilization
            is low (10–30%). Sustainable platform economics hinge more on utilization than raw performance. Aggregation
            and abstraction beats peak tokens/sec as drivers of cost competitiveness and scalability.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://thenewstack.io/in-2026-ai-infrastructure-will-face-a-reckoning/?utm_source=tldrdata"
                target="_blank">In 2026, AI Infrastructure Will Face a Reckoning <span class="subhead">(4 minute
                    read)</span></a></h3>
        <div class="news-content">Enterprises must overhaul data infrastructure by 2026 as AI agents strain every layer
            of the data stack, rendering legacy systems inadequate. Key shifts include adopting Model Context Protocol
            for seamless integration, implementing near-real-time CDC pipelines for scalable data access, strengthening
            end-to-end governance (especially multi-system lineage), and maintaining vendor independence via decoupled
            data planes. Accelerated adoption of durable execution platforms will also become essential for reliable
            agent-driven operations.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://medium.com/womenintechnology/were-past-the-opentelemetry-honeymoon-period-38e363ad3c88?utm_source=tldrdata"
                target="_blank">We're Past the OpenTelemetry “Honeymoon Period” <span class="subhead">(6 minute
                    read)</span></a></h3>
        <div class="news-content">Guidance on taming soaring telemetry bills and data sprawl as OTel becomes standard
            across enterprises.</div>
    </div>
    <div class="news-block">
        <h3><a href="https://duckdb.org/2025/12/16/iceberg-in-the-browser.html?utm_source=tldrdata"
                target="_blank">Iceberg in the Browser <span class="subhead">(3 minute read)</span></a></h3>
        <div class="news-content">DuckDB-Wasm now lets analysts query Iceberg tables entirely client-side, enabling
            zero-setup, serverless exploration.</div>
    </div>`;
}