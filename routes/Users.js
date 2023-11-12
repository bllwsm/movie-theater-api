const express = require("express");
const app = express();
const { User, Show } = require("../models/index.js");

// The User Router should GET ALL users from the database using the endpoint /users.

app.get("/users", async (req, res) => {
  const allUsers = await User.findAll();
  res.send(allUsers);
});

// The User Router should GET one user from the database using an endpoint.

app.get("/users/:id", (req, res) => {
  res.json(User[req.params.id - 1]);
});

// The User Router should GET all the shows watched by a user using an endpoint.

app.get("/users/:id/shows", async (req, res) => {
  const userId = req.params.id - 1;
  const user = await User.findByPk(userId, {
    include: [{ model: Show, through: "watched" }],
  });
  res.json({ userId, shows: user.shows });
});

// The User Router should update and add a show if a user has watched it using an endpoint.

app.put("/users/:userId/shows/:showId", async (req, res) => {
  const userid = req.params.userId - 1;
  const showid = req.params.showId - 1;

  const user = await User.findByPk(userid); // Find the user by its  ID
  const show = await Show.findByPk(showid); // Find the show by its  ID

  await user.addShow(show); // adds `show` to the list of users watched shows
});

//  The Show Router should GET ALL shows from the database using the endpoint /shows.

app.get("/shows", async (req, res) => {
  const allShows = await Show.findAll();
  res.send(allShows);
});

// The Show Router should GET one show from the database using an endpoint.

app.get("/shows/:id", (req, res) => {
  res.json(Show[req.params.id - 1]);
});

// The Show Router should get shows of a specific genre using an endpoint.

app.get("/shows/genres/:genre", async (req, res) => {
  const genre = req.params.genre;

  const shows = await Show.findAll({ where: { genre } });

  res.send(shows);
});

// The Show Router should update a rating on a specific show using an endpoint.
// For example, a PUT request to /shows/4/watched would update the 4th show that has been watched.

app.put("/shows/:numShow/watched", async (req, res) => {
  const showId = req.params.numShow;
  const newRating = req.body.rating;
  Show[showId].addRating(newRating);
});


app.put("/shows/:numShow/updates", async (req, res) => {
    const showId = req.params.numShow;
    const Update = req.body.available;
    Show[showId].addAvailable(Update);
  });

  app.delete("/shows/:numShow", async (req, res) => {
    const showId = await findByPk(req.params.numShow);
    showId.destroy();
  });