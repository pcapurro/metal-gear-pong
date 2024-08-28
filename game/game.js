// < object utils > //

function generateNumber(limit)
{
    let value = Math.floor(Math.random() * limit) + 1;
    return (value);
}

function getRandomBallDirection()
{
    value = generateNumber(4);

    if (value == 1)
        return (45);
    else if (value == 2)
        return (135);

    else if (value == 3)
        return (-45);
    else if (value == 4)
        return (-135);
}

// < timer > //

function launchGame()
{
    active = true;

    document.getElementById('infos').textContent = "3";
    game.refreshBackground();
    setTimeout(() => {}, 1000);

    document.getElementById('infos').textContent = "2";
    game.refreshScores();
    setTimeout(() => {}, 1000);

    document.getElementById('infos').textContent = "1";
    game.refreshPlayers();
    setTimeout(() => {}, 1000);

    document.getElementById('infos').textContent = "Go!";
    setTimeout(() => {}, 500);
    
    document.getElementById('start_game').style.display = "none";
    document.getElementById('infos').style.display = "none";
    // addKeyboardMonitoring();
    startGame();
}


// < keys > //

let gameKeys = {
    KeyE: false,
    KeyD: false,

    KeyO: false,
    KeyL: false,
};

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
