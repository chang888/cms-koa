"use script";

// import { LinValidator } from "lin-mizar";

const { LinValidator, Rule } = require("lin-mizar");

class BookSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule("isNotEmpty", "必须传入搜索关键字");
  };
};

module.exports = { BookSearchValidator };