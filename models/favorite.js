const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Favorite = sequelize.define(
  "favorites",
  {
    favoriteId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: "favorite_id",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Favorite;
