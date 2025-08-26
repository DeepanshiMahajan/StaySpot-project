const Listing = require("../models/listing");
const { cloudinary } = require('../cloudConfig');
const Booking = require('../models/booking');

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// INDEX
module.exports.index = async (req, res) => {
  try {
    const { search, category } = req.query; 
    let allListings;

    if (search && search.trim() !== "") {
      const q = search.trim();
      const regex = new RegExp(escapeRegex(q), "i"); 
      allListings = await Listing.find({ location: regex });
    } else if (category) {
      allListings = await Listing.find({ category });
    } else {
      allListings = await Listing.find({});
    }

    res.render("listings/index", { allListings, search, category });
  } catch (err) {
    console.error("Listings index error:", err);
    if (req.flash) req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW
module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
    }

    const bookings = await Booking.find({ listing: listing._id, status: "confirmed" })
      .populate("user");

    res.render("listings/show", { listing, bookings });

  } catch (err) {
    console.error("Error fetching listing:", err);
    req.flash("error", "Something went wrong while fetching the listing.");
    res.redirect("/listings");
  }
};

// CREATE
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // Ownership check
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
  }

  res.render("listings/edit.ejs", { listing });
};

// UPDATE
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Ownership check
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to update this listing!");
    return res.redirect(`/listings/${id}`);
  }

  if (req.file) {
    // delete old image from Cloudinary
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    // update with new image
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };

    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Ownership check
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to delete this listing!");
    return res.redirect(`/listings/${id}`);
  }

  // delete image from Cloudinary
  if (listing.image && listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};