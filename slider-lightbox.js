/*
 * Slider lightbox: opens the clicked slide image in a larger view,
 * with previous / next buttons, keyboard arrows and swipe to browse the images.
 */
(function () {
    'use strict';

    if (window.gSliderLightbox) { return; }
    window.gSliderLightbox = true;

    var box, image, caption, counter, prevButton, nextButton, closeButton;
    var items = [];
    var current = 0;
    var lastFocus = null;
    var touchX = null;

    function build() {
        box = document.createElement('div');
        box.className = 'g-slider-lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.hidden = true;
        box.innerHTML =
            '<button type="button" class="g-slider-lightbox-close"><i class="fa fa-times" aria-hidden="true"></i></button>' +
            '<button type="button" class="g-slider-lightbox-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>' +
            '<figure class="g-slider-lightbox-figure">' +
                '<img class="g-slider-lightbox-image" src="" alt="" />' +
                '<figcaption class="g-slider-lightbox-caption"></figcaption>' +
            '</figure>' +
            '<button type="button" class="g-slider-lightbox-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>' +
            '<div class="g-slider-lightbox-counter" aria-live="polite"></div>';
        document.body.appendChild(box);

        image = box.querySelector('.g-slider-lightbox-image');
        caption = box.querySelector('.g-slider-lightbox-caption');
        counter = box.querySelector('.g-slider-lightbox-counter');
        prevButton = box.querySelector('.g-slider-lightbox-prev');
        nextButton = box.querySelector('.g-slider-lightbox-next');
        closeButton = box.querySelector('.g-slider-lightbox-close');

        closeButton.addEventListener('click', close);
        prevButton.addEventListener('click', function () { show(current - 1); });
        nextButton.addEventListener('click', function () { show(current + 1); });

        // Clicking the dark background closes the lightbox
        box.addEventListener('click', function (event) {
            if (event.target === box || event.target.classList.contains('g-slider-lightbox-figure')) {
                close();
            }
        });

        box.addEventListener('touchstart', function (event) {
            touchX = event.changedTouches[0].clientX;
        }, { passive: true });

        box.addEventListener('touchend', function (event) {
            if (touchX === null) { return; }
            var delta = event.changedTouches[0].clientX - touchX;
            touchX = null;
            if (Math.abs(delta) > 50 && items.length > 1) {
                show(current + (delta < 0 ? 1 : -1));
            }
        });

        document.addEventListener('keydown', function (event) {
            if (box.hidden) { return; }

            if (event.key === 'Escape' || event.key === 'Esc') {
                close();
            } else if ((event.key === 'ArrowLeft' || event.key === 'Left') && items.length > 1) {
                show(current - 1);
            } else if ((event.key === 'ArrowRight' || event.key === 'Right') && items.length > 1) {
                show(current + 1);
            } else if (event.key === 'Tab') {
                // Keep the focus inside the lightbox
                var buttons = Array.prototype.filter.call(box.querySelectorAll('button'), function (button) {
                    return !button.hidden;
                });
                var first = buttons[0];
                var last = buttons[buttons.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }

    function show(index) {
        var count = items.length;
        var item;

        current = (index + count) % count;
        item = items[current];

        image.src = item.image;
        image.alt = item.title;
        caption.textContent = item.title;
        caption.hidden = !item.title;
        counter.textContent = (current + 1) + ' / ' + count;

        prevButton.hidden = nextButton.hidden = counter.hidden = count < 2;

        // Preload the next and previous images
        if (count > 1) {
            new Image().src = items[(current + 1) % count].image;
            new Image().src = items[(current - 1 + count) % count].image;
        }
    }

    function open(slider, index) {
        var seen = {};
        var position = 0;

        if (!box) { build(); }

        // Loop mode clones slides: keep one entry per original slide, in order
        items = [];
        Array.prototype.forEach.call(slider.querySelectorAll('.swiper-slide[data-slider-image]'), function (slide) {
            var slideIndex = slide.getAttribute('data-slider-index');
            if (seen[slideIndex]) { return; }
            seen[slideIndex] = true;
            items.push({
                index: slideIndex,
                image: slide.getAttribute('data-slider-image'),
                title: slide.getAttribute('data-slider-title') || ''
            });
        });
        items.sort(function (a, b) { return parseInt(a.index, 10) - parseInt(b.index, 10); });

        items.forEach(function (item, i) {
            if (item.index === index) { position = i; }
        });

        prevButton.setAttribute('aria-label', slider.getAttribute('data-lightbox-prev') || 'Image précédente');
        nextButton.setAttribute('aria-label', slider.getAttribute('data-lightbox-next') || 'Image suivante');
        closeButton.setAttribute('aria-label', slider.getAttribute('data-lightbox-close') || 'Fermer');

        lastFocus = document.activeElement;
        box.hidden = false;
        document.documentElement.classList.add('g-slider-lightbox-open');
        show(position);
        closeButton.focus();
    }

    function close() {
        box.hidden = true;
        document.documentElement.classList.remove('g-slider-lightbox-open');
        image.removeAttribute('src');
        if (lastFocus && lastFocus !== document.body && lastFocus.focus) {
            lastFocus.focus();
        } else {
            closeButton.blur();
        }
    }

    // Swiper cancels the click after a drag, so only real clicks reach this handler
    document.addEventListener('click', function (event) {
        var slide = event.target.closest && event.target.closest('.g-slider[data-slider-lightbox] .swiper-slide[data-slider-image]');

        if (!slide || event.target.closest('a')) { return; }

        event.preventDefault();
        open(slide.closest('.g-slider'), slide.getAttribute('data-slider-index'));
    });
})();
