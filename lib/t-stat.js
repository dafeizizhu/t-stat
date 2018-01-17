const assert = require('assert')

const TModel = require('t-model')

const { StatMicMsgHead, StatMicMsgBody, StatFProxy } = require('./res/StatF').taf

const ranges = [5, 10, 50, 100, 200, 500, 1000, 2000, 3000]

const TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  TIMEOUT: 'timeout'
}

class ReportObj {
  constructor (headers) {
    this._head = new StatMicMsgHead()
    this._head.masterName = headers.masterName
    this._head.slaveName = headers.slaveName
    this._head.interfaceName = headers.interfaceName
    this._head.masterIp = headers.masterIp
    this._head.slaveIp = headers.slaveIp
    this._head.slavePort = headers.slavePort

    if (isFinite(headers.returnValue)) {
      this._head.returnValue = parseInt(headers.returnValue, 10)
    } else {
      this._head.returnValue = 0
    }
    if (typeof headers.slaveSetName === 'string') this._head.slaveSetName = headers.slaveSetName
    if (typeof headers.slaveSetArea === 'string') this._head.slaveSetArea = headers.slaveSetAresa
    if (typeof headers.slaveSetID === 'string') this._head.slaveSetID = headers.slaveSetID
    if (typeof headers.masterSetInfo === 'string') this._head.sMasterSetInfo = headers.masterSetInfo

    this._head.iStatVer = 2

    this._body = new StatMicMsgBody()
    this._body.count = 0
    this._body.timeoutCount = 0
    this._body.execCount = 0

    this._body.intervalCount = ranges.reduce((p, c) => {
      p[c] = 0
      return p
    }, {})

    this._body.totalRspTime = 0
    this._body.maxRspTime = 0
    this._body.minRspTime = 0

    this._bFromClient = headers.bFromClient
  }
  add (type, time) {
    switch (type) {
      case TYPE.SUCCESS:
        this._body.count += 1
        break
      case TYPE.TIMEOUT:
        this._body.timeoutCount += 1
        return
      case TYPE.ERROR:
      default:
        this._body.execCount += 1
        return
    }

    let r = range => {
      if (time <= range) {
        let temp = this._body.intervalCount
        temp[range] += 1
        this._body.intervalCount = temp
        return true
      }
    }

    if (ranges.some(r)) {
      let range = ranges[ranges.length - 1]
      let temp = this._body.intervalCount
      temp[range] += 1
      this._body.intervalCount = temp
    }

    this._body.maxRspTime = Math.max(this._body.maxRspTime, time)
    this._body.minRspTime = Math.min(this._body.minRspTime, time)
    this._body.totalRspTime += time
  }
}

class TStat {
  static get TYPE () {
    return TYPE
  }
  constructor (tClient, tConfig) {
    this._tClient = tClient
    this._tConfig = tConfig
    this._data = {}
    this._reportInterval = 60000

    try {
      this._statObj = this._tConfig.data.taf.application.client.stat
      this._proxy = this._tClient.stringToProxy(StatFProxy, this._statObj)
    } catch (error) {
      console.warn('initialize proxy error', error.message)
    }

    try {
      let reportInterval = this._tConfig.data.taf.application.client['report-interval']
      if (!isNaN(reportInterval)) {
        this._reportInterval = parseInt(reportInterval, 10) * 1000
      }
    } catch (error) {
      console.warn('use default report interval')
    }
  }
  report (headers, type, timeout) {
    if (type === TYPE.SUCCESS) {
      assert(Number.isFinite(timeout) && timeout >= 0, 'timeout is not a number or less than 0')
    }

    let key = Object.keys(headers).map(key => headers[key]).join('.')

    this._data[key] = this._data[key] || new ReportObj(headers)
    this._data[key].add(type, timeout)

    if (!this._timer) {
      this._timer = setTimeout(() => this.task(), this.reportInterval)
    }
  }
  task () {
    if (this._proxy) {
      let msgList = {
        fromClient: new (TModel.TMap(StatMicMsgHead, StatMicMsgBody))(),
        fromServer: new (TModel.TMap(StatMicMsgHead, StatMicMsgBody))()
      }

      Object.keys(this._data).forEach(key => {
        msgList[this._data[key]._bFromClient ? 'fromClient' : 'fromServer'].put(this._data[key]._head.valueOf(), this._data[key]._body.valueOf())
      })

      this._data = {}
      this._timer = undefined

      if (msgList.fromClient.size() > 0) {
        this._proxy.reportMicMsg(msgList.fromClient.valueOf(), true, { packetType: 1 }).catch(() => {})
      }
      if (msgList.fromServer.size() > 0) {
        this._proxy.reportMicMsg(msgList.fromClient.valueOf(), false, { packetType: 1 }).catch(() => {})
      }
    }
  }
  destroy () {
    clearTimeout(this._timer)
    this._data = {}
    this._timer = undefined
  }
}

module.exports = TStat
