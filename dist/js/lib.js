'use strict'

/**
 * utils.js
 */
window.utils = {
  BREAKPOINT_MOBILE: '(max-width: 1023px)',

  /**
   * @param {JSON} data
   * @param {string} url
   * @return {Promise<Response>}
   */
  async sendData(data, url) {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'no-cors'
    })
  }
}

/**
 * b-form.js
 */
;(() => {
  const TEL_LENGTH = 11
  const TEL_ERROR_MSG = 'Номер введен не полностью'

  const cards = document.querySelectorAll('.js-card')

  cards.forEach((card) => {
    /** @type {HTMLDivElement | null} */
    const contentScreen = card.querySelector('.js-card-content')

    /** @type {HTMLDivElement | null} */
    const successScreen = card.querySelector('.js-card-success')

    /** @type {HTMLDivElement | null} */
    const errorScreen = card.querySelector('.js-card-error')

    /** @type {HTMLFormElement | null} */
    const form = card.querySelector('.js-card-form')

    /** @type {HTMLButtonElement | null} */
    const btnError = card.querySelector('.js-card-back-btn')

    /** @type {HTMLInputElement | null} */
    const fieldTel = card.querySelector('.js-card-form-tel')

    if (
      !contentScreen ||
      !successScreen ||
      !errorScreen ||
      !form ||
      !btnError ||
      !fieldTel ||
      form.action === window.location.href
    ) {
      return
    }

    /**
     * IMask 7.6.1
     * vendor/imask.js
     */
    const mask = IMask(fieldTel, {
      mask: '+{7} (000) 000-00-00'
    })

    fieldTel.addEventListener('input', () => {
      const isComplete = mask.unmaskedValue.length === TEL_LENGTH
      fieldTel.setCustomValidity(isComplete ? '' : TEL_ERROR_MSG)
    })

    form.addEventListener('submit', async (evt) => {
      evt.preventDefault()

      const formData = new FormData(form)

      const name =
        `${formData.get('firstName')} ${formData.get('lastName')}`.trim()
      formData.append('name', name)
      formData.delete('firstName')
      formData.delete('lastName')

      const urlParams = new URLSearchParams(formData)
      const body = urlParams.toString()

      try {
        const res = fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        })

        const data = await res

        if (!data.ok) {
          showError(data)
        } else {
          showSuccess()
        }
      } catch (err) {
        showError(err)
      }
    })

    btnError.addEventListener('click', () => {
      showContent()
    })

    function showError(err) {
      if (err) console.error(err)
      contentScreen.setAttribute('hidden', 'hidden')
      successScreen.setAttribute('hidden', 'hidden')
      errorScreen.removeAttribute('hidden')
    }

    function showContent() {
      form.reset()
      contentScreen.removeAttribute('hidden')
      successScreen.setAttribute('hidden', 'hidden')
      errorScreen.setAttribute('hidden', 'hidden')
    }

    function showSuccess() {
      contentScreen.setAttribute('hidden', 'hidden')
      successScreen.removeAttribute('hidden')
      errorScreen.setAttribute('hidden', 'hidden')
    }
  })
})()

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
