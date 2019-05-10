"use script";

const { LinValidator, Rule } = require("lin-mizar");

class BookSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule("isNotEmpty", "必须传入搜索关键字");
  }
}

class BookCreateOrUpdateValitator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule("isNotEmpty", "必须传入书名");
    this.author = new Rule("isNotEmpty", "必须传入作者");
    this.summary = new Rule("isNotEmpty", "必须传入图书描述");
    this.image = new Rule("isLength", "图书插图的url长度必须在0~100之间", {
      min: 1,
      max: 100
    });
  }
}

module.exports = {
  BookSearchValidator,
  BookCreateOrUpdateValitator
};