"use script";

const { LinRouter, NotFound } = require("lin-mizar");
const { Book } = require("../../models/book");
const { getSafeParamId } = require("../../libs/util");
const { Op } = require("sequelize");
const { BookSearchValidator } = require("../../validators/book");

const bookApi = new LinRouter({
  prefix: "/v1/book"
});

bookApi.get("/:id", async ctx => {
  const id = getSafeParamId(ctx);
  const book = await Book.findOne({
    where: {
      id,
      delete_time: null
    }
  });
  ctx.json(book);
});

bookApi.get("/search/one", async ctx => {
  const v = await new BookSearchValidator().validate(ctx);
  const book = await Book.findOne({
    where: {
      title: {
        [Op.like]: `%${v.get("query.q")}%`
      },
      delete_time: null
    }
  });
  if (!book) {
    throw new NotFound({
      msg: "没有相关书籍"
    });
  };
  ctx.json(book);
});
bookApi.get("/search/all", async ctx => {
  const v = await new BookSearchValidator().validate(ctx);
  const book = await Book.findAll({
    where: {
      title: {
        [Op.like]: `%${v.get("query.q")}%`
      },
      delete_time: null
    }
  });
  if (book.length === 0) {
    throw new NotFound({
      msg: "没有相关书籍"
    });
  };
  ctx.json(book);
});

module.exports = { bookApi };