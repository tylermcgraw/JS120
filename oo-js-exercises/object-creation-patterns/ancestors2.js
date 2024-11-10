// name property added to make objects easier to identify
const foo = {
  name: 'foo',
  ancestors() {
    let proto = Object.getPrototypeOf(this);
    return proto === Object.prototype ? ['Object.prototype']
      : [proto.name].concat(proto.ancestors());
  }
};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']