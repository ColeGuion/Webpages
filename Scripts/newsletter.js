document.addEventListener('DOMContentLoaded', function() {
    fetchNewsletterContent();
});

async function fetchNewsletterContent() {
    try {
        // Call the Netlify function
        const res = await fetch('https://mainnotes.netlify.app/.netlify/functions/newsletter', {
            method: "GET"
        });

        const data = await res.json();
        console.log("Newsletter response:", data);

        /* if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        } */
        document.getElementById("content").textContent =  JSON.stringify(data, null, 2);

    } catch (error) {
        console.log("Error fetching newsletter:", error);
    } 

}