//---------------STRINGS-------------------\\
const airplane = 'Tap Air Texas';
const plane = 'A320';

console.log(airplane.indexOf('T')); // prints 8 (the position in the array includes spacing)
console.log(airplane.lastIndexOf('a'));// prints the last occurance of the value, 11
console.log(airplane.slice(4)); // extracts from position 4, prints Air Texas // if you want to use this it returns a new string and save it to a variable
console.log(airplane.slice(4, 7)); // it stops extracting before if reaches 7, prints - Air

console.log(airplane.slice(0, airplane.indexOf(' '))); // starts at posotion 0, and end at empty string
console.log(airplane.slice(airplane.lastIndexOf(' ') +1 )); // will extract everything after the last empty string, but have to add a + 1 to get rid of the space is prints

// if you place a negitive, it'll start extracting from the end of the string 

const checkMiddleSeat = function(seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('you got the middle seat')
  else console.log('you got lucky')

}
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('22E');

// Whenever we call a method on a string, JS converts that string primative to a string object with the same content, then its on that object that the methods are called
// (this is called boxing, takes our string and puts it into a box with is the object) then when the method is done, it is converted back into a reg primative str
// all string methods return primative values

// fixing capitalization example below:
const passenger = 'JoNaS';
const passLower = passenger.toLowerCase();
const passCorrect = passLower[0].toUpperCase + passLower.slice(1); // takes the lower case of jonas at positon 0 and turn
// it to an uppercase J, 
//then slice the name at position 1 and it will extract everything AFTER postion 1
console.log(passCorrect); // Jonas

// check email comparison
const email = 'hello1@yahoo.com'
const loginEmail = ' Hello1@Yahoo.com \n'

const lowerCase = loginEmail.toLowerCase().trim();
console.log(lowerCase === email);



// replacing
const priceEurope = '288,97E';
const priceUS = priceEurope.replace('E', '$').replace(',', '.');// can chain on replace method since it returns a new str value
console.log(priceUS); // 288.97$

// replace method only changes the FIRST occurance, example below
const accountment = 'All passengers come to boarding door 23! Boarding door 23.';
const firstChange = accountment.replace('door', 'gate'); //All passengers come to boarding gate 23! Boarding door 23.
// const change ALl = accountment.replaceAll('door', 'gate') try this out 

// another way to change all the door words is to use a regular expression, ex below:
console.log(accountment.replace(/door/g, 'gate'));// door is still a str but the g stands for global, so all occurances of door will be changed


// split returns a array of the values where you choose to split it at: example below:
console.log('a+very+nice+string'.split('+')); // ['a', 'very', 'nice', 'string']

// you can use this method to create variables with destructuring
const [firstName, lastName] = 'kristin desalme'.split(' ');
console.log(`Mrs. ${firstName} ${lastName}`); // Mrs. kristin desalme

// OR you can use the join method if you need to add elements to the str
const newName = ['Mrs', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // Mrs kristin DESALME

// NOW example of capitalizing first letter

const capitalLetter = function(name) {
    const names = name.split(' '); // splits at spaces and returns an array
    console.log(names)
    const newNameArray = [];
    
    
    for(const n of names) {
        // take empty array and push new value 
        // n represents each value in the array
        // so in each value take the 0 index (otherwords first letter) and make it an uppercase
        // then take that same value and slice it at index 1 which will extract everything after index 1 and combone the two expressions
        newNameArray.push(n[0].toUpperCase() + n.slice(1))
        
        // another way to write line 85
        // newNameArray.push(n.replace(n[0], n[0].toUpperCase()));
    }
    //console.log(newNameArray)
    console.log(newNameArray.join(' ')); // returns new string joining a space between each value in the new array 
}
capitalLetter('kristin kay desalme');
capitalLetter('briley crazy girl');

// you can add padding to the start and end of string 
// great example would be for a credit card

const maskCard = function(cardNum) {
   // console.log(cardNum)
    const str = cardNum + ''; // returns it in str value incase its just a number not a string of numbers
    //console.log(str);
    const last = str.slice(-4); // grab everything before the last 4 indexes
    console.log(last.padStart(str.length, '*')); // get the length of the card number known as str, and place a * 
}
maskCard('638726374')
maskCard(4632856398274893)

// REPEAT strings

const message2 = 'bad weather... all departures are late '
console.log(message2.repeat(5))

const planesInLine = function(n) {
    console.log(`there are ${n} planes in line ${'⛈ '.repeat(n)}`)
}
planesInLine(3)
planesInLine(5)