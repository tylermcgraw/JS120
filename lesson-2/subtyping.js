/*
Subtyping with Constructors and Prototypes
1. 'Hello!'
2. TypeError
3. 'undefined'
4. 'Goodbye'
5. TypeError
*/

/*
Suptyping with Classes
1. The Bingo play method would override the Game play method when
   Bingo.play is called. This is called method overriding.
2.
*/

class Greeting {
  greet(greeting) {
    console.log(greeting);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye");
  }
}

let hello = new Hello();
hello.hi();

let bye = new Goodbye();
bye.bye();