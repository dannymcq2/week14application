document.querySelector('#edit-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#post-id').value.trim();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  });
  
  document.querySelector('#delete-post-btn').addEventListener('click', async () => {
    const id = document.querySelector('#post-id').value.trim();
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  });