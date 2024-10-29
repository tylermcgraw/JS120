/*
1. global object

2. obj. The difference is that now func is being called as a method of obj

3. "Hello from the global scope!"
   "Hello from the function scope!"

4. call and apply

5. code below. returns 3
*/

let foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add: function() {
    return this.a + this.b;
  },
};

bar.add.call(foo);