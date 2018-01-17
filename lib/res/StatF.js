const TModel = require('t-model')
const TafProtocolClient = require('t-rpc/lib/protocols/taf/client')
const { RpcError, ClientDecodeError, ServerFuncNotFoundError } = require('t-rpc/lib/util/rpc-error')
const ResponseMessage = require('t-rpc/lib/util/response-message')
const md5 = require('md5')

class StatMicMsgHead extends TModel.TStruct {
  static parse (value) {
    return Object.assign({}, {
      masterName: '',
      slaveName: '',
      interfaceName: '',
      masterIp: '',
      slaveIp: '',
      slavePort: 0,
      returnValue: 0,
      slaveSetName: '',
      slaveSetArea: '',
      slaveSetID: ''
    }, value)
  }
  static readFrom (is, tBuffer) {
    let masterName = (TModel.TString).read(is, 0, true)
    let slaveName = (TModel.TString).read(is, 1, true)
    let interfaceName = (TModel.TString).read(is, 2, true)
    let masterIp = (TModel.TString).read(is, 3, true)
    let slaveIp = (TModel.TString).read(is, 4, true)
    let slavePort = (TModel.TInt32).read(is, 5, true)
    let returnValue = (TModel.TInt32).read(is, 6, true)
    let slaveSetName = (TModel.TString).read(is, 7, false)
    let slaveSetArea = (TModel.TString).read(is, 8, false)
    let slaveSetID = (TModel.TString).read(is, 9, false)
    return new StatMicMsgHead({
      masterName, slaveName, interfaceName, masterIp, slaveIp, slavePort, returnValue, slaveSetName, slaveSetArea, slaveSetID
    }).valueOf()
  }
  constructor (value) {
    super(value)

    this._t_masterName = new (TModel.TString)(this._value.masterName)
    this._t_slaveName = new (TModel.TString)(this._value.slaveName)
    this._t_interfaceName = new (TModel.TString)(this._value.interfaceName)
    this._t_masterIp = new (TModel.TString)(this._value.masterIp)
    this._t_slaveIp = new (TModel.TString)(this._value.slaveIp)
    this._t_slavePort = new (TModel.TInt32)(this._value.slavePort)
    this._t_returnValue = new (TModel.TInt32)(this._value.returnValue)
    this._t_slaveSetName = new (TModel.TString)(this._value.slaveSetName)
    this._t_slaveSetArea = new (TModel.TString)(this._value.slaveSetArea)
    this._t_slaveSetID = new (TModel.TString)(this._value.slaveSetID)
  }

  get masterName () {
    return this._t_masterName.valueOf()
  }
  get slaveName () {
    return this._t_slaveName.valueOf()
  }
  get interfaceName () {
    return this._t_interfaceName.valueOf()
  }
  get masterIp () {
    return this._t_masterIp.valueOf()
  }
  get slaveIp () {
    return this._t_slaveIp.valueOf()
  }
  get slavePort () {
    return this._t_slavePort.valueOf()
  }
  get returnValue () {
    return this._t_returnValue.valueOf()
  }
  get slaveSetName () {
    return this._t_slaveSetName.valueOf()
  }
  get slaveSetArea () {
    return this._t_slaveSetArea.valueOf()
  }
  get slaveSetID () {
    return this._t_slaveSetID.valueOf()
  }

  set masterName (value) {
    this._t_masterName = new (TModel.TString)(value)
  }
  set slaveName (value) {
    this._t_slaveName = new (TModel.TString)(value)
  }
  set interfaceName (value) {
    this._t_interfaceName = new (TModel.TString)(value)
  }
  set masterIp (value) {
    this._t_masterIp = new (TModel.TString)(value)
  }
  set slaveIp (value) {
    this._t_slaveIp = new (TModel.TString)(value)
  }
  set slavePort (value) {
    this._t_slavePort = new (TModel.TInt32)(value)
  }
  set returnValue (value) {
    this._t_returnValue = new (TModel.TInt32)(value)
  }
  set slaveSetName (value) {
    this._t_slaveSetName = new (TModel.TString)(value)
  }
  set slaveSetArea (value) {
    this._t_slaveSetArea = new (TModel.TString)(value)
  }
  set slaveSetID (value) {
    this._t_slaveSetID = new (TModel.TString)(value)
  }

  writeTo (os, tBuffer) {
    this._t_masterName.write(os, 0)
    this._t_slaveName.write(os, 1)
    this._t_interfaceName.write(os, 2)
    this._t_masterIp.write(os, 3)
    this._t_slaveIp.write(os, 4)
    this._t_slavePort.write(os, 5)
    this._t_returnValue.write(os, 6)
    this._t_slaveSetName.write(os, 7)
    this._t_slaveSetArea.write(os, 8)
    this._t_slaveSetID.write(os, 9)
  }

  valueOf () {
    return {
      masterName: this._t_masterName.valueOf(),
      slaveName: this._t_slaveName.valueOf(),
      interfaceName: this._t_interfaceName.valueOf(),
      masterIp: this._t_masterIp.valueOf(),
      slaveIp: this._t_slaveIp.valueOf(),
      slavePort: this._t_slavePort.valueOf(),
      returnValue: this._t_returnValue.valueOf(),
      slaveSetName: this._t_slaveSetName.valueOf(),
      slaveSetArea: this._t_slaveSetArea.valueOf(),
      slaveSetID: this._t_slaveSetID.valueOf()
    }
  }

  keyOf () {
    return md5([
      this._t_masterName.keyOf(),
      this._t_slaveName.keyOf(),
      this._t_interfaceName.keyOf(),
      this._t_masterIp.keyOf(),
      this._t_slaveIp.keyOf(),
      this._t_slavePort.keyOf(),
      this._t_returnValue.keyOf(),
      this._t_slaveSetName.keyOf(),
      this._t_slaveSetArea.keyOf(),
      this._t_slaveSetID.keyOf()
    ].join('__key__'))
  }
}
class StatMicMsgBody extends TModel.TStruct {
  static parse (value) {
    return Object.assign({}, {
      count: 0,
      timeoutCount: 0,
      execCount: 0,
      intervalCount: null,
      totalRspTime: 0,
      maxRspTime: 0,
      minRspTime: 0
    }, value)
  }
  static readFrom (is, tBuffer) {
    let count = (TModel.TInt32).read(is, 0, true)
    let timeoutCount = (TModel.TInt32).read(is, 1, true)
    let execCount = (TModel.TInt32).read(is, 2, true)
    let intervalCount = (TModel.TMap(TModel.TInt32, TModel.TInt32)).read(is, 3, true)
    let totalRspTime = (TModel.TInt64).read(is, 4, true)
    let maxRspTime = (TModel.TInt32).read(is, 5, true)
    let minRspTime = (TModel.TInt32).read(is, 6, true)
    return new StatMicMsgBody({
      count, timeoutCount, execCount, intervalCount, totalRspTime, maxRspTime, minRspTime
    }).valueOf()
  }
  constructor (value) {
    super(value)

    this._t_count = new (TModel.TInt32)(this._value.count)
    this._t_timeoutCount = new (TModel.TInt32)(this._value.timeoutCount)
    this._t_execCount = new (TModel.TInt32)(this._value.execCount)
    this._t_intervalCount = new (TModel.TMap(TModel.TInt32, TModel.TInt32))(this._value.intervalCount)
    this._t_totalRspTime = new (TModel.TInt64)(this._value.totalRspTime)
    this._t_maxRspTime = new (TModel.TInt32)(this._value.maxRspTime)
    this._t_minRspTime = new (TModel.TInt32)(this._value.minRspTime)
  }

  get count () {
    return this._t_count.valueOf()
  }
  get timeoutCount () {
    return this._t_timeoutCount.valueOf()
  }
  get execCount () {
    return this._t_execCount.valueOf()
  }
  get intervalCount () {
    return this._t_intervalCount.valueOf()
  }
  get totalRspTime () {
    return this._t_totalRspTime.valueOf()
  }
  get maxRspTime () {
    return this._t_maxRspTime.valueOf()
  }
  get minRspTime () {
    return this._t_minRspTime.valueOf()
  }

  set count (value) {
    this._t_count = new (TModel.TInt32)(value)
  }
  set timeoutCount (value) {
    this._t_timeoutCount = new (TModel.TInt32)(value)
  }
  set execCount (value) {
    this._t_execCount = new (TModel.TInt32)(value)
  }
  set intervalCount (value) {
    this._t_intervalCount = new (TModel.TMap(TModel.TInt32, TModel.TInt32))(value)
  }
  set totalRspTime (value) {
    this._t_totalRspTime = new (TModel.TInt64)(value)
  }
  set maxRspTime (value) {
    this._t_maxRspTime = new (TModel.TInt32)(value)
  }
  set minRspTime (value) {
    this._t_minRspTime = new (TModel.TInt32)(value)
  }

  writeTo (os, tBuffer) {
    this._t_count.write(os, 0)
    this._t_timeoutCount.write(os, 1)
    this._t_execCount.write(os, 2)
    this._t_intervalCount.write(os, 3)
    this._t_totalRspTime.write(os, 4)
    this._t_maxRspTime.write(os, 5)
    this._t_minRspTime.write(os, 6)
  }

  valueOf () {
    return {
      count: this._t_count.valueOf(),
      timeoutCount: this._t_timeoutCount.valueOf(),
      execCount: this._t_execCount.valueOf(),
      intervalCount: this._t_intervalCount.valueOf(),
      totalRspTime: this._t_totalRspTime.valueOf(),
      maxRspTime: this._t_maxRspTime.valueOf(),
      minRspTime: this._t_minRspTime.valueOf()
    }
  }
}
class StatSampleMsg extends TModel.TStruct {
  static parse (value) {
    return Object.assign({}, {
      unid: '',
      masterName: '',
      slaveName: '',
      interfaceName: '',
      masterIp: '',
      slaveIp: '',
      depth: 0,
      width: 0,
      parentWidth: 0
    }, value)
  }
  static readFrom (is, tBuffer) {
    let unid = (TModel.TString).read(is, 0, true)
    let masterName = (TModel.TString).read(is, 1, true)
    let slaveName = (TModel.TString).read(is, 2, true)
    let interfaceName = (TModel.TString).read(is, 3, true)
    let masterIp = (TModel.TString).read(is, 4, true)
    let slaveIp = (TModel.TString).read(is, 5, true)
    let depth = (TModel.TInt32).read(is, 6, true)
    let width = (TModel.TInt32).read(is, 7, true)
    let parentWidth = (TModel.TInt32).read(is, 8, true)
    return new StatSampleMsg({
      unid, masterName, slaveName, interfaceName, masterIp, slaveIp, depth, width, parentWidth
    }).valueOf()
  }
  constructor (value) {
    super(value)

    this._t_unid = new (TModel.TString)(this._value.unid)
    this._t_masterName = new (TModel.TString)(this._value.masterName)
    this._t_slaveName = new (TModel.TString)(this._value.slaveName)
    this._t_interfaceName = new (TModel.TString)(this._value.interfaceName)
    this._t_masterIp = new (TModel.TString)(this._value.masterIp)
    this._t_slaveIp = new (TModel.TString)(this._value.slaveIp)
    this._t_depth = new (TModel.TInt32)(this._value.depth)
    this._t_width = new (TModel.TInt32)(this._value.width)
    this._t_parentWidth = new (TModel.TInt32)(this._value.parentWidth)
  }

  get unid () {
    return this._t_unid.valueOf()
  }
  get masterName () {
    return this._t_masterName.valueOf()
  }
  get slaveName () {
    return this._t_slaveName.valueOf()
  }
  get interfaceName () {
    return this._t_interfaceName.valueOf()
  }
  get masterIp () {
    return this._t_masterIp.valueOf()
  }
  get slaveIp () {
    return this._t_slaveIp.valueOf()
  }
  get depth () {
    return this._t_depth.valueOf()
  }
  get width () {
    return this._t_width.valueOf()
  }
  get parentWidth () {
    return this._t_parentWidth.valueOf()
  }

  set unid (value) {
    this._t_unid = new (TModel.TString)(value)
  }
  set masterName (value) {
    this._t_masterName = new (TModel.TString)(value)
  }
  set slaveName (value) {
    this._t_slaveName = new (TModel.TString)(value)
  }
  set interfaceName (value) {
    this._t_interfaceName = new (TModel.TString)(value)
  }
  set masterIp (value) {
    this._t_masterIp = new (TModel.TString)(value)
  }
  set slaveIp (value) {
    this._t_slaveIp = new (TModel.TString)(value)
  }
  set depth (value) {
    this._t_depth = new (TModel.TInt32)(value)
  }
  set width (value) {
    this._t_width = new (TModel.TInt32)(value)
  }
  set parentWidth (value) {
    this._t_parentWidth = new (TModel.TInt32)(value)
  }

  writeTo (os, tBuffer) {
    this._t_unid.write(os, 0)
    this._t_masterName.write(os, 1)
    this._t_slaveName.write(os, 2)
    this._t_interfaceName.write(os, 3)
    this._t_masterIp.write(os, 4)
    this._t_slaveIp.write(os, 5)
    this._t_depth.write(os, 6)
    this._t_width.write(os, 7)
    this._t_parentWidth.write(os, 8)
  }

  valueOf () {
    return {
      unid: this._t_unid.valueOf(),
      masterName: this._t_masterName.valueOf(),
      slaveName: this._t_slaveName.valueOf(),
      interfaceName: this._t_interfaceName.valueOf(),
      masterIp: this._t_masterIp.valueOf(),
      slaveIp: this._t_slaveIp.valueOf(),
      depth: this._t_depth.valueOf(),
      width: this._t_width.valueOf(),
      parentWidth: this._t_parentWidth.valueOf()
    }
  }
}

class StatFProxy {
  static get Protocol () {
    return TafProtocolClient
  }
  constructor () {
    this._name = undefined
    this._objectProxy = undefined
  }
  setTimeout (value) {
    this._objectProxy.timeout = value
  }
  getTimeout () {
    return this._objectProxy.timeout
  }
  reportMicMsg (msg, bFromClient, ...args) {
    let _encode = () => {
      let os = new TModel.TOutputStream()
      new (TModel.TMap(StatMicMsgHead, StatMicMsgBody))(msg).write(os, 1)
      new (TModel.TBool)(bFromClient).write(os, 2)
      return os.tBuffer.buffer
    }
    let _decode = rpcResult => {
      try {
        let response = { arguments: {} }
        let is = new TModel.TInputStream(new TModel.TBuffer(rpcResult.responseMessage.responsePacket.sBuffer))
        response.costtime = rpcResult.costTime
        response.return = TModel.TInt32.read(is, 0, true)
        return { request: rpcResult.requestMessage, response }
      } catch (error) {
        throw new ClientDecodeError(error.message, rpcResult.requestMessage, rpcResult.responseMessage, rpcResult.costTime, rpcResult.endpointInfo)
      }
    }
    let _error = rpcError => {
      let code = rpcError.responseMessage ? rpcError.responseMessage.code : -999
      let message = rpcError.responseMessage ? rpcError.responseMessage.message : rpcError.message
      throw new RpcError(code, message, rpcError.requestMessage, rpcError.responseMessage, rpcError.costTime, rpcError.endpointInfo)
    }
    return this._objectProxy.invoke('reportMicMsg', _encode(), args.length > 0 ? args[0] : undefined).then(_decode, _error)
  }
  reportSampleMsg (msg, ...args) {
    let _encode = () => {
      let os = new TModel.TOutputStream()
      new (TModel.TList(StatSampleMsg))(msg).write(os, 1)
      return os.tBuffer.buffer
    }
    let _decode = rpcResult => {
      try {
        let response = { arguments: {} }
        let is = new TModel.TInputStream(new TModel.TBuffer(rpcResult.responseMessage.responsePacket.sBuffer))
        response.costtime = rpcResult.costTime
        response.return = TModel.TInt32.read(is, 0, true)
        return { request: rpcResult.requestMessage, response }
      } catch (error) {
        throw new ClientDecodeError(error.message, rpcResult.requestMessage, rpcResult.responseMessage, rpcResult.costTime, rpcResult.endpointInfo)
      }
    }
    let _error = rpcError => {
      let code = rpcError.responseMessage ? rpcError.responseMessage.code : -999
      let message = rpcError.responseMessage ? rpcError.responseMessage.message : rpcError.message
      throw new RpcError(code, message, rpcError.requestMessage, rpcError.responseMessage, rpcError.costTime, rpcError.endpointInfo)
    }
    return this._objectProxy.invoke('reportSampleMsg', _encode(), args.length > 0 ? args[0] : undefined).then(_decode, _error)
  }
}

class StatFServant {
  doRequest (requestMessage) {
    let { requestId, funcName, appBuffer } = requestMessage
    let is = new TModel.TInputStream(new TModel.TBuffer(appBuffer))
    let os = new TModel.TOutputStream()
    switch (funcName) {
      case 'reportMicMsg': {
        let msg = TModel.TMap(StatMicMsgHead, StatMicMsgBody).read(is, 1, true)
        let bFromClient = TModel.TBool.read(is, 2, true)
        return this.reportMicMsg(msg, bFromClient).then(ret => {
          new (TModel.TInt32)(ret.return).write(os, 0)
          let responseMessage = new ResponseMessage({
            requestId,
            code: 0,
            message: 'success',
            responsePacket: {
              iMessageType: 0,
              sBuffer: os.tBuffer.buffer,
              context: requestMessage.context || {}
            }
          })
          return Promise.resolve({ responseMessage })
        }).catch(error => {
          let code = error.code ? error.code : -999
          let message = error.message || 'unknown error'
          let rpcError = new RpcError(code, message, requestMessage, null, 0, null)
          return Promise.reject(rpcError)
        })
      }
      case 'reportSampleMsg': {
        let msg = TModel.TList(StatSampleMsg).read(is, 1, true)
        return this.reportSampleMsg(msg).then(ret => {
          new (TModel.TInt32)(ret.return).write(os, 0)
          let responseMessage = new ResponseMessage({
            requestId,
            code: 0,
            message: 'success',
            responsePacket: {
              iMessageType: 0,
              sBuffer: os.tBuffer.buffer,
              context: requestMessage.context || {}
            }
          })
          return Promise.resolve({ responseMessage })
        }).catch(error => {
          let code = error.code ? error.code : -999
          let message = error.message || 'unknown error'
          let rpcError = new RpcError(code, message, requestMessage, null, 0, null)
          return Promise.reject(rpcError)
        })
      }
      default:
        return Promise.reject(new ServerFuncNotFoundError(funcName + ' not found', requestMessage, null, 0, null))
    }
  }
  reportMicMsg (msg, bFromClient) {
    let ret = {}
    ret.return = 0
    return Promise.resolve(ret)
  }
  reportSampleMsg (msg) {
    let ret = {}
    ret.return = 0
    return Promise.resolve(ret)
  }
}

exports.taf = exports.taf || {}
exports.taf.StatMicMsgHead = StatMicMsgHead
exports.taf.StatMicMsgBody = StatMicMsgBody
exports.taf.StatSampleMsg = StatSampleMsg
exports.taf.StatFProxy = StatFProxy
exports.taf.StatFServant = StatFServant
