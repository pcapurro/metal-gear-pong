localStorage.clear(); //
localStorage.setItem('theme', 'dark'); //

loadBackground();
loadTexts();

displayTitlePage();
removeTitlePage(); //

var game;
var active;
var mode;

var gameKeys = {
    KeyE: false,
    KeyD: false,

    KeyO: false,
    KeyL: false,
};