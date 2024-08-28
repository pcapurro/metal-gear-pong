// < game class > //

class LocalGame1v1
{
    constructor()
    {
        // global infos initialization

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

        if (text_size == "normal")
            this.text_size = 85;
        else
            this.text_size = 100;

        this.text_font = "Arial";

        this.bonus_color = "green";

        this.ball_direction = getRandomBallDirection();

        this.alert = 0;

        // canvas creation

        if (type == "tournament")
            this.canvas = document.getElementById('tournament_game');
        else
            this.canvas = document.getElementById('one_vs_one_local_game');
        this.display = this.canvas.getContext('2d');

        this.canvas.width = this.game_width;
        this.canvas.height = this.game_height;

        // game display loading

        if (high_contrast == "true")
            this.menu_color = "white", this.background_color = "black", this.bar_color = "white", this.ball_color = "white";
        else
            this.menu_color = "black", this.background_color = "white", this.bar_color = "black", this.ball_color = "black";

        if (game_map != null && game_map != "default")
        {
            if (game_map == "red")
                this.background_color = "brown";
            else
                this.background_color = game_map;
        }

        // displaying background

        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.game_width, this.game_height);

        // displaying center bar

        let x_bar_center = (this.game_width / 2) - (this.separator_width / 2);
        let nb = ~~(this.game_height / (this.separator_height + this.separator_space));

        this.display.fillStyle = this.menu_color;
        for (let value = 0; value != nb; value++)
        {
            this.display.fillRect(x_bar_center, ((this.separator_height * value) + this.separator_space * (value + 1)), this.separator_width, this.separator_height);
        }

        // displaying scores

        let score_y = this.game_height / 6;
        let left_score_x = (this.game_width / 4) - this.text_size / 4;
        let right_score_x = (this.game_width - this.game_width / 4) - this.text_size / 4;

        this.display.fillStyle = this.bar_color;

        this.display.font = this.text_size + "px " + this.text_font;
        this.display.fillText(this.scores[0], left_score_x, score_y);
        this.display.fillText(this.scores[1], right_score_x, score_y);

        // players creation

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

        // ball creation

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

        // bonus creation

        if (gameMode != "normal")
        {
            let bonus_one_data = {
                game: this,

                object_width: this.ball_width,
                object_heigth: this.ball_height,

                x_pos : (this.game_width / 4),
                y_pos : (this.game_height / 2),

                speed: 2,
                color: this.bonus_color,

                direction : this.ball_direction,
                name:1,
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
                name:2,
            }

            this.bonus_one = new PowerUp(...Object.values(bonus_one_data));
            this.bonus_two = new PowerUp(...Object.values(bonus_two_data));
        }

        // sounds initialization

        let the_sounds = {
            alert: document.getElementById('alert_sound'),
            limit: document.getElementById('knock_sound'),
            powerup: document.getElementById('bonus_sound')
        }

        this.sounds = the_sounds;

        // life initialization

        this.life_left = new Image();
        this.life_right = new Image();
    
        if (high_contrast == true)
            this.life_left.src = 'Materials/images/game/life/dark-left-life-100.png', this.life_right.src = 'Materials/images/game/life/dark-right-life-100.png';
        else
            this.life_left.src = 'Materials/images/game/life/light-left-life-100.png', this.life_right.src = 'Materials/images/game/life/light-right-life-100.png';
    }

    refreshDisplay()
    {
        this.refreshPreferences();
        this.refreshBackground();
        this.refreshScores();
        this.refreshPlayers();
        this.refreshLives();
        this.refreshBall();

        if (gameMode != "normal")
            this.refreshBonus();
    }

    refreshPreferences()
    {
        if (high_contrast == "true")
            this.menu_color = "white", this.background_color = "black", this.bar_color = "white", this.ball_color = "white";
        else
            this.menu_color = "black", this.background_color = "white", this.bar_color = "black", this.ball_color = "black";

        if (game_map != null && game_map != "default")
        {
            if (game_map == "red")
                this.background_color = "brown";
            else
                this.background_color = game_map;
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

        if (gameMode != "normal")
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

        if (gameMode != "normal")
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
            if (type == 'tournament')
            {
                if (this.scores[0] > 9)
                    tournamentLeftWin();
                if (this.scores[1] > 9)
                    tournamentRightWin();
            }
            else
            {
                if (this.scores[0] > 9)
                    document.getElementById('left_player_won_text').style.display = "block";
                if (this.scores[1] > 9)
                    document.getElementById('right_player_won_text').style.display = "block";
            }

            localStorage.setItem('lcl_game_played_nb', (parseInt(localStorage.getItem('lcl_game_played_nb')) + 1).toString());

            if (parseInt(localStorage.getItem('lcl_game_played_nb')) == 1)
                displayAchievement("first local game")

            localStorage.setItem('lcl_ball_exit_nb', (parseInt(localStorage.getItem('lcl_ball_exit_nb')) + game.ball.lcl_exit).toString());
            localStorage.setItem('lcl_ball_bounce_nb', (parseInt(localStorage.getItem('lcl_ball_bounce_nb')) + game.ball.lcl_bounce).toString());
            if (gameMode == 'bonus'){
                localStorage.setItem('lcl_bonus_taken_nb', (parseInt(localStorage.getItem('lcl_bonus_taken_nb')) + game.bonus_one.bonus_taken).toString());
                localStorage.setItem('lcl_bonus_taken_nb', (parseInt(localStorage.getItem('lcl_bonus_taken_nb')) + game.bonus_two.bonus_taken).toString());
            }

            return (true);
        }
        return (false);
    }
}

// < initialisation > //

function initializeLocal1v1()
{
    players_nb = 2;
    role = null;
    game = new LocalGame1v1();

    game.refreshBackground();
}

// < menu display management > //

function displayLocal1v1()
{
    document.getElementById('start_1v1_local').style.visibility = "hidden";
    document.getElementById('left_player_won_text').style.display = "none";
    document.getElementById('right_player_won_text').style.display = "none";
    document.getElementById('1v1_local_timer').style.display = "block";

    stopKeysAnim();
    displayCountDown(3);
}

function removeLocal1v1()
{
    gameMusicSelector().pause();

    document.getElementById('mgs').play();
    document.getElementById('1v1_local_timer').style.display = "none";
    document.getElementById('start_1v1_local').textContent = getTranslation("Launch a game");
    document.getElementById('start_1v1_local').style.visibility = "visible";

    if (type != 'tournament')
        resumeKeysAnim();
}

function startLocal1v1()
{
    const frame = 1000/120;

    setTimeout(()=> {
        if (game.isOver() == true || active == false)
        {
            game.refreshBackground();
            game.resetGame();
            active = false;

            removeLocal1v1();

            if (final == false)
                removeTournamentGame();
            else
                displayFinalWinner();
            return;
        }
        else
        {
            game.refreshDisplay();
            requestAnimationFrame(startLocal1v1);
        }
    }, frame);
}
