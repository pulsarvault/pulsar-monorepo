#![warn(clippy::all)]
// Rohit: Illustrating Vectors in Rust

fn main() {
 
 let mut vec: Vec<i32> = vec![1, 2, 3, 4];
 
 for i in &vec {
     println!("{i}");
 }
 
 vec.push(5);
 println!("{vec:?}");
 
 let popped: Option<i32> = vec.pop();
 
 match popped {
     Some(value) =>  println!("Popped: {value}"),
     None => println!("Index out of bounds"),
 }
 
 println!("{vec:?}");

// Creating a Vector with different types using Enum
    enum Things {
        Apple(i32),
        Person(String),
        Exists(bool),
    }

    let mut things = vec![
        Things::Apple(42),
        Things::Person("Rohit".to_string()),
        Things::Exists(true),
    ];

    things.push(Things::Apple(56));

    for thing in &things {
        match thing {
            Things::Apple(count) => println!("Apple count: {}", count),
            Things::Person(name) => println!("Person: {}", name),
            Things::Exists(status) => println!("Exists: {}", status),
        }
    }
}
