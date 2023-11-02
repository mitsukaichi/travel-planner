const router = require("express").Router();
const { Location, Trip } = require("../../models");

router.get("/", async (req, res) => {
  //returns all location data
  try {
    const locationData = await Location.findAll({
      include: [{ model: Trip }],
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  //creates location data and returns a successful response
  try {
    const locationData = await Location.create(req.body);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  //returns a single location's data, with its associated trips
  try {
    const locationData = await Location.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Trip,
          where: {
            location_id: req.params.id,
          },
        },
      ],
    });

    if (!locationData) {
      res.status(404).json({
        message: "Error: No location associated with the provided id",
      });
      return;
    }

    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  //removes a location and any trips associated with it and returns a successful response
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!locationData) {
      res.status(404).json({
        message: "Error: No location associated with the provided id",
      });
      return;
    }

    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});
