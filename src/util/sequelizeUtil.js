export const paginate = (page = 0, pageSize = 10) => {
  const offset = page * pageSize;
  const limit = pageSize;
  return {
    offset,
    limit
  };
};

export const errorResolver = (err, res) => {
  if (err.errors) {
    return res.status(400).json(err.errors[0].message);
  }
  console.error(err);
  return res.status(400).json({ error: 'Try again later' });
};
