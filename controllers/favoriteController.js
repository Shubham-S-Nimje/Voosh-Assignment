const Favorite = require("../models/favorite");
const Artist = require("../models/artist");
const Album = require("../models/album");
const Track = require("../models/track");

exports.getFavoritesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit, offset } = req.query;
    const userId = req.user.userId;

    if (!["artist", "album", "track"].includes(category)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid category.",
        error: null,
      });
    }

    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Artist,
          as: "artist",
          required: category === "artist",
          attributes: ["name"],
        },
        {
          model: Album,
          as: "album",
          required: category === "album",
          attributes: ["name"],
        },
        {
          model: Track,
          as: "track",
          required: category === "track",
          attributes: ["name"],
        },
      ],
    });

    // console.log(favorites);

    const formattedFavorites = favorites.map((fav) => ({
      favorite_id: fav.favoriteId,
      category,
      item_id:
        category === "artist"
          ? fav.artist_id
          : category === "album"
          ? fav.album_id
          : fav.track_id,
      name:
        category === "artist"
          ? fav.artist?.name
          : category === "album"
          ? fav.album?.name
          : fav.track?.name,
      created_at: fav.created_at,
    }));

    res.status(200).json({
      status: 200,
      data: formattedFavorites,
      message: "Favorites retrieved successfully.",
      error: null,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;
    const userId = req.user.userId;

    // console.log(userId, req.user);

    // Verify item exists based on category
    let item;
    switch (category) {
      case "artist":
        item = await Artist.findByPk(item_id);
        break;
      case "album":
        item = await Album.findByPk(item_id);
        break;
      case "track":
        item = await Track.findByPk(item_id);
        break;
      default:
        return res.status(400).json({
          status: 400,
          data: null,
          message: "Invalid category.",
          error: "Category not recognized.",
        });
    }

    if (!item) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Resource doesn't exist.",
        error: "Item not found in the database.",
      });
    }

    // console.log(item);

    // Check if already favorited
    const existing = await Favorite.findOne({
      where: {
        user_id: userId,
        [`${category}_id`]: item_id,
      },
    });

    if (existing) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Item already in favorites.",
        error: "Item is already favorited.",
      });
    }

    // Create a new favorite entry
    const newFavorite = await Favorite.create({
      user_id: userId,
      [`${category}_id`]: item_id,
    });

    return res.status(201).json({
      status: 201,
      data: null,
      message: "Favorite added successfully.",
      error: null,
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
      error: error.message || "Something went wrong.",
    });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const favorite = await Favorite.findOne({
      where: {
        favorite_id: id,
        user_id: userId,
      },
    });

    if (!favorite) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Favorite not found.",
        error: null,
      });
    }

    await favorite.destroy();

    res.status(200).json({
      status: 200,
      data: null,
      message: "Favorite removed successfully.",
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
