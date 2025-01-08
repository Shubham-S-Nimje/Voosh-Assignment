const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const csp = require("./config/csp");
const corsOptions = require("./config/corsOption");
const sequelize = require("./utils/database");

// Import modals
const AlbumTable = require("./models/album");
const ArtistTable = require("./models/artist");
const FavoriteTable = require("./models/favorite");
const TrackTable = require("./models/track");
const UserTable = require("./models/user");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes");
const trackRoutes = require("./routes/trackRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const { PORT, BASE_URL } = process.env;
const app = express();
app.use(csp);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/artists", artistRoutes);
app.use("/api/v1/albums", albumRoutes);
app.use("/api/v1/tracks", trackRoutes);
app.use("/api/v1/favorites", favoriteRoutes);

// Database associations
AlbumTable.hasMany(TrackTable, {
  foreignKey: "album_id",
  as: "tracks",
});

AlbumTable.belongsTo(ArtistTable, {
  foreignKey: "artist_id",
  as: "artist",
});

// Artist - Track Relationship
ArtistTable.hasMany(AlbumTable, {
  foreignKey: "artist_id",
  as: "albums",
});

ArtistTable.hasMany(TrackTable, {
  foreignKey: "artist_id",
  as: "tracks",
});

// Artist and Track Relationship
TrackTable.belongsTo(ArtistTable, {
  foreignKey: "artist_id",
  as: "artist",
});

TrackTable.belongsTo(AlbumTable, {
  foreignKey: "album_id",
  as: "album",
});

// Favorite Table Associations
FavoriteTable.belongsTo(UserTable, {
  foreignKey: "user_id",
  as: "user",
});

FavoriteTable.belongsTo(ArtistTable, {
  foreignKey: "artist_id",
  as: "artist",
});

FavoriteTable.belongsTo(AlbumTable, {
  foreignKey: "album_id",
  as: "album",
});

FavoriteTable.belongsTo(TrackTable, {
  foreignKey: "track_id",
  as: "track",
});

UserTable.hasMany(FavoriteTable, {
  foreignKey: "user_id",
  as: "favorites",
});

AlbumTable.hasMany(FavoriteTable, {
  foreignKey: "album_id",
  as: "favorites",
});

TrackTable.hasMany(FavoriteTable, {
  foreignKey: "track_id",
  as: "favorites",
});

// Start server
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to start server:", err);
  });

module.exports = app;
