const Booking = require('../models/booking');
const Listing = require('../models/listing');

module.exports.createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }

    //Convert to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    //Validate dates
    if (end < start) {
      req.flash('error', 'End date cannot be before start date.');
      return res.redirect(`/listings/${id}`);
    }

    //Calculate totalPrice
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // inclusive
    const totalPrice = days * listing.price;

    //Create Booking
    const booking = new Booking({
      listing: id,
      user: req.user._id,
      startDate,
      endDate,
      totalPrice,
      status: 'confirmed'
    });

    await booking.save();

    req.flash('success', 'Booking created successfully!');
    res.redirect(`/listings/${id}`);

  } catch (err) {
    console.error(err);
    req.flash('error', 'Unable to create booking.');
    res.redirect(`/listings/${req.params.id}`);
  }
};
