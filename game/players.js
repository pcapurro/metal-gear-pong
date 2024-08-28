// < player class > //

class Bar1v1
{
    constructor(game, width, height, x, y, speed, color)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.bonus_speed = 0;
        this.bonus_height = 0;

        this.bonus = false;
        this.bonus_message = null;
        this.bonus_time = 0;
    }

    print()
    {
        this.game.display.fillStyle = this.game.bar_color;
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    displayBonusMessage()
    {
        this.game.display.font = this.game.text_size / 4 + "px " + this.game.text_font;

        if (this.bonus_message == "+ speed")
        {
            this.game.display.fillStyle = "green";
            if (this.x < this.game.game_width / 2)
                this.game.display.fillText("+" + getTranslation("speed"), this.x + this.width + 20, this.y + (this.height / 2));
            else
                this.game.display.fillText("+" + getTranslation("speed"), this.x - 20 - (this.game.display.measureText("+" + getTranslation("speed")).width), this.y + (this.height / 2));
        }
        if (this.bonus_message == "- size")
        {
            this.game.display.fillStyle = "red";
            if (this.x < this.game.game_width / 2)
                this.game.display.fillText("-" + getTranslation("size"), this.x + this.width + 20, this.y + (this.height / 2));
            else
                this.game.display.fillText("-" + getTranslation("size"), this.x - 20 - (this.game.display.measureText("+" + getTranslation("size")).width), this.y + (this.height / 2));
        }
    }

    displayBonus()
    {
        if (this.bonus == true)
        {
            if (this.bonus_time < 150)
            {
                this.displayBonusMessage();
                this.bonus_time++;
            }
            else
                this.bonus = false, this.bonus_time = 0;
        }
    }

    moveUp()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y > 0 && this.game.ball.isAboveOrUnderPlayer() == false)
            {
                this.y = this.y - 1;
                this.print();
            }
        }
    }

    moveDown()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y + this.height < this.game.game_height && this.game.ball.isAboveOrUnderPlayer() == false)
            {
                this.y = this.y + 1;
                this.print();
            }
        }
    }

    reset()
    {
        if (this.x < this.game.game_width / 2)
        {
            this.x = 0 + this.game.bar_width;
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
        else
        {
            this.x = ((this.game.game_width - this.game.bar_width) - this.game.bar_width);
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
        this.speed = this.game.bar_speed;
        this.height = this.game.bar_height;

        this.bonus = false;
        this.bonus_time = 0;
    }

    getInfo()
    {
        return ([this.x, this.y]);
    }
}

class Bar1v2
{
    constructor(game, width, height, x, y, speed, color, pos)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;

        this.bonus_speed = 0;
        this.bonus_height = 0;

        this.pos = pos;

        this.bonus = false;
        this.bonus_message = null;
        this.bonus_time = 0;
    }

    print()
    {
        this.game.display.fillStyle = this.color;
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    displayBonusMessage()
    {
        this.game.display.font = this.game.text_size / 4 + "px " + this.game.text_font;

        if (this.bonus_message == "+ speed")
        {
            this.game.display.fillStyle = "green";
            if (this.x < this.game.game_width / 2)
                this.game.display.fillText("+" + getTranslation("speed"), this.x + this.width + 25, this.y + (this.height / 2));
            else
                this.game.display.fillText("+" + getTranslation("speed"), this.x - ((getTranslation("speed").length * this.game.text_size / 6)), this.y + (this.height / 2));
        }
        if (this.bonus_message == "- size")
        {
            this.game.display.fillStyle = "red";
            if (this.x < this.game.game_width / 2)
                this.game.display.fillText("-" + getTranslation("size"), this.x + this.width + 25, this.y + (this.height / 2));
            else
                this.game.display.fillText("-" + getTranslation("size"), this.x - ((getTranslation("size").length * this.game.text_size / 6)), this.y + (this.height / 2));
        }
    }

    displayBonus()
    {
        if (this.bonus == true)
        {
            if (this.bonus_time < 150)
            {
                this.displayBonusMessage();
                this.bonus_time++;
            }
            else
                this.bonus = false, this.bonus_time = 0;
        }
    }

    willBeAtLimits(sign)
    {
        if (players_nb == 3)
        {
            if (sign == "+")
            {
                if (this.pos == "up" && this.y + this.height + 1 == this.game.game_height / 2)
                    return (true);
            }
            if (sign == "-")
            {
                if (this.pos == "down" && this.y - 1 == this.game.game_height / 2)
                    return (true);
            }
        }
        return (false);
    }

    moveUp()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y > 0 && this.game.ball.isAboveOrUnderPlayer() == false && this.willBeAtLimits("-") == false)
            {
                this.y = this.y - 1;
                this.print();
            }
        }
    }

    moveDown()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y + this.height < this.game.game_height && this.game.ball.isAboveOrUnderPlayer() == false && this.willBeAtLimits("+") == false)
            {
                this.y = this.y + 1;
                this.print();
            }
        }
    }

    reset()
    {
        if (this.x < this.game.game_width / 2)
        {
            this.x = 0 + this.game.bar_width;
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
        else
        {
            this.x = ((this.game.game_width - this.game.bar_width) - this.game.bar_width);
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
        this.speed = this.game.bar_speed;
        this.height = this.game.bar_height;

        this.bonus = false;
        this.bonus_time = 0;
    }

    getInfo()
    {
        return ([this.x, this.y]);
    }
}
