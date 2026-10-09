# StaySpot – Property Rental Platform

StaySpot is a full-stack travel accommodation platform inspired by Airbnb. Hosts can list and manage properties, and guests can explore stays by category, search listings, and leave reviews. The app is built with Node.js, Express.js, MongoDB, and EJS following the MVC pattern.

**Live Demo:** https://wanderlust-project-g40t.onrender.com/

---

## Features

- **Authentication & authorization** – sign up, log in, and log out using Passport.js (local strategy) with session-based login
- **Listing management** – create, view, edit, and delete property listings (CRUD)
- **Reviews & ratings** – guests can add and view reviews on each listing
- **Category filters** – browse by Trending, Rooms, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, Flat, and Arctic
- **Search** – find listings quickly from the navigation bar
- **Tax toggle** – switch between the base price and the total price including 18% GST
- **Image uploads** – listing images are uploaded with Multer and stored on Cloudinary
- **Server-side validation** – request data is validated with Joi
- **Flash messages** – clear success and error feedback for user actions
- **Responsive UI** – built with Bootstrap and EJS templates

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, Bootstrap, EJS, ejs-mate |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js, passport-local, passport-local-mongoose, Express Session, connect-mongo |
| File Storage | Multer, Cloudinary |
| Validation & Utilities | Joi, connect-flash, method-override, dotenv |
| Deployment | Render |

---

## Project Structure

```
StaySpot-project/
├── controllers/      # Request-handling logic
├── init/             # Database initialization / sample data
├── models/           # Mongoose schemas (listings, reviews, users)
├── public/           # Static files (CSS, JS, images)
├── routes/           # Express route definitions
├── utils/            # Helper utilities
├── views/            # EJS templates
├── app.js            # Application entry point
├── cloudConfig.js    # Cloudinary configuration
├── middleware.js     # Custom middleware (auth checks, validation)
├── schema.js         # Joi validation schemas
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 22.14.0 or later
- A MongoDB database (local or MongoDB Atlas)
- A Cloudinary account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DeepanshiMahajan/StaySpot-project.git
cd StaySpot-project

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Run the App

```bash
node app.js
```

Then open `http://localhost:8080` in your browser (use the port set in `app.js`).

---

## Key Routes

| Route | Description |
|---|---|
| `/listings` | View all listings (supports `?category=` filter) |
| `/listings/new` | Create a new listing (login required) |
| `/listings/:id` | View a listing and its reviews |
| `/signup` | Register a new account |
| `/login` | Log in to an existing account |

---

## Future Improvements

- Booking functionality
- Payment gateway integration
- Advanced search and filters
- Wishlist feature

---

## Author

**Deepanshi Mahajan**
[GitHub](https://github.com/DeepanshiMahajan) · [LinkedIn](https://www.linkedin.com/in/deepanshi-mahajan-86b6472bb/)

---

## Project Purpose

Built to strengthen full-stack web development skills, with hands-on practice in backend development, authentication, database management, and RESTful routing.
