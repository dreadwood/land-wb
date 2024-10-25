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
