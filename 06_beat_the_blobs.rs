// Rohit: Beat the Blobs for Samar/Samir in Rust
use macroquad::prelude::*;
use macroquad::rand::*;

// Defining Enemy Blob
struct Blob {
    radius: f32,
    position: Vec2,
    speed: Vec2,
}

impl Blob {
    fn new() -> Self {
        Self {
            radius: 20.0,
            position: vec2(gen_range(0.0, screen_width()), -20.0),
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

// Defining Player
struct Player {
    position: Vec2,
    player_width: f32,
    player_height: f32,
    player_score: u32,
}

impl Player {
    fn new() -> Self {
        Self {
            position: vec2(screen_width() / 2.0, screen_height() - 30.0),
            player_width: 80.0,
            player_height: 20.0,
            player_score: 0,
        }
    }
}

// The Game Loop
#[macroquad::main("BEAT THE BLOBS")]
async fn main() {
    let mut game_over = false;
    let mut blobs = vec![];
    let mut player = Player::new();

    loop {
        if !game_over {
            if gen_range(0, 51) < 2 {
                blobs.push(Blob::new());
            }

            if is_key_down(KeyCode::Left) {
                player.position.x -= 10.0;
            }
            if is_key_down(KeyCode::Right) {
                player.position.x += 10.0;
            }

            player.position.x = player
                .position
                .x
                .clamp(0.0, screen_width() - player.player_width);

            clear_background(BLACK);

            for blob in &mut blobs {
                blob.update();
                blob.draw();

                if blob.position.y + blob.radius >= player.position.y
                    && blob.position.x + blob.radius >= player.position.x
                    && blob.position.x - blob.radius <= player.position.x + player.player_width
                {
                    game_over = true;
                }
            }

            blobs.retain(|c| c.position.y - c.radius <= screen_height());

            draw_rectangle(
                player.position.x,
                player.position.y,
                player.player_width,
                player.player_height,
                BLUE,
            );
            player.player_score += 1;
        } else {
            draw_text(
                "Game Over",
                screen_width() / 2.0 - 100.0,
                screen_height() / 2.0,
                50.0,
                RED,
            );
            draw_text(
                "Press SPACE to Restart",
                screen_width() / 2.0 - 150.0,
                screen_height() / 2.0 + 60.0,
                30.0,
                WHITE,
            );
            if is_key_pressed(KeyCode::Space) {
                blobs.clear();
                player.position.x = screen_width() / 2.0;
                player.player_score = 0;
                game_over = false;
            }
        }

        draw_text(
            &format!("Score: {}", player.player_score),
            10.0,
            30.0,
            30.0,
            WHITE,
        );
        draw_text("ROHIT CHAUHAN", screen_width() - 200.0, 30.0, 30.0, WHITE);

        next_frame().await;
    }
}
