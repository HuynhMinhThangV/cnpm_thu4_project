const getCurrentParams = (location) => {
  const paths = location.pathname.split("/").filter(Boolean);
  return paths[paths.length - 1];
};
const getCurrentQuery = (location) => {
  return new URLSearchParams(location.search);
};

export { getCurrentParams, getCurrentQuery };
