module.exports = result => (req, res) => {
  if (isFunction(result)) {
    result = result(req)
  }

  setTimeout(() => res.json(result), 500)
}

const isFunction = obj =>
  Object.prototype.toString.call(obj) === '[object Function]'
