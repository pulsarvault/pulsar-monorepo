// Rohit: Beat the Blobs
use macroquad::prelude::*;
// rand 0.9 crate has conflict with macroquad rand module so need extern create to avoid namespacing issue
extern crate rand as external_rand;

// The Blob
struct Circle {
    x: f32,
    y: f32,
    radius: f32,
    y_speed: f32,
    x_speed: f32,
}

impl Circle {
    fn new() -> Self {
        let mut rng = external_rand::rng();
        Self {
            x: external_rand::Rng::random_range(&mut rng, 0.0..screen_width()),
            y: -20.0,
            radius: 20.0,
            y_speed: external_rand::Rng::random_range(&mut rng, 2.0..5.0),
            x_speed: external_rand::Rng::random_range(&mut rng, -2.0..2.0),
        }
    }

    fn update(&mut self) {
        self.y += self.y_speed;
        self.x += self.x_speed;

        if self.x - self.radius <= 0.0 || self.x + self.radius >= screen_width() {
            self.x_speed = -self.x_speed;
        }
    }

    fn draw(&self) {
        draw_circle(self.x, self.y, self.radius, RED);
    }
}

#[macroquad::main("BEAT THE BLOBS")]
async fn main() {
    let mut circles = vec![];
    let mut player_x = screen_width() / 2.0;
    let player_y = screen_height() - 30.0;
    let player_width = 80.0;
    let player_height = 20.0;
    let mut score = 0;
    let mut game_over = false;

    loop {
        if !game_over {
            if external_rand::random::<f32>() < 0.02 {
                circles.push(Circle::new());
            }

            if is_key_down(KeyCode::Left) {
                player_x -= 5.0;
            }
            if is_key_down(KeyCode::Right) {
                player_x += 5.0;
            }
//clamp to restrict range
            player_x = player_x.clamp(0.0, screen_width() - player_width);

            clear_background(BLACK);

            for circle in &mut circles {
                circle.update();
                circle.draw();

                if circle.y + circle.radius >= player_y
                    && circle.x + circle.radius >= player_x
                    && circle.x - circle.radius <= player_x + player_width
                {
                    game_over = true;
                }
            }

            circles.retain(|c| c.y - c.radius <= screen_height());

            draw_rectangle(player_x, player_y, player_width, player_height, BLUE);
            score += 1;
        } else {
            draw_text("Game Over", screen_width() / 2.0 - 100.0, screen_height() / 2.0, 50.0, RED);
            draw_text("Press SPACE to Restart", screen_width() / 2.0 - 150.0, screen_height() / 2.0 + 60.0, 30.0, WHITE);
            if is_key_pressed(KeyCode::Space) {
                circles.clear();
                player_x = screen_width() / 2.0;
                score = 0;
                game_over = false;
            }
        }

        draw_text(&format!("Score: {}", score), 10.0, 30.0, 30.0, WHITE);
        draw_text("ROHIT CHAUHAN", screen_width() - 200.0, 30.0, 30.0, WHITE);

        next_frame().await;
    }
}

