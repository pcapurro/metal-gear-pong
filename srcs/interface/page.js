function loadPreference()
{
    if (localStorage.getItem('theme') == null)
    {
        theme = "light";
        localStorage.setItem('theme', 'light');
        document.getElementById('theme_btn').textContent = '☀️';
    }
    else
    {
        if (localStorage.getItem('theme') == "light")
        {
            theme = "light";
            document.getElementById('theme_btn').textContent = '☀️';
        }
        else
        {
            theme = "dark";
            document.getElementById('theme_btn').textContent = '🌘';
        }
    }
    loadBackground();
    loadTexts();
}

function switchTheme()
{
    if (theme == "light")
    {
        theme = "dark";
        localStorage.setItem('theme', 'dark');
        document.getElementById('theme_btn').textContent = '🌘';
    }
    else
    {
        theme = "light";
        localStorage.setItem('theme', 'light');
        document.getElementById('theme_btn').textContent = '☀️';
    }

    loadBackground();
    loadTexts();
    refreshToastColors();

    game.refreshPreference();
    game.refreshBackground();
}

function switchMode()
{
    if (mode == "classic")
    {
        mode = "bonus";
        document.getElementById('mode_btn').textContent = '🔪';
    }
    else
    {
        mode = "classic";
        document.getElementById('mode_btn').textContent = '🥎';
    }
}

function loadBackground()
{
    if (theme == "light")
        document.getElementById('body').style.backgroundColor = "white";
    else
        document.getElementById('body').style.backgroundColor = "black";
}

function loadTexts()
{
    if (theme == "light")
    {
        document.getElementById('title_txt').style.color = "black";
        document.getElementById('start_game').style.color = "black";
        document.getElementById('infos').style.color = "black";
        document.getElementById('main_line').style.color = "black";
        document.getElementById('separator_a').style.color = "black";
        document.getElementById('separator_b').style.color = "black";

        document.getElementById('konami_title').style.color = "black";
        document.getElementById('konami_quote').style.color = "black";
        document.getElementById('konami_obj').style.color = "black";
    }
    else
    {
        document.getElementById('title_txt').style.color = "white";
        document.getElementById('start_game').style.color = "white";
        document.getElementById('infos').style.color = "white";
        document.getElementById('main_line').style.color = "white";
        document.getElementById('separator_a').style.color = "white";
        document.getElementById('separator_b').style.color = "white";

        document.getElementById('konami_title').style.color = "white";
        document.getElementById('konami_quote').style.color = "white";
        document.getElementById('konami_obj').style.color = "white";
    }
}

function displayTitlePage()
{
    page = "title";
    document.getElementById('game_page').style.display = "none";
}

function removeTitlePage()
{
    page = "game";
    document.getElementById('title_page').style.display = "none";

    mode = "classic";
    initializeGame();

    document.getElementById('game_page').style.display = "block";
    document.getElementById('infos').style.display = "none";

    document.getElementById('theme_btn').onclick = switchTheme;
    document.getElementById('mode_btn').onclick = switchMode;
    document.getElementById('start_game').onclick = function () { launchGame(3) };
}