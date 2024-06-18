(() => {
    const sliderContainer = document.querySelector('.js-stages-list');
    const slides = document.querySelectorAll('.js-stages-slide');
    const nextBtn = document.querySelector('.js-stages-next');
    const previousBtn = document.querySelector('.js-stages-prev');
    const pagination = document.querySelector('.js-stages-pagination');
    const paginationBullets = [];
    let activeSlideIndex = 0;

    let startX = 0;
    let isDragging = false;

    const showSlide = () => {
        slides[activeSlideIndex].classList.add('active');
        paginationBullets[activeSlideIndex].classList.add('active');
    };

    const hideSlide = () => {
        slides[activeSlideIndex].classList.remove('active');
        paginationBullets[activeSlideIndex].classList.remove('active');
    };

    const changeSlide = (slideIndex) => {
        if (slideIndex < 0 || slideIndex >= slides.length) return;

        hideSlide();
        activeSlideIndex = slideIndex;

        previousBtn.classList.toggle('disabled', activeSlideIndex === 0);
        nextBtn.classList.toggle('disabled', activeSlideIndex === slides.length - 1);

        showSlide();
    };

    const nextSlide = () => changeSlide(activeSlideIndex + 1);
    const previousSlide = () => changeSlide(activeSlideIndex - 1);


    const getPaginationBullet = () => {
        const bullet = document.createElement('span');
        bullet.classList.add('stages__slider-pagination_bullet', 'js-stages-bullet');
        bullet.addEventListener('click', () => changeSlide(paginationBullets.indexOf(bullet)));
        pagination.appendChild(bullet);
        paginationBullets.push(bullet);
    };

    const createPagination = () => {
        slides.forEach(getPaginationBullet);
        paginationBullets[0].classList.add('active');
        previousBtn.classList.add('disabled');
    };

    nextBtn.addEventListener('click', nextSlide);
    previousBtn.addEventListener('click', previousSlide);

    sliderContainer.addEventListener('touchstart', (event) => {
        isDragging = true;
        startX = event.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', () => {
        isDragging = false;
        const touchEndX = event.changedTouches[0].clientX;
        if (startX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - startX > 50) {
            previousSlide();
        }
    });

    createPagination();
})();
