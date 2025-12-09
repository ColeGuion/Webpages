fetchNewsletterContent();

async function fetchNewsletterContent() {
    try {
        // Call the Netlify function
        const response = await fetch('/.netlify/functions/newsletter', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        console.log("Data received:", data);

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        //displayResult(string1, data.result);
    } catch (error) {
        //showError(error.message);
        console.log("Error fetching newsletter:", error);
    } finally {
        //setLoading(false);
        console.log("Finished newsletter fetch attempt");
    }

}