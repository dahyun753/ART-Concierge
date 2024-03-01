const pagination = async (
  page,
  perPage,
  model,
  filter = {},
  select = "",
  sort = {},
  populate = ""
) => {
  const query = model
    .find(filter)
    .select(select)
    .sort(sort)
    .skip(perPage * (page - 1))
    .limit(perPage);

  if (populate) {
    query.populate(populate);
  }

  const total = await model.countDocuments(filter);
  const datas = await query;
  const totalPage = Math.ceil(total / perPage);

  return { datas, page, perPage, totalPage, total };
};

module.exports = pagination;
