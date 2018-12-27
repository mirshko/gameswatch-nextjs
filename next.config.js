
// temp fix for issue of the es6 import vs common js import
var sanityClient = require("@sanity/client");

var client = sanityClient({
  projectId: "foij3hbc",
  dataset: "production",
  useCdn: true
});

module.exports = {
  // Make sure that your node enviroment supports async/await
  exportPathMap: async function(defaultPathMap) {
    const getGameRoutes = await client
      .fetch('*[_type == "game" && !(_id in path("drafts.**"))]._id')
      .then(data =>
        data.reduce(
          (acc, _id) => ({
            ...acc,
            [`/game/${_id}`]: { page: "/game", query: { id: _id } }
          }),
          {}
        )
      )
      .catch(console.error);

    const getCategoriesRoutes = await client
      .fetch('*[_type == "categoryType" && !(_id in path("drafts.**"))]._id')
      .then(data =>
        data.reduce(
          (acc, _id) => ({
            ...acc,
            [`/categories/${_id}`]: {
              page: "/categories",
              query: { categoryTypeId: _id }
            }
          }),
          {}
        )
      )
      .catch(console.error);

    const getTagRoutes = await client
      .fetch('*[_type == "tag" && !(_id in path("drafts.**"))]._id')
      .then(data =>
        data.reduce(
          (acc, _id) => ({
            ...acc,
            [`/tag/${_id}`]: {
              page: "/tag",
              query: { id: _id }
            }
          }),
          {}
        )
      )
      .catch(console.error);

    const getGameshotRoutes = await client
      .fetch('*[_type == "gameshot" && !(_id in path("drafts.**"))]._id')
      .then(data =>
        data.reduce(
          (acc, _id) => ({
            ...acc,
            [`/gameshot/${_id}`]: { page: "/gameshot", query: { id: _id } }
          }),
          {}
        )
      )
      .catch(console.error);

    const paths = {
      ...getGameRoutes,
      ...getTagRoutes,
      ...getGameshotRoutes,
      ...getCategoriesRoutes,
      "/": { page: "/" },
      "/games": { page: "/games" },
      "/about": { page: "/about" }
    };

    return paths;
  }
};
