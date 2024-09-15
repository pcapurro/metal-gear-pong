function sortEvent(event)
{
    if (event.type == 'keydown')
    {
        if (event.key == 'Enter' && page == "title")
            removeTitlePage();

        if (localStorage.getItem('konami_code') == null)
            detectKonamiCode(event.key);

        if (active == true)
            registerPlayerAction("down", event.key);
    }
    if (event.type == 'keyup')
    {
        if (active == true)
            registerPlayerAction("up", event.key);
    }
}

function listenKeyboard()
{
    document.addEventListener('keydown', sortEvent);
    document.addEventListener('keyup', sortEvent);
}