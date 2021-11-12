const axios = require("axios");
const { ARTISTS_API_BASE_URL, USERS_API_BASE_URL } = require("./config");

const getUser = async ({ userId }) => {
  const url = `${USERS_API_BASE_URL}/${userId}`;
  const { data } = await axios.get(url);
  return data;
};

const getUsers = async () => {
  const url = `${USERS_API_BASE_URL}`;
  const { data } = await axios.get(url);
  return data;
};

const getArtist = async ({ artistName }) => {
  const url = `${ARTISTS_API_BASE_URL}search.php?s=${artistName}`;

  const { data } = await axios.get(url);

  if (!data.artists[0]) return null;

  return data.artists[0];
};

const saveFavoriteArtist = async ({ artistName, userId }) => {
  const url = `${USERS_API_BASE_URL}/${userId}`;

  const [artistData, userData] = await Promise.all([
    getArtist({ artistName }),
    getUser({ userId }),
  ]);

  if (!artistData || !userData) return null;

  const { favoriteArtistsIds: currentFavorites } = userData;
  const { idArtist } = artistData;

  const alreadyFavorite = currentFavorites.includes(idArtist);
  if (alreadyFavorite) throw new Error("Artist already saved to favorites");

  const { data } = await axios.put(url, {
    ...userData,
    favoriteArtistsIds: [...currentFavorites, idArtist],
  });

  return data;
};

module.exports = {
  getUser,
  getUsers,
  getArtist,
  saveFavoriteArtist,
};
