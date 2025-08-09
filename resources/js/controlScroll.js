let autoScrollInterval = null;
let autoScrollActive = false;
const SCROLL_DELAY = 3000; // 3 segundos

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
    //console.log("toggleAutoScroll called. autoScrollActive =", autoScrollActive);
    if (autoScrollActive) {
        //console.log("Deteniendo auto scroll");
        stopAutoScroll();
    } else {
        autoScrollActive = true;
        $("#scroll-icon").removeClass("fa-play").addClass("fa-square");
        //console.log("Iniciando delay de scroll de", SCROLL_DELAY, "ms");
        setTimeout(() => {
            if (autoScrollActive) {
                //console.log("Iniciando auto scroll después del delay");
                startAutoScroll();
            } else {
                //console.log("Auto scroll ya no está activo, no inicia");
            }
        }, SCROLL_DELAY);
    }
}


// Al cargar la página, iniciar scroll después de 5 segundos
$(window).on("load", function() {
    autoScrollActive = true;
    $("#scroll-icon").removeClass("fa-play").addClass("fa-square");
    setTimeout(() => {
        if (autoScrollActive) startAutoScroll();
    }, SCROLL_DELAY);
});

$(document).on("click", function(e) {
    const clickedOnScrollBtn = $(e.target).closest("#scrollToggleBtn").length > 0;
    const clickedOnAudioControls = $(e.target).closest("#audioControlsContainer").length > 0;

    if (autoScrollActive && !clickedOnScrollBtn && !clickedOnAudioControls) {
        //console.log("Click fuera de controles, deteniendo autoscroll");
        stopAutoScroll();
    }
});