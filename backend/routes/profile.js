const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../models/profile.model');
const User = require('../models/user.model');

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: `There is no profile for the current user` });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile
//@desc Create or update user proifiles
//@acess Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Buid social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //Updated Profile Values
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);

    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;

//@route GET api/profile
//@desc  Get all profiles
//@acess Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles)
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Send Error');
  }
});

//@route GET api/profile/user/:user_id
//@desc  Get all by user ID
//@acess Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({
      msg: 'Profile not found.'
    })

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found.' });
    }
    res.status(500).send('Send Error');
  }
});

//@route DELETE api/profile
//@desc  Delete profile, user & posts
//@acess Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove the profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await Profile.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' })
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Send Error');
  }
});

//@route PUT api/profile/experience
//@desc  Add profile experience
//@acess Private
router.put('/experience', [auth, [
  check('title', 'Title is quired').not().isEmpty(),
  check('company', 'company is quired').not().isEmpty(),
  check('from', 'from date is quired').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })

    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
});
//@route Delete api/profile
//@desc  Delete experience from profile
//@acess Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
    //Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1)

    await profile.save();

    res.json(profile)
  } catch (error) {

    }
  }
)

//@route PUT api/profile/education
//@desc  Add profile experience
//@acess Private
router.put('/education', [auth, [
  check('school', 'school is quired').not().isEmpty(),
  check('degreee', 'degreee is quired').not().isEmpty(),
  check('from', 'from date is quired').not().isEmpty(),
  check('fieldofstudy', 'from date is quired').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
});
//@route Delete api/profile/education/:edu_id
//@desc  Delete experience from profile
//@acess Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
    //Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1)

    await profile.save();

    res.json(profile)
  } catch (error) {

    }
  }
)
