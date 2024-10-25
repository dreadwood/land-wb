/**
 * b-grid.js
 */
;(() => {
  if (!window.Swiper) {
    console.error("Swiper lib isn't exist")
    return
  }

  /** @type {HTMLDivElement[]} */
  const groupSliders = document.querySelectorAll('.js-group-slider')

  groupSliders.forEach((groupSlider) => {
    /** @type {SwiperInstance | null} */
    let swiper = null

    /** @type {MediaQueryList} */
    const mediaQuery = window.matchMedia(window.utils.BREAKPOINT_MOBILE)

    function initSwiper() {
      /**
       * Swiper 11.1.14
       * vendor/swiper-bundle.min.js
       */
      swiper = new Swiper(groupSlider, {
        mousewheel: {
          forceToAxis: true
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 36,
        speed: 800,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.b-grid__bullet-list',
          bulletClass: 'b-grid__bullet',
          bulletActiveClass: 'actv',
          clickable: true,
          bulletElement: 'button'
        },
        breakpoints: {
          768: {
            spaceBetween: 72
          }
        }
      })
    }

    function destroySwiper() {
      if (swiper) {
        swiper.destroy(true, true)
        swiper = null
      }
    }

    /**
     *
     * @param {Boolean} matches
     * @param {SwiperInstance | null} instance
     */
    function toogleSwiper(matches, instance) {
      if (matches) {
        if (!instance) {
          initSwiper()
        }
      } else {
        destroySwiper()
      }
    }

    mediaQuery.addEventListener('change', (evt) =>
      toogleSwiper(evt.matches, swiper)
    )

    document.addEventListener('DOMContentLoaded', () => {
      toogleSwiper(mediaQuery.matches, swiper)
    })
  })
})()
