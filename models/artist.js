const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Artist = sequelize.define(
  "artists",
  {
    artistId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: "artist_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grammy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Artist;
