const { Router } = require("express");
const { Exhibit } = require("../../db/index");
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const {
      exhibitName,
      exhibitAddress,
      price,
      startDate,
      endDate,
      category,
      author,
      information,
      image,
    } = req.body;
    const newExhibit = await Exhibit.create({
      exhibitName,
      exhibitAddress,
      price,
      startDate,
      endDate,
      category,
      author,
      information,
      image,
    });
    res.status(200).json(newExhibit);
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const exhibits = await Exhibit.find({});
    res.json(exhibits);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:exhibitId", async (req, res, next) => {
  try {
    const { exhibitId } = req.params;
    const exhibits = await Exhibit.findOne({ _id: exhibitId });
    res.json(exhibits);
  } catch (err) {
    res.json(err);
  }
});

router.put("/:exhibitId", async (req, res, next) => {
  try {
    const { exhibitId } = req.params;
    const {
      exhibitName,
      exhibitAddress,
      price,
      startDate,
      endDate,
      category,
      author,
      information,
      image,
    } = req.body;

    const exhibit = await Exhibit.updateOne(
      { _id: exhibitId },
      {
        exhibitName,
        exhibitAddress,
        price,
        startDate,
        endDate,
        category,
        author,
        information,
        image,
      }
    );
    res.send("OK");
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:exhibitId", async (req, res, next) => {
  try {
    const { exhibitId } = req.params;
    await Exhibit.deleteOne({ _id: exhibitId });

    res.send("OK");
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
