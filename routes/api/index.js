// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
      res.status(201).json(newPost); // Use 201 for resource creation
    } catch (err) {
      console.error('Error creating post:', err); // Logging the error
      res.status(400).json({ message: 'Failed to create post' });
    }
  });
  
  // Update a post
  router.put('/:id', withAuth, async (req, res) => {
    try {
      const [updated] = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id, // Ensure the user owns the post
          },
        }
      );
  
      if (updated === 0) {
        res.status(404).json({ message: 'No post found with this id or not authorized!' });
        return;
      }
  
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      console.error('Error updating post:', err); // Logging the error
      res.status(500).json({ message: 'Failed to update post' });
    }
  });
  
  // Delete a post
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deleted = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (deleted === 0) {
        res.status(404).json({ message: 'No post found with this id or not authorized!' });
        return;
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error('Error deleting post:', err); // Logging the error
      res.status(500).json({ message: 'Failed to delete post' });
    }
  });
  
  module.exports = router;