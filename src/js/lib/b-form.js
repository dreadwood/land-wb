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
