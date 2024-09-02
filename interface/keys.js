function sortEvent(event)
{
    if (event.key == 'Enter' && page == "title")
        removeTitlePage();
    if (localStorage.getItem('konami_code') == null)
        detectKonamiCode(event.key);
}

function listenKeyboard()
{
    document.addEventListener('keydown', sortEvent);
}