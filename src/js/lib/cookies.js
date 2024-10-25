/**
 * cookies.js
 */
;(() => {
  const TIME_SHOW_DELAY = 300

  const card = document.querySelector('.js-cookies')
  if (!card) return

  const btn = card.querySelector('.js-cookies-btn')
  if (!btn) return

  const isShowBefore = !!localStorage.getItem('cookies')
  if (isShowBefore) return

  card.classList.add('show')

  btn.addEventListener('click', () => {
    card.style = 'opacity: 0;'
    localStorage.setItem('cookies', 'agree')

    setTimeout(() => {
      card.removeAttribute('style')
      card.classList.remove('show')
    }, TIME_SHOW_DELAY)
  })
})()
