const Favorite = require("../models/favorite");
const Artist = require("../models/artist");
const Album = require("../models/album");
const Track = require("../models/track");

exports.getAllAlbums = async (req, res) => {
  try {
    const { limit, offset, artist_id, hidden } = req.query;

    const artists = await Artist.findByPk(artist_id);

    if (!artists) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found, not valid artist ID",
        error: null,
      });
    }

    const album = await Album.findAll({
      where: { artist_id, hidden },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Album not found.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        album_id: album?.[0]?.albumId,
        artist_name: album?.[0]?.name,
        name: album?.[0]?.name,
        year: album?.[0]?.year,
        hidden: album?.[0]?.hidden,
      },
      message: "Album fetched successfully.",
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

exports.getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByPk(id);

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        album_id: album?.albumId,
        artist_name: album?.name,
        name: album?.name,
        year: album?.year,
        hidden: album?.hidden,
      },
      message: "Album retrieved successfully.",
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

exports.addAlbum = async (req, res) => {
  try {
    const { artist_id, name, year, hidden } = req.body;

    const artist = await Artist.findByPk(artist_id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist",
        error: null,
      });
    }

    await Album.create({
      artist_id,
      name,
      year,
      hidden,
    });

    res.status(201).json({
      status: 201,
      data: null,
      message: "Album created successfully.",
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

exports.updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, hidden } = req.body;
    const album = await Album.findByPk(id);

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist",
        error: null,
      });
    }

    await album.update({ name, year, hidden });
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

exports.deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByPk(id);

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist",
        error: null,
      });
    }

    const albumName = album.name;
    await album.destroy();

    res.status(200).json({
      status: 200,
      data: null,
      message: `Album:${albumName} deleted successfully.`,
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
