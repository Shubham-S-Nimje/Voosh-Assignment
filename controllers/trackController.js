const Track = require("../models/track");
const Album = require("../models/album");
const Artist = require("../models/artist");

exports.getAllTracks = async (req, res) => {
  try {
    const { limit, offset, artist_id, album_id, hidden } = req.query;

    const artists = await Artist.findByPk(artist_id);
    const album = await Album.findByPk(album_id);

    if (!artists || !album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist",
        error: null,
      });
    }

    const tracks = await Track.findAll({
      where: { artist_id, album_id, hidden },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Artist,
          as: "artist",
          attributes: ["name"],
        },
        {
          model: Album,
          as: "album",
          attributes: ["name"],
        },
      ],
    });

    const formattedTracks = tracks.map((track) => ({
      track_id: track.trackId,
      artist_name: track.artist.name,
      album_name: track.album.name,
      name: track.name,
      duration: track.duration,
      hidden: track.hidden,
    }));

    res.status(200).json({
      status: 200,
      data: formattedTracks,
      message: "Tracks retrieved successfully.",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.getTrackById = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findByPk(id);
    const album = await Track.findOne({
      where: { album_id: track?.album_id },
    });
    const artist = await Track.findOne({
      where: { artist_id: track?.artist_id },
    });

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist.",
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        track_id: track?.trackId,
        artist_name: artist?.name,
        album_name: album?.name,
        name: track?.name,
        duration: track?.duration,
        hidden: track?.hidden,
      },
      message: "Track retrieved successfully.",
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

exports.addTrack = async (req, res) => {
  try {
    const { artist_id, album_id, name, duration, hidden } = req.body;

    const artist = await Artist.findByPk(artist_id);
    const album = await Album.findByPk(album_id);

    if (!artist || !album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: " Resource Doesn't Exist.",
        error: null,
      });
    }

    await Track.create({
      artist_id,
      album_id,
      name,
      duration,
      hidden,
    });

    res.status(201).json({
      status: 201,
      data: null,
      message: "Track created successfully.",
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

exports.updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, hidden } = req.body;
    const track = await Track.findByPk(id);

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist.",
        error: null,
      });
    }

    await track.update({ name, duration, hidden });
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

exports.deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findByPk(id);

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource Doesn't Exist.",
        error: null,
      });
    }

    const trackName = track.name;
    await track.destroy();

    res.status(200).json({
      status: 200,
      data: null,
      message: `Track:${trackName} deleted successfully.`,
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
