const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require("../../middlewear/Auth")

const Post = require("../../models/Post")
const Profile = require("../../models/Profile")
const User = require("../../models/Users")

//@route  POST api/posts
//@desc   Create a new post
//@acess  Private      
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = await new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/posts
//@desc   Get all posts
//@acess  Private      
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1
    });
    res.json(posts)
  } catch (error) {

  }
})

//@route  GET api/posts/:id
//@desc   Get post by ID
//@acess  Private 
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found!'
      })
    }
    res.json(post)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!')
    }
  })


module.exports = router;