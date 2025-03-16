use core::f64;
use std::f64::consts::PI;

enum Shape {
    Square(f64),
    Rectangle(f64, f64),
    Circle(f64),
}

fn calculate_area(shape: Shape) -> f64 {
    match shape {
        Shape::Square(s) => s * s,
        Shape::Rectangle(a, b) => a * b,
        Shape::Circle(r) => PI * r * r,
    }
}

fn main() {
    {
        let square = Shape::Square(10.0);
        println!("Area: {}", calculate_area(square));
        let rect = Shape::Rectangle(2.0, 3.0);
        println!("Area: {}", calculate_area(rect));
        let circle = Shape::Circle(9.0);
        println!("Area: {}", calculate_area(circle));
    }
}
