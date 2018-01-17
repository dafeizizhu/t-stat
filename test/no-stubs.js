/* global describe, it */

const { TConfig } = require('t-util')
const { TClient } = require('t-rpc')

const TStat = require('../index')

describe('TStat', () => {
  it('test', done => {
    let tConfig = TConfig.parseFile(process.env.TAF_PROD_CONFIG)
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

    console.info(tStat)
    console.info('headers', headers)
    console.info('type', type)
    console.info('time', time)

    tStat.report(headers, type, time)

    setTimeout(() => {
      tClient.destroy()
      done()
    }, 1500)
  })
})
