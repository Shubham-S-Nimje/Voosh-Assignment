const Artist = require("../models/artist");

exports.getAllArtists = async (req, res) => {
  try {
    const { limit, offset, grammy, hidden } = req.query;
    const where = {};

    if (grammy !== undefined) where.grammy = grammy;
    if (hidden !== undefined) where.hidden = hidden === "true";

    const artists = await Artist.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      status: 200,
      data: artists,
      message: "Artists retrieved successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: artist,
      message: "Artist retrieved successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.addArtist = async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;
    await Artist.create({ name, grammy, hidden });

    res.status(201).json({
      status: 201,
      data: null,
      message: "Artist created successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grammy, hidden } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!grammy) missingFields.push("grammy");
    if (!hidden) missingFields.push("hidden");

    if (missingFields.length < 1) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: `Bad Request, Reason: ${missingFields.join(", ")}`,
        error: null,
      });
    }

    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found.",
        error: null,
      });
    }

    await artist.update({ name, grammy, hidden });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found.",
        error: null,
      });
    }

    const artistName = artist.name;
    await artist.destroy();

    res.status(200).json({
      status: 200,
      data: { artist_id: id },
      message: `Artist:${artistName} deleted successfully.`,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};
