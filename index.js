
const initUpdateNavbarOnScroll = () => {
    const navbar = document.querySelector('.container-1');
    const elements = document.querySelectorAll('a');
    if (navbar) {
        window.addEventListener('scroll', () => {
        if (window.scrollY >= window.innerHeight-navbar.offsetHeight) {
            navbar.classList.add('new-class');
            [].slice.call(elements).forEach(function(elem) {
                elem.style.color = "rgb(59, 67, 70)";
                elem.classList.add('blue');
            });
        } else {
            navbar.classList.remove('new-class');
            [].slice.call(elements).forEach(function(elem) {
                elem.style.color = "rgb(255, 216, 87)";
                elem.classList.add('yellow');
                elem.classList.remove('blue');
            });
        }
        });
    }
}

const initScrolling = () => {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if (scrollY <=0 && [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1 ){
            e.preventDefault();
        }
    }, false);
}

const change = () => {
    const image = document.getElementById('change-img');
    image.src = "L14-ASSETs/cards/finals.png";
    console.log(image);
}

const initPage = () => {
    initUpdateNavbarOnScroll();
    initScrolling();
}