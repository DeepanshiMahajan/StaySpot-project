const Joi = require("joi");

//Listing validation schema
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
     category: Joi.string().required(),
    price: Joi.number().required().min(0),

//Allow empty or missing image, Mongoose default/pre-save hook will handle fallback
    image: Joi.object({
      url: Joi.string().uri().allow("", null),   // no longer required
      filename: Joi.string().allow("", null)
    }).optional()
  }).required(),
});

//Review validation schema
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required(),
});
