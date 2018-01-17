/* global describe, it */

const assert = require('assert')
const path = require('path')
const proxyquire = require('proxyquire')

const { TConfig } = require('t-util')

const stubs = require('./stubs')

const { TClient } = proxyquire('t-rpc', {
  net: stubs.net
})
const TStat = proxyquire('../lib/t-stat', {
  net: stubs.net
})

describe('TStat', () => {
  let registryResponseBuffer = Buffer.from([
    0x00, 0x00, 0x00, 0x3d, 0x10, 0x01, 0x2c, 0x30,
    0x01, 0x4c, 0x5c, 0x6d, 0x00, 0x00, 0x2a, 0x0c,
    0x29, 0x00, 0x01, 0x0a, 0x06, 0x0e, 0x32, 0x32,
    0x32, 0x2e, 0x32, 0x32, 0x32, 0x2e, 0x32, 0x32,
    0x32, 0x2e, 0x32, 0x32, 0x11, 0x42, 0x69, 0x22,
    0x00, 0x00, 0xea, 0x60, 0x30, 0x01, 0x4c, 0x50,
    0xff, 0x60, 0xff, 0x76, 0x00, 0x8c, 0x0b, 0x39,
    0x0c, 0x78, 0x0c, 0x86, 0x00
  ])

  it('report', done => {
    let tConfig = TConfig.parseFile(path.join(__dirname, 'Prod.Video.UploadStatusServer.config.conf'))
    let tClient = new TClient(tConfig)
    let tStat = new TStat(tClient, tConfig)

    let masterName = tConfig.data.taf.application.client.modulename || ''
    let slaveName = 'Nodejs.DemoServer'
    let interfaceName = 'echo'
    let masterIp = tConfig.data.taf.application.server.localip
    let slaveIp = tConfig.data.taf.application.server.localip
    let slavePort = 17001
    let bFromClient = true
    let headers = { masterName, slaveName, interfaceName, masterIp, slaveIp, slavePort, bFromClient }
    let type = TStat.TYPE.SUCCESS
    let time = 100

    tStat.report(headers, type, time)

    setTimeout(() => {
      let socketStubs = stubs.net.getSocketStubs()
      assert.equal(socketStubs.length, 1)
      let registrySocketStub = socketStubs[0]

      setTimeout(() => registrySocketStub.emit('connect'), 100)
      setTimeout(() => registrySocketStub.emit('data', registryResponseBuffer), 200)
      setTimeout(() => {
        let socketStubs = stubs.net.getSocketStubs()
        assert.equal(socketStubs.length, 2)
        let socketStub = socketStubs[1]
        setTimeout(() => socketStub.emit('connect'), 100)
      }, 300)
    }, 1100)

    Promise.all([
      new Promise((resolve, reject) => {
        tClient.on('response', obj => {
          let { rpcResult } = obj
          if (rpcResult) {
            let { servantName, funcName, packetType } = rpcResult.requestMessage
            assert.equal(servantName, 'taf.tafregistry.QueryObj')
            assert.equal(funcName, 'findObjectByIdInSameGroup')
            assert.equal(packetType, 0)
            let { code, message } = rpcResult.responseMessage
            assert.equal(code, 0)
            assert.equal(message, '')
            resolve()
          }
        })
      }),
      new Promise((resolve, reject) => {
        tClient.on('response', obj => {
          let { rpcError } = obj
          if (rpcError) {
            let { servantName, funcName, packetType } = rpcError.requestMessage
            assert.equal(servantName, 'taf.tafstat.StatObj')
            assert.equal(funcName, 'reportMicMsg')
            assert.equal(packetType, 1)
            resolve()
          }
        })
      })
    ]).then(() => done()).catch(done)
  })
})
