import 'whatwg-fetch'

const _option = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
}

export default function request (url, params = {}, opt = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, Object.assign({}, _option, params))
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(json => {
        console.log('parsed json', json)
        resolve(json)
      })
      .catch(ex => {
        console.log('parsing failed', ex)
        reject(ex)
      })
  })
}
