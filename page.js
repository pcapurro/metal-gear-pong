function displayTitlePage()
{
    document.getElementById('game_page').style.display = "none";
}

function removeTitlePage()
{
    document.getElementById('title_page').style.display = "none";

    initializeGame();

    document.getElementById('game_page').style.display = "block";
    document.getElementById('infos').style.display = "none";
    document.getElementById('start_game').onclick = function () { launchGame(3) };
}

function removeGame()
{
    document.getElementById('infos').style.display = "none";
    document.getElementById('start_game').classList.remove('d-none');
}