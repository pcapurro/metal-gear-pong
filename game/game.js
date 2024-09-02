// < initialisation > //

function initializeGame()
{
    mode = "classic"; //
    // theme = "light"; //

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

// < trigger > //

// function addKeyboardMonitoring(){
//     window.addEventListener('keydown', keyboardMonitoring_keyDown);
//     window.addEventListener('keyup', keyboardMonitoring_keyUp);
// }

// function removeKeyboardMonitoring(){
//     window.removeEventListener('keydown', keyboardMonitoring_keyDown);
//     window.removeEventListener('keyup', keyboardMonitoring_keyUp);
// }

// function keyboardMonitoring_keyDown(event){
//     let key = event.key.toLowerCase();
//     if (key == 'e')
//         gameKeys.KeyE = true;
//     else if (key == 'd')
//         gameKeys.KeyD = true;
//     if (key == 'y')
//         gameKeys.KeyY = true;
//     else if (key == 'h')
//         gameKeys.KeyH = true;
//     if (key == 'o')
//         gameKeys.KeyO = true;
//     else if (key == 'l')
//         gameKeys.KeyL = true;
// }

// function keyboardMonitoring_keyUp(event){
//     let key = event.key.toLowerCase()
//         if (key == 'o')
//             gameKeys.KeyO = false;
//         else if (key == 'l')
//             gameKeys.KeyL = false;

//         if (key == 'e')
//             gameKeys.KeyE = false;
//         else if (key == 'd')
//             gameKeys.KeyD = false;

//         if (key == 'y')
//             gameKeys.KeyY = false;
//         else if (key == 'h')
//             gameKeys.KeyH = false;
// }
