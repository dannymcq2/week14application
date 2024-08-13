document.querySelector('#new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Collect and trim form values
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    // Check if title and content are provided
    if (title && content) {
        try {
            // Send POST request to create a new post
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Handle response
            if (response.ok) {
                document.location.replace('/dashboard'); // Redirect on success
            } else {
                alert('Failed to create post'); // Alert on failure
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    } else {
        alert('Title and content are required.');
    }
});