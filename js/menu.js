function showMenu() {
    changeArrow();
    $(".menu").slideToggle(100);
}

function changeArrow() {
    downImageShowed = ($("#showMenuArrow").attr('src').indexOf("down") > -1);

    if (downImageShowed)
        $("#showMenuArrow").attr('src', "img/up-arrow.png");
    else
        $("#showMenuArrow").attr('src', "img/down-arrow.png");
}
