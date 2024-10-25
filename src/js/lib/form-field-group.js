/**
 * form-field-group.js
 */
;(() => {
  const fieldGroup = document.querySelectorAll('.js-field-group')

  if (fieldGroup.length === 0) {
    return
  }

  fieldGroup.forEach((it) => {
    const element = it.querySelector('.js-field-group-example')
    const btn = it.querySelector('.js-field-group-btn')

    if (!element || !btn) {
      return
    }

    btn.onclick = () => copyElemnt(element, it)
  })

  /**
   * @param {HTMLDivElement} element
   * @param {HTMLDivElement} container
   */
  function copyElemnt(element, container) {
    const copy = element.cloneNode(true)

    /** @type {HTMLInputElement | null} */
    const field = copy.querySelector('.js-field-group-field')

    /** @type {HTMLInputElement | null} */
    const btnField = copy.querySelector('.js-field-group-btn')

    if (!field || !btnField) {
      return
    }

    const num = container.children.length + 1

    field.value = ''
    field.removeAttribute('id')
    field.removeAttribute('required')

    btnField.classList.add('minus')
    btnField.onclick = () => copy.remove()

    container.appendChild(copy)
  }
})()
