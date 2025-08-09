let autoScrollInterval = null;
let autoScrollActive = false;
const SCROLL_DELAY = 5000; // 5 segundos

function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);

    autoScrollInterval = setInterval(() => {
        $(window).scrollTop($(window).scrollTop() + 5); // avanza 5px
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            stopAutoScroll(); // parar al llegar al final
        }
    }, 20);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    autoScrollActive = false;
    $("#scroll-icon").removeClass("fa-square").addClass("fa-play");
}

function toggleAutoScroll() {
    if (autoScrollActive) {
        stopAutoScroll();
    } else {
        autoScrollActive = true;
        $("#scroll-icon").removeClass("fa-play").addClass("fa-square");
        setTimeout(() => {
            if (autoScrollActive) startAutoScroll();
        }, SCROLL_DELAY);
    }
}

// Inicia el scroll automático 5 segundos después de que cargue la página
$(window).on("load", function() {
    autoScrollActive = true;
    $("#scroll-icon").removeClass("fa-play").addClass("fa-square");
    setTimeout(() => {
        if (autoScrollActive) startAutoScroll();
    }, SCROLL_DELAY);
});