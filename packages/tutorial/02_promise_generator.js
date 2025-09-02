// Rohit: Illustrating Promises in JavaScript.
// Run on Node, Deno, Bun or Browser

// resolve and reject are just handlers/hooks/lambdas/closures/delegates/interceptors/middlewares
// All the above shibboleths mentioned are just crazy buzzwords for one thing -> Callback Function
const promise = new Promise((resolve, reject) => {
	const data = {
		firstName: "Samar",
	};

	console.log(`Initial Data: ${JSON.stringify(data)}`);

	setTimeout(() => {
		data.middleName = "Singh";
		resolve(data);
	}, 2000);
});

promise
	.then((data) => {
		console.log(`Data updated with middleName: ${JSON.stringify(data)}`);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				data.lastName = "Chauhan";
				resolve(data);
			}, 2000);
		});
	})
	.then((data) => {
		console.log(`Data updated with lastName: ${JSON.stringify(data)}`);
	})

	.finally(() => console.log(`COMPLETED.`));



// Rohit: Function to fetch data from JSONPlaceholder API
// Run on Node, Deno, Bun or Browser
async function fetchData(url) {
	try {
		// Use the fetch API to make a GET request
		const response = await fetch(url);

		// Check if the response is ok (status code 200-299)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Parse the JSON data from the response
		const data = await response.json();

		// Return the parsed data
		return data;
	} catch (error) {
		// Handle any errors that occur during the fetch
		console.error('Error fetching data:', error);
	}
}

// Main function to run the example
async function main() {
	// URL to fetch a list of posts from JSONPlaceholder
	const url = 'https://jsonplaceholder.typicode.com/posts';

	// Fetch the data
	const posts = await fetchData(url);

	// Log the fetched posts to the console
	console.log('Fetched Posts:', posts);
}

// Run the main function
main();



// Rohit: Illustrating Generator in JavaScript.
// Run on Node, Deno, Bun or Browser

// Define a generator function that yields a sequence of numbers
function* numberGenerator() {
	let number = 1;

	// Infinite loop to keep generating numbers
	while (true) {
		// Yield the current number and pause the generator
		yield number;

		// Increment the number for the next yield
		number++;
	}
}

// Create an instance of the generator
const generator = numberGenerator();

// Use the generator to get the first 5 numbers in the sequence
for (let i = 0; i < 5; i++) {
	// Get the next value from the generator
	const nextNumber = generator.next().value;

	// Log the value to the console
	console.log(`Generated number: ${nextNumber}`);
}
