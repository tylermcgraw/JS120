// 1
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

  set age(years) {
    this.#age = years;
  }

  showAge() {
    console.log(this.#age);
  }
}

let person = new Person('John', 30);
person.showAge(); // 30
person.age = 31;
person.showAge(); // 31

try {
  // This line should raise a RangeError,
  // but does not.
  person.age = -5;
  person.showAge(); // -5
} catch (e) {
  // The following line should run, but won't
  console.log('RangeError: Age must be positive');
}

// 2
class Book {
  #title;
  #author;
  #year;
  constructor (title, author, year) {
    this.#title = title;
    this.#author = author;
    this.year = year;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get year() {
    return this.#year;
  }

  set year(year) {
    if (year < 1900) {
      throw new RangeError("Year must be >= 1900");
    } else {
      this.#year = year;
    }
  }
}

let book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
console.log(book.title);  // The Great Gatsby
console.log(book.author); // F. Scott Fitzgerald
console.log(book.year);   // 1925

book.year = 1932;         // Changing year
console.log(book.year);   // 1932

try {
  book.year = 1825;
} catch (e) {
  console.log(e);   // RangeError: Invalid year
}

try {
  let book2 = new Book('A Tale of Two Cities', 'Charles Dickents', 1859);
} catch (e) {
  console.log(e);   // RangeError: Invalid year
}

// 3
class BankAccount {
  #balance;

  constructor () {
    this.#balance = 0;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (this.#balance - amount < 0) {
      throw new RangeError("Insufficient funds");
    } else {
      this.#balance -= amount;
    }
  }

  #checkBalance() {
    console.log(this.#balance);
  }
}

let account = new BankAccount();
account.deposit(100);
account.withdraw(50);
account.withdraw(100); // RangeError: Insufficient funds