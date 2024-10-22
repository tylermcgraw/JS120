/*
1. 2 (both baz and foo have a property foo of value 1)

2. 3 (baz's foo value is assigned to 2, but qux's foo value remains 1)

3. 4 (when qux's foo value is changed, baz's foo value is also changed because
  it inherits this value from qux)

4. Below
*/

function assignProperty(obj, prop, val) {
  if (obj.hasOwnProperty(prop)) {
    obj[prop] = val;
  } else if (Object.getPrototypeOf(obj) !== null) {
    assignProperty(Object.getPrototypeOf(obj), prop, val);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

/*
5. No, for in iterates over foo's and prototype's properties,
   whereas Object.keys iterates over only foo's properties

6. obj.create(null)
   Object.getPrototypeOf(obj) === null
*/