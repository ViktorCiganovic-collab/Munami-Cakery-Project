$(document).ready(function () {

    console.log("Script loaded");
    $(document).ready(function () {
        console.log("jQuery is working");
    });
    
    
    $(document).ready(function () {
        console.log("Document is ready");
        $('.fade-in-text-one').fadeIn(2000).removeClass('hidden');
        $('.fade-in-text-two').fadeIn(5000).removeClass('hidden');
    });
    
    
    window.addEventListener('scroll', function() {
        var text = document.querySelector('.sectionRatings');
        var windowHeight = window.innerHeight; //the height of the viewport
        var scrollTop = window.scrollY; //the number of pixels the page has been scrolled down from the top
        var elementOffset = text.getBoundingClientRect().top + scrollTop; //how much from the top is the text
    
        if (scrollTop + windowHeight > elementOffset) {
            text.classList.add('visible');
        }
    });
    
    });

    