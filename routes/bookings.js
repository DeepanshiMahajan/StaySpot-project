const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Listing = require('../models/listing');
const { isLoggedIn } = require('../middleware');

// Create a new booking
router.post('/:id', isLoggedIn, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const listingId = req.params.id;

    const overlapping = await Booking.findOne({
      listing: listingId,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(endDate) } }
      ],
      status: 'confirmed'
    });

    if (overlapping) {
      req.flash('error', 'Selected dates are already booked.');
      return res.redirect(`/listings/${listingId}`);
    }

    // Find listing to calculate total price
    const listing = await Listing.findById(listingId);
    const days = (new Date(endDate) - new Date(startDate)) / (1000*60*60*24) + 1;
    const totalPrice = listing.price ? listing.price * days : 0;

    const booking = new Booking({
      listing: listingId,
      user: req.user._id,
      startDate,
      endDate,
      totalPrice
    });

    await booking.save();

    req.flash('success', 'Booking confirmed!');
    res.redirect(`/listings/${listingId}`);
  } catch (e) {
    console.log(e);
    req.flash('error', 'Something went wrong.');
    res.redirect(`/listings/${req.params.id}`);
  }
});

module.exports = router;
