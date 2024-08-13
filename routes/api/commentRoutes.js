const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    // Validate input
    if (!req.body.content || !req.body.post_id) {
      return res.status(400).json({ message: 'Content and post ID are required' });
    }

    // Create the comment
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(201).json(newComment); // Use 201 for resource creation
  } catch (err) {
    console.error('Error creating comment:', err); // Logging the error
    res.status(400).json({ message: 'Failed to create comment' });
  }
});

module.exports = router;