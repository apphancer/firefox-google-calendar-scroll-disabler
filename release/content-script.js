var body = document.querySelector('body');
var calendarGrid = 'div[role="grid"]';
var calendarGridNodes = document.querySelectorAll(calendarGrid);
var elementToCheckForChanges = document.querySelector('div[class="BXL82c"]');

var disableScroll = function () {
    for (var selector of document.querySelectorAll(calendarGrid)) {
        selector.addEventListener('DOMMouseScroll', function (e) {
            if (e.target.id == 'el') return;
            e.stopPropagation();
            e.preventDefault();
        });
    }
};

var overlayObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutationBreaksScrollBlocker(mutation)) {
            disableScroll();
        }
    });
});

var calendarObserver = new MutationObserver(function (mutations) {
    disableScroll();
});

var observeCalendarAvailability = function () {
    if (!calendarGridNodes) {
        window.setTimeout(observeCalendarAvailability, 500);
        return;
    }
    overlayObserver.observe(body, {attributes: true});
    calendarObserver.observe(elementToCheckForChanges, {childList: true});
};

var mutationBreaksScrollBlocker = function (mutation) {
    return (mutation.attributeName && mutation.attributeName == 'data-viewfamily' && body.getAttribute('data-viewfamily') == 'EVENT');
};

disableScroll();
observeCalendarAvailability();