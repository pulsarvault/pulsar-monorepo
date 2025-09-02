// Rohit: Create AI using Maximizer and Minimizer in a Game Tree

// Rohit Chauhan: Recursion First!
function factorial(n: number): number {
	if (n < 0) throw new Error("No factorial for negatives!");
	// Base case. Where the Call stack unwinds.
	if (n === 1) return 1;
	return n * factorial(n - 1);
}

console.log(factorial(5));

// Fibonacci: Find the n-th fibonacci number.
// Continue towards the base-case in 2 branches every step, since we only know fib(0) and fib(1)
function fib(n: number): number {
	if (n < 0) throw new Error("No Fibonacci for negatives!");
	// Base case when n is 1 or 0
	if (n <= 1) return n;
	return fib(n - 1) + fib(n - 2);
}
console.log(fib(5));

// Memoized Fibonacci: Use Map<number, number> for caching
function fibMemo(n: number, cache: Map<number, number> = new Map()) {
	if (n < 0) throw new Error("No Fibonacci for negatives!");
	// ! is the non-null assertion operator. We tell TypeScript that value is definitely here
	if (cache.has(n)) return cache.get(n)!;
	if (n <= 1) return n;

	// Compute and Cache
	const value = fibMemo(n - 1, cache) + fibMemo(n - 2, cache);
	cache.set(n, value);
	return value;
}

console.log(`${fibMemo(20)}`);
