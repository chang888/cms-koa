// "use script";

// const { LinRouter, NotFound, Forbidden } = require("lin-mizar");
// const { Book } = require("../../models/book");
// const { getSafeParamId } = require("../../libs/util");
// const { Op } = require("sequelize");
// const { BookSearchValidator, BookCreateOrUpdateValitator } = require("../../validators/book");
// const { BookDao } = require("../../dao/book");

// const bookApi = new LinRouter({
//   prefix: "/v1/book"
// });

// const bookDto = new BookDao();

// // id获取书籍
// bookApi.get("/:id", async ctx => {
//   const id = getSafeParamId(ctx);
//   const book = await Book.findOne({
//     where: {
//       id,
//       delete_time: null
//     }
//   })
//   ctx.json(book);
// });

// // 关键字搜索单本
// bookApi.get("/search/one", async ctx => {
//   const v = await new BookSearchValidator().validate(ctx);
//   await bookDto.createBook(v);
//   ctx.success({
//     msg: "新建图书成功"
//   });
// });

// // 关键字搜索所有书籍
// bookApi.get("/search/all", async ctx => {
//   const v = await new BookSearchValidator().validate(ctx);
//   const book = await Book.findAll({
//     where: {
//       title: {
//         [Op.like]: `%${v.get("query.q")}%`
//       },
//       delete_time: null
//     }
//   });
//   if (book.length === 0) {
//     throw new NotFound({
//       msg: "没有相关书籍"
//     });
//   };
//   ctx.json(book);
// });

// // 创建书籍
// bookApi.post("/create", async ctx => {
//   const v = await new BookCreateOrUpdateValitator().validate(ctx);
//   console.log(3, v);
//   const book = await Book.findOne({
//     where: {
//       title: v.get("body.title"),
//       delete_time: null
//     }
//   });
//   if (!book) {
//     throw new Forbidden({
//       msg: "图书已存在"
//     });
//   }
//   ctx.json(book);
// });

// module.exports = { bookApi };