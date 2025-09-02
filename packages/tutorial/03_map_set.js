// Rohit: Illustrating Closures in JavaScript.
// Run on Node, Deno, Bun or Browser

// Closure is nothing but just a 'function inside a function'

// Make General Multipliers with Closures
function makeMultiplier(multiplier) {
  // This function below encloses the 'multiplier' parameter with it as soon as it is returned on lines 17 or 18
  return function (number) {
    console.log(
      `Number ${number} multiplied by ${multiplier} is ${number * multiplier}.`,
    );
    return number * multiplier;
  };
}

const twiceMultiplier = makeMultiplier(2);
const thriceMultiplier = makeMultiplier(3);

twiceMultiplier(24);
thriceMultiplier(24);

// Another Example: UrlMaker
function makeUrl(domain) {
  // This function below encloses the 'domain' parameter with it as soon as it is returned on lines 32 or 33
  return function (url) {
    console.log(`Your URL is: http://${url}.${domain}/`);
    return url + domain;
  };
}

const comMaker = makeUrl("com");
const netMaker = makeUrl("net");

comMaker("github");
netMaker("sourceforge");


// Rohit Chauhan: Method Chaining ES2022+ (Run on Bun!)
class Counter {
	
	// Private field
	#number = 0;
	
	plus() {
		this.#number++;
		return this;
	}
	
	minus() {
		this.#number--;
		return this;
	}
	
	multiply(n) {
		this.#number *= n;
		return this;
	}
	
	divide(n) {
		if(n === 0) {
			throw new Error("don't use zero");
		}
		this.#number /= n;
		return this;
	}
	
	get value() {
		return this.#number;
	}
	
	reset() {
		this.#number = 0;
		return this;
	}
	
	toString() {
		return this.#number.toString();
	}
	
	}
	
const counter = new Counter();

counter.plus().plus().plus().minus();
console.log(`${counter}`);

counter.plus().plus().multiply(8).divide(2);
console.log(`${counter}`);

// Rohit: Illustrating the Callback Hell in JavaScript.
// Run on Node, Deno, Bun or Browser

function getData(dataId, getNextData) {
    console.log(`Getting data for ${dataId}...`);

    setTimeout(function() {
        console.log(`Fetched data for ${dataId}\n`);
        setTimeout(function() {getNextData(dataId)}, 1000); // Trigger the next data fetch after 1 second
    }, 2000);
    
}

getData(1, function() { // First call
    getData(2, function() { // Second nested call 
        getData(3, function() { // Third call
             getData(4, function() { // Fourth call
                getData(5, function() { // Fifth call
                    console.log('ALL DATA FETCHED.');
                });
            });
        });
    });
});
