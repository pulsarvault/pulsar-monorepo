use macroquad::prelude::*;
use macroquad::rand::*;

struct Blob {
    radius: f32,
    position: Vec2,
    speed: Vec2,
}

impl Blob {
    fn new() -> Self {
        Self {
            radius: 20.0,
            position: vec2(gen_range(0.0, screen_width()),-20.0),
            speed: vec2(gen_range(-10.0, 10.0), gen_range(10.0, 10.0)),
        }
    }

    fn update(&mut self) {
        self.position.x += self.speed.x;
        self.position.y += self.speed.y;

        if self.position.x - self.radius <= 0.0 || self.position.x + self.radius >= screen_width() {
            self.speed.x = -self.speed.x;
        }
    }

    fn draw(&self) {
        draw_circle(self.position.x, self.position.y, self.radius, RED);
    }
}

#[macroquad::main("BEAT THE BLOBS")]
async fn main() {
    let mut blobs = vec![];
    let mut player_x = screen_width() / 2.0;
    let player_y = screen_height() - 30.0;
    let player_width = 80.0;
    let player_height = 20.0;
    let mut score = 0;
    let mut game_over = false;

    loop {
        if !game_over {
            if gen_range(0, 51) < 2 {
                blobs.push(Blob::new());
            }

            if is_key_down(KeyCode::Left) {
                player_x -= 5.0;
            }
            if is_key_down(KeyCode::Right) {
                player_x += 5.0;
            }

            player_x = player_x.clamp(0.0, screen_width() - player_width);

            clear_background(BLACK);

            for blob in &mut blobs {
                blob.update();
                blob.draw();

                if blob.position.y + blob.radius >= player_y
                    && blob.position.x + blob.radius >= player_x
                    && blob.position.x - blob.radius <= player_x + player_width
                {
                    game_over = true;
                }
            }

            blobs.retain(|c| c.position.y - c.radius <= screen_height());

            draw_rectangle(player_x, player_y, player_width, player_height, BLUE);
            score += 1;
        } else {
            draw_text("Game Over", screen_width() / 2.0 - 100.0, screen_height() / 2.0, 50.0, RED);
            draw_text("Press SPACE to Restart", screen_width() / 2.0 - 150.0, screen_height() / 2.0 + 60.0, 30.0, WHITE);
            if is_key_pressed(KeyCode::Space) {
                blobs.clear();
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

