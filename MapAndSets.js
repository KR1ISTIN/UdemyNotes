//------------------------S E T S----------------------------------\\
//collection of data with unique values, no duplicates
// iterable goes inside the ()
// sets can also hold mixed data types
const orderSets = new Set(['pasta', 'pizza', 'pizza', 'risotto', 'pasta', 'pizza']);
console.log(orderSets); // this will print an object with set(3) {'pasta', 'pizza', 'risotta'} it gets rid of any dupilcates

console.log(orderSets.size);// returns a number with how many componets in that set
console.log(orderSets.has('pizza')); // checks to see if a value is in that set, returns a boolean 

orderSets.add('Noodles'); // will add to the set 
console.log(orderSets); // will add to the set 

orderSets.delete('risotto'); // will delete from set 
console.log(orderSets);

console.log(new Set('kristin')); // will print a set of 5, create a set with 5 values that match each letter in my name 

//orderSets.clear(); // clears everything from the set 

for(const order of orderSets) console.log(order); // prints individual values

const staff = ['waiter', 'waiter', 'host', 'manager', 'host', 'chef'];
const staffSet = new Set(staff);
console.log(staffSet); // prints out a set of 4  unqiue values
// now if we want to turn this new Set: staffSet back into an array, see below:
const staffSetArray = [...new Set(staff)];
console.log(staffSetArray);
// we can use the spread operator on iterables - reminder and a set is a iterable


// -------------------------MAPS---------------------------//
// maps are used to map values to keys
// in maps, the key can have any type 
// the values can be anything

const rest = new Map(); // initalize the map
rest.set('name', 'Pesto Italian'); // .set is like add to the map that was initalize
// name is the key and pesto italian is the value
rest.set(1, 'san antonio,tx');
rest.set(2, 'dallas,tx');
// .set also returns the newly updated map whic means we can chain, example below:
rest.set('categories', ["Focaccia", "Brushcetta", "Salad", "Garlic bread"]).set('open', 11).set('close', 3).set(true, 'we are open').set(false, 'we are closed');
// get get data from a map, we use the "get" method example below:
console.log(rest.get('name')); // prints Pesto Italian
console.log(rest.get(true)); // prints we are open

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// both statements above represent a boolean, either true or false, so if both are true, true will end up being the key and vise versa for close except it'll be flase 
// which then will result in printing the key "true or false" and the the value will be either 'we are open' or 'we are closed'

// checking for a value
console.log(rest.has('categories')); // return is true 
console.log(rest.delete(2)); // 2 represents they key which is line 368

//rest.set(document.querySelector('.hi'), 'heading'); // will return an object just an example

