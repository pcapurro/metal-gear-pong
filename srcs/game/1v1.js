// < game class > //

class LocalGame1v1
{
    constructor()
    {
        this.player_nb = 2;
        this.scores = [0, 0];

        this.game_width = 1100;
        this.game_height = 720;

        this.bar_speed = 10;
        this.bar_height = 90;
        this.bar_width = 10;

        this.ball_speed = 10;
        this.ball_height = 30;
        this.ball_width = 30;

        this.separator_height = 20;
        this.separator_width = 2;
        this.separator_space = 17;

        this.text_size = 85;

        this.text_font = "Arial";

        this.bonus_color = "green";

        this.ball_direction = getRandomDirection();

        this.alert = 0;

        this.canvas = document.getElementById('game_canvas');
        this.display = this.canvas.getContext('2d');

        this.canvas.width = this.game_width;
        this.canvas.height = this.game_height;

        if (theme == "light")
        {
            this.menu_color = "black";
            this.background_color = "white";
            this.bar_color = "black";
            this.ball_color = "black";
        }
        else
        {
            this.menu_color = "white";
            this.background_color = "black";
            this.bar_color = "white";
            this.ball_color = "white";
        }

        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.game_width, this.game_height);

        let x_bar_center = (this.game_width / 2) - (this.separator_width / 2);
        let nb = ~~(this.game_height / (this.separator_height + this.separator_space));

        this.display.fillStyle = this.menu_color;
        for (let value = 0; value != nb; value++)
        {
            this.display.fillRect(x_bar_center, ((this.separator_height * value) + this.separator_space * (value + 1)), this.separator_width, this.separator_height);
        }

        let score_y = this.game_height / 6;
        let left_score_x = (this.game_width / 4) - (this.display.measureText("0").width);
        let right_score_x = (this.game_width - this.game_width / 4) - (this.display.measureText("0").width);

        this.display.fillStyle = this.bar_color;

        this.display.font = this.text_size + "px " + this.text_font;
        this.display.fillText(this.scores[0], left_score_x, score_y);
        this.display.fillText(this.scores[1], right_score_x, score_y);

        let left_player_data = {
            game: this,

            object_width: this.bar_width,
            object_heigth : this.bar_height,

            map_x: 0 + this.bar_width,
            map_y: ((this.game_height / 2) - this.bar_height / 2),

            bar_speed: this.bar_speed,
            color: this.bar_color
        }

        let right_player_data = {
            game: this,

            object_width: this.bar_width,
            object_heigth : this.bar_height,

            map_x: ((this.game_width - this.bar_width) - this.bar_width),
            map_y: ((this.game_height / 2) - this.bar_height / 2),

            bar_speed: this.bar_speed,
            color: this.bar_color
        }

        this.left_player = new Bar1v1(...Object.values(left_player_data));
        this.right_player = new Bar1v1(...Object.values(right_player_data));

        let x, y;

        x = this.game_width / 2 - (this.ball_width / 2);
        y = this.game_height / 2 - (this.ball_width / 2);

        let ball_data = {
            game: this,

            object_width: this.ball_width,
            object_heigth: this.ball_height,

            x_pos : x,
            y_pos : y,

            speed: this.ball_speed,
            color: this.ball_color,

            direction : this.ball_direction,
            bonus_speed: 0
        }

        this.ball = new Ball(...Object.values(ball_data));

        let bonus_one_data = {
            game: this,

            object_width: this.ball_width,
            object_heigth: this.ball_height,

            x_pos : (this.game_width / 4),
            y_pos : (this.game_height / 2),

            speed: 2,
            color: this.bonus_color,

            direction : this.ball_direction,
            name: 1,
        }

        let bonus_two_data = {
            game: this,

            object_width: this.ball_width,
            object_heigth: this.ball_height,

            x_pos : (this.game_width / 2 + (this.game_width / 4)),
            y_pos : (this.game_height / 2),

            speed: 2,
            color: this.bonus_color,

            direction : this.ball_direction + 90,
            name: 2,
        }

        this.bonus_one = new PowerUp(...Object.values(bonus_one_data));
        this.bonus_two = new PowerUp(...Object.values(bonus_two_data));

        let the_sounds = {
            limit: document.getElementById('knock_sound'),
            powerup: document.getElementById('bonus_sound')
        }

        the_sounds.limit.volume = 0.4;
        the_sounds.powerup.volume = 0.4;

        this.sounds = the_sounds;

        this.life_left = new Image();
        this.life_right = new Image();
    
        if (theme == "light")
            this.life_left.src = 'materials/images/dark-left-life-100.png', this.life_right.src = 'materials/images/dark-right-life-100.png';
        else
            this.life_left.src = 'materials/images/light-left-life-100.png', this.life_right.src = 'materials/images/light-right-life-100.png';
    }

    refreshDisplay()
    {
        this.refreshPreference();
        this.refreshBackground();
        this.refreshScores();
        this.refreshPlayers();
        this.refreshLives();
        this.refreshBall();

        if (mode != "classic")
            this.refreshBonus();
    }

    refreshPreference()
    {
        if (theme == "light")
        {
            this.menu_color = "black";
            this.background_color = "white";
            this.bar_color = "black";
            this.ball_color = "black";

            this.life_left.src = 'materials/images/dark-left-life-100.png';
            this.life_right.src = 'materials/images/dark-right-life-100.png';
        }
        else
        {
            this.menu_color = "white";
            this.background_color = "black";
            this.bar_color = "white";
            this.ball_color = "white";

            this.life_left.src = 'materials/images/light-left-life-100.png';
            this.life_right.src = 'materials/images/light-right-life-100.png';
        }
    }

    refreshBackground()
    {
        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.game_width, this.game_height);

        let x_bar_center = (this.game_width / 2) - (this.separator_width / 2);
        let nb = ~~(this.game_height / (this.separator_height + this.separator_space));

        this.display.fillStyle = this.menu_color;
        for (let value = 0; value != nb; value++)
        {
            this.display.fillRect(x_bar_center, ((this.separator_height * value) + this.separator_space * (value + 1)), this.separator_width, this.separator_height);
        }
    }

    refreshScores()
    {
        let score_y = 150;
        let left_score_x = (this.game_width / 4) - this.text_size / 4;
        let right_score_x = (this.game_width - this.game_width / 4) - this.text_size / 4;

        this.display.fillStyle = this.bar_color;

        this.display.font = this.text_size + "px " + this.text_font;
        this.display.fillText(this.scores[0], left_score_x, score_y);
        this.display.fillText(this.scores[1], right_score_x, score_y);
    }

    refreshPlayers()
    {
        if (gameKeys.KeyE == true && gameKeys.KeyD == false)
            this.left_player.moveUp();
        if (gameKeys.KeyD == true && gameKeys.KeyE == false)
            this.left_player.moveDown();

        if (gameKeys.KeyO == true && gameKeys.KeyL == false)
            this.right_player.moveUp();
        if (gameKeys.KeyL == true && gameKeys.KeyO == false)
            this.right_player.moveDown();

        this.left_player.print();
        this.right_player.print();

        if (mode != "classic")
            this.left_player.displayBonus(), this.right_player.displayBonus();
    }

    refreshLives()
    {
        if (this.scores[0] < 10 && this.scores[1] < 10)
        {
            let left_life_surface = (100 - (this.scores[1] * 10)) * 330 / 100;
            let right_life_surface = (100 - (this.scores[0] * 10)) * 330 / 100;
    
            this.display.fillStyle = "green";
            this.display.fillRect(21, 22, left_life_surface, 20);
            this.display.fillRect((this.game_width - 337) - 15, 22, right_life_surface, 20);
        }

        this.display.drawImage(this.life_left, 15, 15);
        this.display.drawImage(this.life_right, (this.game_width - 343) - 15, 15);
    }

    refreshBall()
    {
        if (this.alert < 100)
            this.ball.printAlert(), this.alert++;

        this.ball.animate();
        this.ball.print();
    }

    refreshBonus()
    {
        if (this.bonus_one.alive == true && (this.scores[0] >= 2 || this.scores[1] >= 2))
        {
            this.bonus_one.print();
            this.bonus_one.animate();
            this.bonus_one.print();
        }

        if (this.bonus_two.alive == true && (this.scores[0] >= 4 || this.scores[1] >= 4))
        {
            this.bonus_two.print();
            this.bonus_two.animate();
            this.bonus_two.print();
        }
    }

    resetGame()
    {
        this.scores[0] = 0;
        this.scores[1] = 0;

        this.left_player.reset();
        this.right_player.reset();

        this.alert = 0;

        this.ball.reset();

        if (mode != "classic")
            this.bonus_one.reset('one'), this.bonus_two.reset('two');
    }

    restartRound()
    {
        if (this.ball.x >= this.game_width / 2)
            this.scores[0]++;
        else
            this.scores[1]++;

        this.ball.replace();
        this.refreshDisplay();
    }

    isOver()
    {
        if (active == false)
            return (true);
        if (this.scores[0] > 9 || this.scores[1] > 9)
        {
            if (this.scores[0] > 9)
                document.getElementById('infos').textContent = "Left player won the game!";
            if (this.scores[1] > 9)
                document.getElementById('infos').textContent = "Right player won the game!";

            let number = generateNumber(2);
            if (number == 1)
            {
                document.getElementById('loser_sound').volume = 0.1;
                document.getElementById('loser_sound').play();
            }
            else
            {
                document.getElementById('winner_sound').volume = 0.1;
                document.getElementById('winner_sound').play();
            }

            return (true);
        }
        return (false);
    }
}