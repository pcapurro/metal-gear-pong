// < initialisation > //

function initializeGame()
{
    mode = "classic"; //

    game = new LocalGame1v1();
    game.refreshBackground();
}

// < launch/start > //

function launchGame(value)
{
    active = true;

    document.getElementById('start_game').classList.add('d-none');
    document.getElementById('infos').style.display = "block";

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
        document.getElementById('infos').style.display = "none";
        game.sounds.alert.play();
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

        removeGame();
        return;
    }
    else
    {
        game.refreshDisplay();
        requestAnimationFrame(startGame);
    }
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