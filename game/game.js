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

function displayCountDown(nb)
{
    active = true;
    let timer;
    // let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();

    // timer = document.getElementById('1v1_local_timer');
    timer.classList.remove("d-none");

    if (nb == 3){
        menu_music.pause();
        timer.textContent = "3";
        game.refreshBackground();
    }
    else if (nb == 2){
        timer.textContent = "2";
        game.refreshScores();
    }
    else if (nb == 1){
        timer.textContent = "1";
        game.refreshPlayers();
    }
    else if (nb == 0)
    {
        game.refreshLives();
        timer.textContent = getTranslation("Go!")
    }
    else if (nb == -1)
    {
        timer.classList.add("d-none");
        game_music.play();
        game_music.loop = true;
        // game.sounds.alert.play();
        menu_music.pause();
        addKeyboardMonitoring();
        startGame();
        return ;
    }
    setTimeout(displayCountDown, 1000, --nb);
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
