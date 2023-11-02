const router = require("express").Router();
const { Trip, Location, Traveller } = require("../../models");

router.post("/", async (req, res) => {
  //creates trip data between associated travellers and locations
  try {
    const tripData = await Trip.create(req.body);
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  //removes a trip and returns a successful response
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tripData) {
      res
        .status(404)
        .json({ message: "Error: No trip associated with the provided id" });
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});
