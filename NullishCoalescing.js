//------------------------- Nullish Coalescing Operator (??)---------------------\\

// the example below bc of short circuit, the || (or) operator will look for the first truthy value,
//so bc 0 is a falsey value, it will default to 10,
//but if you actually know the value of guest is 0,
//use the Nullish Coalescing Operator, Nullish values are null or undefined

const rest1 = {
    name: "Capri",
    numGuest: 0,
  };
  
  const rest2 = {
    name: "Cooper",
    owner: "kristin",
  };
  rest1.numGuest ??= 10;
  rest2.numGuest ??= 10;
  console.log(rest1); // numGuest prints 0
  console.log(rest2); // numGuest prints 10
  // rest 1 prints 0 bc rest1 has a value of 0 and not null or undefined itll print the working knowledge
  // rest2 prints 10 bc there is no such thing has numGuest which evals down to undefine or null so itll print 10 its default value
  
  // Logical assignment operator
  rest1.owner &&= "ANONMOYMOUS";
  rest2.owner &&= "ANONMOYMOUS";
  console.log(rest1); // will stay the same bc the first statement is falsey since there is no owner
  console.log(rest2); // since there is an owner the first is truthey, so itll read the second statement which is false and print that
  // so if you ever need to assign a value to a variable that is already defined, you can use &&=
  