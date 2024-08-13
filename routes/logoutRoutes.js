document.getElementById('logout').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to homepage on success
        } else {
            alert('Failed to log out.'); // Alert on failure
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});