export const search = async (extquery) => {
  const res = await axios.get(
    `https://brains.tradingeconomics.com/v2/search/` + extquery, {
      params: {
        q: searchTerm,
        pp: 50,
        p: 0,
        stance: 2,
      },
    }
  );
  return res; // return list of country names
};