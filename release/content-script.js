var calendarGridSelector = 'div[role="grid"]';
var body = document.querySelector('body');
var calendarGrid = document.querySelectorAll(calendarGridSelector);

var disableScroll = function () {
    for (var liveSelector of document.querySelectorAll(calendarGridSelector)) {
        liveSelector.addEventListener('DOMMouseScroll', function (e) {
            if (e.target.id == 'el') return;
            e.preventDefault();
            e.stopPropagation();
        });
    }
};

var mutationBreaksScrollBlocker = function (mutation) {
    if (mutation.attributeName && mutation.attributeName == 'data-viewfamily') {
        if (body.getAttribute('data-viewfamily') == 'EVENT')
            return true;
    }
};

var calendarObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutationBreaksScrollBlocker(mutation)) {
            disableScroll();
        }
    });
});

var observeCalendarAvailability = function () {
    if (!calendarGrid) {
        window.setTimeout(observeCalendarAvailability, 500);
        return;
    }
    calendarObserver.observe(body, {attributes: true});
};

disableScroll();
observeCalendarAvailability();