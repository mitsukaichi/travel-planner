const router = require("express").Router();
const { Traveller, Trip, Location } = require("../../models");

router.get("/", async (req, res) => {
  //returns all traveller data
  try {
    const travellerData = await Traveller.findAll({
      include: [{ model: Traveller }],
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  //creates traveller data and returns a successful response
  try {
    const travellerData = await Traveller.create(req.body);
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  //returns a single traveller's data and any associated trip data
  try {
    const travellerData = await Traveller.findByPk(req.pararms.id, {
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Trip,
          where: {
            traveller_id: req.params.id,
          },
        },
        {
          model: Location,
          attributes: ["name"],
          where: {
            traveller_id: req.params.id,
          },
        },
      ],
    });

    if (!travellerData) {
      res.status(404).json({
        message: "Error: No traveller associated with the provided id",
      });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  //deletes traveller based on provided id
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({
        message: "Error: No traveller associated with the provided id",
      });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});
