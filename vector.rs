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
 
}
