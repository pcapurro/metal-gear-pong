// < initialisation > //

function initializeGame()
{
    mode = "bonus"; //

    game = new LocalGame1v1();
    game.refreshBackground();
}

// < launch/start > //

function launchGame(value)
{
    active = true;

    document.getElementById('start_game').classList.add('d-none');
    document.getElementById('infos').style.display = "block";
    document.getElementById('infos').style.fontSize = "35px";

    if (value == 3)
        document.getElementById('infos').textContent = "3", game.refreshBackground();
    else if (value == 2)
        document.getElementById('infos').textContent = "2", game.refreshScores();
    else if (value == 1)
        document.getElementById('infos').textContent = "1", game.refreshPlayers();
    else if (value == 0)
        document.getElementById('infos').textContent = "Go!", game.refreshLives();

    if (value != -1)
        setTimeout(launchGame, 1000, value - 1);
    else
    {
        document.getElementById('alert_sound').volume = 0.1;
        document.getElementById('alert_sound').play();

        document.getElementById('duel_theme').volume = 0.1;
        document.getElementById('duel_theme').loop = true;
        document.getElementById('duel_theme').play();

        document.getElementById('infos').style.display = "none";
        startGame();
    }
}

function startGame()
{
    if (game.isOver() == true || active == false)
    {
        game.refreshBackground();
        game.resetGame();
        active = false;

        stopGame();
        return;
    }
    else
    {
        game.refreshDisplay();
        requestAnimationFrame(startGame);
    }
}

function stopGame()
{
    document.getElementById('infos').style.display = "block";
    document.getElementById('infos').style.fontSize = "25px";

    document.getElementById('start_game').classList.remove('d-none');

    document.getElementById('duel_theme').pause();
}

// < player triggers > //

function registerPlayerAction(type, key)
{
    key = key.toLowerCase();

    if (type == "down")
    {
        if (key == 'e')
            gameKeys.KeyE = true;
        else if (key == 'd')
            gameKeys.KeyD = true;
    
        if (key == 'o')
            gameKeys.KeyO = true;
        else if (key == 'l')
            gameKeys.KeyL = true;
    }

    if (type == "up")
    {
        if (key == 'o')
            gameKeys.KeyO = false;
        else if (key == 'l')
            gameKeys.KeyL = false;

        if (key == 'e')
            gameKeys.KeyE = false;
        else if (key == 'd')
            gameKeys.KeyD = false;
    }
}