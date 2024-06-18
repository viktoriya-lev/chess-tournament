(() => {
    const sliderContainer = document.querySelector('.js-participants-list');
    const slides = document.querySelectorAll('.js-participants-slide');
    const slide = slides[0];

    const navigation = document.querySelector('.js-participants-navigation');
    const nextBtn = document.querySelector('.js-participants-next');
    const previousBtn = document.querySelector('.js-participants-prev');

    const paginationCurrent = document.querySelector('.js-participants-current');
    const paginationTotal = document.querySelector('.js-participants-total');

    const isMobile = window.screen.width <= 767;
    const totalSlides = slides.length;
    const slidesPerView = isMobile ? 1 : 3;
    let currentPageSlides = slidesPerView;

    let startX = 0;
    let isDragging = false;

    const getSlideShift = () => {
        let containerGap = null;
        let slideWidth = null;
        let slideShift = null;

        containerGap = getComputedStyle(sliderContainer).gap.includes('px')
            ? Number(getComputedStyle(sliderContainer).gap.split('px')[0])
            : 0;

        if (isMobile) {
            slideWidth = Number(getComputedStyle(sliderContainer).width.split('px')[0]);
        } else {
            slideWidth = Number(getComputedStyle(slide).width.split('px')[0]);
        }

        slideShift = (containerGap + slideWidth) * slidesPerView;

        return slideShift;
    }

    const slideShift = getSlideShift();

    const updatePagination = () => {
        paginationCurrent.textContent = `${currentPageSlides}`
    }

    const nextSlide = () => {
        if (currentPageSlides < totalSlides) {
            sliderContainer.scrollLeft += slideShift;
            currentPageSlides += slidesPerView;
        } else {
            sliderContainer.scrollLeft -= slideShift * currentPageSlides;
            currentPageSlides = slidesPerView;
        }

        updatePagination();
    }

    const previousSlide = () => {
        if (currentPageSlides !== slidesPerView) {
            sliderContainer.scrollLeft -= slideShift;
            currentPageSlides -= slidesPerView;
        } else {
            isMobile
                ? sliderContainer.scrollLeft += slideShift * totalSlides
                : sliderContainer.scrollLeft += slideShift * currentPageSlides
            currentPageSlides = totalSlides;
        }

        updatePagination();
    }

    const createPagination = () => {
        paginationCurrent.textContent = `${slidesPerView}`;
        paginationTotal.textContent = `/ ${totalSlides}`;
    }

    const handleKeydown = (event) => {
        if (event.key === 'ArrowRight') nextSlide();
        if (event.key === 'ArrowLeft') previousSlide();
    };

    nextBtn.addEventListener('click', nextSlide);
    previousBtn.addEventListener('click', previousSlide);

    if (!isMobile) {
        let interval = setInterval(nextSlide, 4000);
        navigation.addEventListener('mouseover', () => clearInterval(interval));
        navigation.addEventListener('mouseout', () => interval = setInterval(nextSlide, 4000));
        sliderContainer.addEventListener('mouseover', () => {
            clearInterval(interval)
            document.addEventListener('keydown', handleKeydown);
        });
        sliderContainer.addEventListener('mouseout', () => {
            interval = setInterval(nextSlide, 4000);
            document.removeEventListener('keydown', handleKeydown);
        });
    }

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
