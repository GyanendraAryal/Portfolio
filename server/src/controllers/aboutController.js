import About from '../models/About.js';

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default if not exists
      about = await About.create({
        content: 'I am a passionate developer.',
        email: 'contact@example.com'
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (about) {
      Object.assign(about, req.body);
      const updatedAbout = await about.save();
      res.json(updatedAbout);
    } else {
      about = new About(req.body);
      const createdAbout = await about.save();
      res.status(201).json(createdAbout);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
