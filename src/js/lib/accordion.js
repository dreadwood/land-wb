/**
 * accordion.js
 */
;(() => {
  /** @type {HTMLDivElement[]} */
  const accordions = document.querySelectorAll('.js-accordion')

  accordions.forEach((it) => {
    /** @type {HTMLButtonElement | null} */
    const btn = it.querySelector('.js-accordion-btn')

    /** @type {HTMLDivElement | null} */
    const content = it.querySelector('.js-accordion-content')

    if (!btn || !content) {
      return
    }

    btn.addEventListener('click', () => {
      it.classList.toggle('show')

      if (it.classList.contains('show')) {
        content.style = `height: ${content.scrollHeight}px;`
      } else {
        content.style = ''
      }
    })
  })
})()
