// Rohit: Illustrating Prototypes in JavaScript.
// Run on Node, Deno, Bun or Browser
const cat = new Object({
	species: "cat",
	habit: "carnivore",
	legs: "quadraped",
});

const percy = Object.create(cat);

// Prototype just means 'parent object' to which you can attach properties or functions to expand functionality
Object.prototype.saySomething = function() {
	console.log("Meow!");
};

percy.saySomething();

// Example with a String
const name = new String("Samar Singh Chauhan");

// Custom Function
String.prototype.makeItBig = function() {
	return this.toUpperCase();
};

console.log(name.makeItBig());

// Example with an Array
const cars = ["Mercedes", "Maruti", "Fiat", "Hyundai", "Tata"];

// Custom Function
Array.prototype.iNeedM = function() {
	return this.filter((car) => car.startsWith("M"));
};

console.log(cars.iNeedM());



// Rohit: Illustrating this Context in JavaScript.
// Run on Node, Deno, Bun or Browser
const person1 = {
	name: "Samar",
	age: 14,
	class: 10,
	speak: function() {
		console.log(`${this.name} speaks Russian.`);
	},
};

const person2 = {
	name: "Samir",
	age: 11,
	class: 7,
};

person1.speak();
// bind returns a new function so add () to execute it instantly
person1.speak.bind(person2)();



// Rohit: Illustrating Closures in JavaScript.
// Run on Node, Deno, Bun or Browser
// Closure is nothing but just a 'function inside a function'

// Make General Multipliers with Closures
function makeMultiplier(multiplier) {
	// This function below encloses the 'multiplier' parameter with it as soon as it is returned in the next lines.
	return function(number) {
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
	// This function below encloses the 'domain' parameter with it as soon as it is returned in the next lines.
	return function(url) {
		console.log(`Your URL is: http://${url}.${domain}/`);
		return url + domain;
	};
}

const comMaker = makeUrl("com");
const netMaker = makeUrl("net");

comMaker("github");
netMaker("sourceforge");



// Rohit: Decorators in JavaScript
// -------------------------------
// While Closure is a function returning a function from inside a function with variables in
// outer functions arguments and also in inner functions scope attached or closed in even
// after the outer function executed and exited the call-stack.
// Conversely, Decorator is a function outside a function, taking that function as input
//  and returning a new function with added or decorated behavior.

// This type of behavior is seen in "Zustand" when you see its source, where the outer function 
// createStore accepts a createStateFn function. This can be seen as a form of Decorator behavior.
// Rest/Spread used ...
function decorator(originalFunction) {
	return function(...args) {
		console.log('Decoration started...');
		const result = originalFunction(...args);
		console.log('Decoration finished.');
		return result;
	};
}

function sayHello(...names) {
	console.log(`Hello! ${names}!`);
}

const decoratedSayHello = decorator(sayHello);
decoratedSayHello('Samar', 'Samir', 'Percy');



// Rohit: Method Chaining ES2022+ (Run on Bun!)
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
		if (n === 0) {
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



// Rohit: Illustrating the Callback Hell in JavaScript. See the next file for your salvation.
// Run on Node, Deno, Bun or Browser
function getData(dataId, getNextData) {
	console.log(`Getting data for ${dataId}...`);

	setTimeout(function() {
		console.log(`Fetched data for ${dataId}\n`);
		setTimeout(function() { getNextData(dataId) }, 1000); // Trigger the next data fetch after 1 second
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
