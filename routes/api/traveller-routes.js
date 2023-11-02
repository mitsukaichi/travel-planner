const router = require("express").Router();
const { Traveller } = require("../../models");

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
  //
  try {
    const travellerData = await Traveller.findByPk(req.pararms.id, {
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

router.delete("/:id", async (req, res) => {
  //
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
