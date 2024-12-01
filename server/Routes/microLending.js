const express = require('express');
const router = express.Router();
const MicroLending = require('../models/MicroLending');
const auth = require('../middleware/auth');

// Get all listings
router.get('/', auth, async (req, res) => {
  try {
    const listings = await MicroLending.find()
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new listing
router.post('/', auth, async (req, res) => {
  const listing = new MicroLending({
    ...req.body,
    owner: req.user.id
  });

  try {
    const newListing = await listing.save();
    await newListing.populate('owner', 'name email');
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update listing status
router.patch('/:id', auth, async (req, res) => {
  try {
    const listing = await MicroLending.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(listing, req.body);
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await MicroLending.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await listing.remove();
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 