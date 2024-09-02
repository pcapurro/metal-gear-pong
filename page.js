function loadBackground()
{
    if (localStorage.getItem('theme') == null)
    {
        theme = "light";
        localStorage.setItem('theme', 'light');
        document.getElementById('body').style.backgroundColor = "white";
    }
    else
    {
        if (localStorage.getItem('theme') == "light")
            theme = "light", document.getElementById('body').style.backgroundColor = "white";
        else
            theme = "dark", document.getElementById('body').style.backgroundColor = "black";
    }
}

function loadTexts()
{
    if (theme == "light")
    {
        document.getElementById('start_game').style.color = "dark";
        document.getElementById('infos').style.color = "dark";
    }
    else
    {
        document.getElementById('start_game').style.color = "white";
        document.getElementById('infos').style.color = "white";
    }
}

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