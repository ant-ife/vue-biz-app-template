import 'whatwg-fetch'

const _option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
}

const request = (url, params = {}) => {
  return fetch(url, { ..._option, ...params })
    .then(response => response.json())
}

export default function ({ operationType, requestData: [params] }, callback) {
  console.info('rpc mock', operationType, params)
  request(`/api/${operationType}`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
    .then(data => {
      console.log('data is', data)
      callback(data)
    })
    .catch(err => {
      console.error(`error in mock file: '${operationType}', ${err}`)
      callback({ error: 6000 })
    })
}

export const mocked = true
