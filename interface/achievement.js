function refreshToastColors()
{
    let toast = "konami_toast"

    if (theme == "dark")
    {
        document.getElementById(toast).style.backgroundColor = "black";
        document.getElementById(toast + "_body").style.borderColor = "white";
        document.getElementById(toast + "_header").style.backgroundColor = "black";
        document.getElementById(toast + "_header").style.borderColor = "white";
        document.getElementById(toast + "_symbol").setAttribute('src', './materials/images/ach_symbol_w.png');
    }
    else
    {
        document.getElementById(toast).style.backgroundColor = "white";
        document.getElementById(toast + "_body").style.borderColor = "black";
        document.getElementById(toast + "_header").style.backgroundColor = "white";
        document.getElementById(toast + "_header").style.borderColor = "black";
        document.getElementById(toast + "_symbol").setAttribute('src', './materials/images/ach_symbol_b.png');
    }
}

function displayKonamiAchievement()
{
    document.getElementById('konami_toast').style.display = "block";
    new bootstrap.Toast(document.getElementById('konami_toast')).show();

    refreshToastColors();
}

function detectKonamiCode(key)
{
    if (keys == null)
        keys = [];
    keys.push(key);

    if (keys.length >= 10)
    {
        for (let i = 0; i != keys.length; i++)
        {
            if (keys[i] == 'ArrowUp' && keys.length - i >= 10)
            {
                if (keys[i + 1] == 'ArrowUp' && keys[i + 2] == 'ArrowDown' && keys[i + 3] == 'ArrowDown' && keys[i + 4] == 'ArrowLeft' && keys[i + 5] == 'ArrowRight' && keys[i + 6] == 'ArrowLeft' && keys[i + 7] == 'ArrowRight' && keys[i + 8] == 'b' && keys[i + 9] == 'a' && keys[i + 10] == 'Enter')
                {
                    document.getElementById('achiev_sound').play();
                    displayKonamiAchievement();
                    localStorage.setItem('konami_code', "true");
                    keys = [];
                    return ;
                }
            }
        }
    }
}
