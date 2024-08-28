// < ball class > //

class Ball
{
    constructor(game, width, height, x, y, speed, color, direction, bonus_speed)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.prev_x = x;

        this.speed = speed;

        this.direction = direction;
        this.bonus_speed = bonus_speed;

        this.bounce = true;

        this.lcl_exit = 0;
        this.lcl_bounce = 0;
        this.onl_received = 0;
        this.onl_return = 0;

        this.bandana_left = new Image(), this.bandana_left.src = 'Materials/images/game/bandana_left.png';
        this.bandana_right = new Image(), this.bandana_right.src = 'Materials/images/game/bandana_right.png';
    }

    print()
    {
        this.game.display.fillStyle = this.game.ball_color;
        this.game.display.fillRect(this.x, this.y, this.width, this.height);

        if (this.direction <= 90 && this.direction >= -90)
            this.game.display.drawImage(this.bandana_right, this.x - 28, this.y + 5);
        else
            this.game.display.drawImage(this.bandana_left, this.x, this.y + 5);
    }

    printAlert()
    {
        this.game.display.font = this.game.text_size / 2 + "px " + this.game.text_font;
        this.game.display.fillStyle = "red";
        this.game.display.fillText("!", this.x + this.width + 25, this.y);
    }

    // < verifyers > //

    isAtPlayer()
    {
        if (this.isAboveOrUnderPlayer() == true || this.isFrontPlayer() == true)
            return (true);
        return (false);
    }

    isFrontPlayer()
    {
        if (players_nb == 2)
        {
            if (Math.ceil(this.x) == this.game.left_player.x + this.game.left_player.width)
            {
                if (Math.ceil(this.y) + this.height >= this.game.left_player.y && Math.ceil(this.y) <= this.game.left_player.y + this.game.left_player.height)
                    return (true);
            }

            if (Math.ceil(this.x) + this.width == this.game.right_player.x)
            {
                if (Math.ceil(this.y) + this.height >= this.game.right_player.y && Math.ceil(this.y) <= this.game.right_player.y + this.game.right_player.height)
                    return (true);
            }
        }

        if (players_nb == 3)
        {
            if (Math.ceil(this.x) == this.game.left_player.x + this.game.left_player.width)
            {
                if (Math.ceil(this.y) + this.height >= this.game.left_player.y && Math.ceil(this.y) <= this.game.left_player.y + this.game.left_player.height)
                    return (true);
            }

            if (Math.ceil(this.x) + this.width == this.game.right_player_1.x)
            {
                if (Math.ceil(this.y) + this.height >= this.game.right_player_1.y && Math.ceil(this.y) <= this.game.right_player_1.y + this.game.right_player_1.height)
                    return (true);
            }

            if (Math.ceil(this.x) + this.width == this.game.right_player_2.x)
            {
                if (Math.ceil(this.y) + this.height >= this.game.right_player_2.y && Math.ceil(this.y) <= this.game.right_player_2.y + this.game.right_player_2.height)
                    return (true);
            }
        }

        return (false);
    }

    isAboveOrUnderPlayer()
    {
        if (players_nb == 2)
        {
            if (Math.ceil(this.x) + this.width >= this.game.left_player.x && Math.ceil(this.x) <= this.game.left_player.x + this.game.left_player.width)
            {
                if (Math.ceil(this.y) + this.height == this.game.left_player.y)
                    return (true);
                if (Math.ceil(this.y) == this.game.left_player.y + this.game.left_player.height)
                    return (true);
            };

            if (Math.ceil(this.x) + this.width >= this.game.right_player.x && Math.ceil(this.x) <= this.game.right_player.x + this.game.right_player.width)
            {
                if (Math.ceil(this.y) + this.height == this.game.right_player.y)
                    return (true);
                if (Math.ceil(this.y) == this.game.right_player.y + this.game.right_player.height)
                    return (true);
            };
        }

        if (players_nb == 3)
        {
            if (Math.ceil(this.x) + this.width >= this.game.left_player.x && Math.ceil(this.x) <= this.game.left_player.x + this.game.left_player.width)
            {
                if (Math.ceil(this.y) + this.height == this.game.left_player.y)
                    return (true);
                if (Math.ceil(this.y) == this.game.left_player.y + this.game.left_player.height)
                    return (true);
            }

            if (Math.ceil(this.x) + this.width >= this.game.right_player_1.x && Math.ceil(this.x) <= this.game.right_player_1.x + this.game.right_player_1.width)
            {
                if (Math.ceil(this.y) + this.height == this.game.right_player_1.y)
                    return (true);
                if (Math.ceil(this.y) == this.game.right_player_1.y + this.game.right_player_1.height)
                    return (true);
            }

            if (Math.ceil(this.x) + this.width >= this.game.right_player_2.x && Math.ceil(this.x) <= this.game.right_player_2.x + this.game.right_player_2.width)
            {
                if (Math.ceil(this.y) + this.height == this.game.right_player_2.y)
                    return (true);
                if (Math.ceil(this.y) == this.game.right_player_2.y + this.game.right_player_2.height)
                    return (true);
            }
        }

        return (false);
    }

    isUpOrDown()
    {
        if (this.y <= 0 || this.y + this.height >= this.game.game_height)
            return (true);
        return (false);
    }

    isOffLimit()
    {
        if (this.x + this.width < 0 || this.x > this.game.game_width)
            return (true);
        if (this.y + this.height < 0 || this.y > this.game.game_height)
            return (true);
        return (false);
    }

    // < extras > //

    addExtraDirection()
    {
        if (this.x < this.game.game_width / 2)
        {
            if (gameKeys.KeyE == true)
                this.direction = this.direction + 5;
            else if (gameKeys.KeyD == true)
                this.direction = this.direction - 5;
        }
        else
        {
            if (gameKeys.KeyO == true || (players_nb == 3 && gameKeys.KeyY == true))
                this.direction = this.direction + 5;
            else if (gameKeys.KeyL == true || (players_nb == 3 && gameKeys.KeyH == true))
                this.direction = this.direction - 5;
        }
    }

    addExtraSpeed()
    {
        if (this.bonus_speed < 6)
            this.bonus_speed++;
    }

    // < calculate > //

    getOpposite()
    {
        if (this.isUpOrDown() == true || this.isAboveOrUnderPlayer() == true)
            return (this.direction * (-1));
        else if (this.isAboveOrUnderPlayer() == true && this.bounce == true)
        {
            this.bounce = false;
            return (this.direction * (-1));
        }
        else if (this.isFrontPlayer() == true)
        {
            this.addExtraDirection();
            this.addExtraSpeed();

            if ((this.direction >= 30 && this.direction <= 90) || (this.direction >= -150 && this.direction <= -120))
                return (this.direction + 90);
            else
                return (this.direction - 90)
        }
    }

    calculateNewDirections()
    {
        let radian = ((this.direction * (-1)) * Math.PI) / 180;
        let x_dir = Math.cos(radian);
        let y_dir = Math.sin(radian);

        return ([x_dir, y_dir]);
    }

    // < animate > //

    move()
    {
        let x_dir = this.calculateNewDirections()[0];
        let y_dir = this.calculateNewDirections()[1];

        x_dir = Math.round(x_dir * 10) / 10;
        y_dir = Math.round(y_dir * 10) / 10;

        for (let i = 0; this.isAtPlayer() == false && i != (this.speed + this.bonus_speed); i++)
        {
            this.x = this.x + x_dir;
            this.y = this.y + y_dir;
        }
    }

    getAwayFromLimits()
    {
        if (this.isUpOrDown() == true)
        {
            if (this.y < this.game.game_height / 2)
                this.y = this.y + this.speed;
            else
                this.y = this.y - this.speed;
        }

        if (this.isFrontPlayer() == true)
        {
            if (this.x < this.game.game_width / 2)
                this.x = this.x + this.speed;
            else
                this.x = this.x - this.speed;
        }

        if (this.isAboveOrUnderPlayer() == true)
        {
            if (players_nb == 2)
            {
                if (Math.ceil(this.y) + this.height == this.game.left_player.y || Math.ceil(this.y) + this.height == this.game.right_player.y)
                    this.y = this.y - this.speed;
                else
                    this.y = this.y + this.speed;
            }
            if (players_nb == 3)
            {
                if (Math.ceil(this.y) + this.height == this.game.left_player.y || Math.ceil(this.y) + this.height == this.game.right_player_1.y || Math.ceil(this.y) + this.height == this.game.right_player_2.y)
                    this.y = this.y - this.speed;
                else
                    this.y = this.y + this.speed;
            }
        }
        this.game.sounds.limit.play();
    }

    reset()
    {
        this.replace();
        this.speed = this.game.ball_speed;
    }

    replace()
    {
        this.x = this.game.game_width / 2 - (this.game.ball_width / 2);
        this.y = this.game.game_height / 2 - (this.game.ball_width / 2);

        this.direction = getRandomBallDirection();
        this.bonus_speed = 0;

        if (this.bounce == false)
            this.bounce = true;
    }

    animate()
    {
        if (this.isOffLimit() == true)
        {
            if (role == null)
                this.lcl_exit++;

            if (role == null || role == 'host')
                this.game.restartRound();
        }
        else if (this.isUpOrDown() == true || this.isAtPlayer() == true)
        {
            if (role == null)
                this.lcl_bounce++;
            else
            {
                if (this.isFrontPlayer() == true)
                {
                    if (role == 'host' && this.x < this.game.game_width / 2 || role == 'guest' && this.x > this.game.game_width / 2)
                        this.onl_return++;
                }
            }
            if (role == null || role == 'host')
                this.direction = this.getOpposite(), this.getAwayFromLimits();
        }

        if (role == null || role == 'host')
            this.move();
    }
}
