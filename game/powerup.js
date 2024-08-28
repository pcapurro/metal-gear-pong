// < powerup class > //

class PowerUp
{
    constructor(game, width, height, x, y, speed, color, direction, name)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;

        this.direction = direction;

        this.alive = true;

        this.bonus_taken = 0;

        this.onl_taken = 0;
        this.onl_received = 0;
        this.name = name;

        this.ration_img = new Image(), this.ration_img.src = 'materials/images/ration.png';
    }

    print()
    {
        this.game.display.fillStyle = this.color;
        this.game.display.drawImage(this.ration_img, this.x, this.y);
    }

    // < verifyers > //

    isAtPlayer()
    {
        let player;

        if (this.x <= this.game.game_width / 2)
            player = this.game.left_player;
        else
            player = this.game.right_player;

        if (this.y + this.height >= player.y && this.y <= player.y + player.height)
        {
            if (this.x <= player.x + player.width && this.x >= player.x + (player.width / 2))
                return (true);
            if (this.x + this.width >= player.x && this.x + this.width <= player.x + (player.width / 2))
                return (true);
        }
        if (this.x + this.width >= player.x && this.x <= player.x + player.width)
        {
            if (this.y <= player.y + player.height && this.y + this.height >= player.y + (player.height / 2))
                return (true);
            if (this.y + this.height >= player.y && this.y + this.height <= player.y + (player.height / 2))
                return (true);
        }
        return (false);
    }

    isAtBall()
    {
        if (this.y + this.height >= this.game.ball.y && this.y <= this.game.ball.y + this.game.ball.height)
        {
            if (this.x + this.width >= this.game.ball.x && this.x + this.width <= this.game.ball.x + (this.game.ball.width / 2))
                return (true);
            if (this.x <= this.game.ball.x + this.game.ball.width && this.x >= this.game.ball.x + (this.game.ball.width / 2))
                return (true);
        }
        return (false);
    }

    isUpOrDown()
    {
        if (this.y <= 0 || this.y + this.height >= this.game.game_height)
            return (true);
        return (false);
    }

    isLeftOrRight()
    {
        if (this.x <= 0 || this.x + this.width >= this.game.game_width)
            return (true);
        return (false);
    }

    isAtLimits()
    {
        if (this.isUpOrDown() == true || this.isLeftOrRight() == true)
            return (true);
        return (false);
    }

    // < calculators > //

    getOpposite()
    {
        if (this.isUpOrDown() == true)
            return (this.direction * (-1));
        else if (this.isLeftOrRight() == true)
        {
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

    applyPlayerBonus()
    {
        bonus_type = generateNumber(2);

        if (this.x <= this.game.game_width / 2)
        {
            if (bonus_type == 1 && this.game.right_player.height == this.game.bar_height)
            {
                this.game.right_player.height = this.game.right_player.height - (this.game.right_player.height / 2);
                this.game.right_player.bonus = true;
                this.game.right_player.bonus_message = "- size";
            }
            else
            {
                this.game.left_player.speed = this.game.left_player.speed + 5;
                this.game.left_player.bonus = true;
                this.game.left_player.bonus_message = "+ speed";
            }
        }
        else
        {
            if (bonus_type == 1 && this.game.left_player.height == this.game.bar_height)
            {
                this.game.left_player.height = this.game.left_player.height - (this.game.left_player.height / 2);
                this.game.left_player.bonus = true;
                this.game.left_player.bonus_message = "- size";
            }
            else
            {
                this.game.right_player.speed = this.game.right_player.speed + 5;
                this.game.right_player.bonus = true;
                this.game.right_player.bonus_message = "+ speed";
            }
        }

        this.alive = false;
        // this.game.sounds.powerup.play();
    }

    applyBallBonus()
    {
        this.game.ball.speed = this.game.ball.speed + 2;
    }

    reset(value)
    {
        if (value == 'one')
        {
            this.x = (this.game.game_width / 4);
            this.y = (this.game.game_height / 2);
            this.direction = this.game.ball.direction;
        }
        if (value == 'two')
        {
            this.x = (this.game.game_width / 2 + (this.game.game_width / 4));
            this.y = (this.game.game_height / 2);
            this.direction = this.game.ball.direction + 90;
        }
        this.alive = true;
    }

    move()
    {
        let x_dir = this.calculateNewDirections()[0];
        let y_dir = this.calculateNewDirections()[1];

        x_dir = Math.round(x_dir * 10) / 10;
        y_dir = Math.round(y_dir * 10) / 10;

        for (let i = 0; i != this.speed && this.isAtLimits() == false ; i++)
        {
            this.x = this.x + x_dir;
            this.y = this.y + y_dir;
        }
    }

    getAwayFromLimits()
    {
        if (this.isUpOrDown() == true)
        {
            if (this.y <= 0)
                this.y = this.y + 1;
            else
                this.y = this.y - 1;
        }
        else
        {
            if (this.x <= 0)
                this.x = this.x + 1;
            else
                this.x = this.x - 1;
        }
    }

    animate()
    {
        if (this.isAtLimits() == true)
            this.direction = this.getOpposite(), this.getAwayFromLimits();
        else if (this.isAtPlayer() == true)
            this.applyPlayerBonus();
        else if (this.isAtBall() == true)
            this.applyBallBonus(), this.alive = false;

        this.move();
    }
}

