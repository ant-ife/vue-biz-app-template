import jsbridge from '~utils/jsbridge'

export default (option, callback) => {
  jsbridge.call('rpc', option, callback)
}
