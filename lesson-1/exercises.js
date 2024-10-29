function Book(title, author) {
  this.title = title;
  this.author = author;
  this.read = false;
  this.getDescription = function() {
    return `${this.title} was written by ${this.author}.`;
  };
  this.readBook = function() {
    this.read = true;
  };
}

let mythos = new Book("Mythos", "Stephen Fry");
let talkPretty = new Book("Me Talk Pretty One Day", "David Sedaris");
let aunts = new Book("Aunts aren't Gentleman", "PG Wodehouse");
mythos.getDescription();
talkPretty.readBook();
aunts.readBook();
aunts.getDescription();