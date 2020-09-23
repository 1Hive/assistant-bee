const gql = require('graphql-tag')
const GraphQLWrapper = require('@aragon/connect-thegraph')

const HONEY_MAKER_ADDRESS = '0x076b64f9f966e3bbd0fcdc79d490ab71cf961bb0'
const ISSUER_ADDRESS = '0xB9FB2aD5820cCD9Fd7BD6a9E35f98B22914DB58A'
const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/crisog/honey-common-pool'

const unixTimeDay = 86400

// This is the timestamp from 24 hours ago.
const timestamp = Math.round((new Date()).getTime() / 1000) - unixTimeDay

const QUERY_24HR_TRANSFERS = gql.default`
  query TransfersData($timestamp: BigInt) {
    transfers(where: { timestamp_gte: $timestamp}) {
      amount
      token
    }
  }
`

const QUERY_24HR_DEPOSITS_ADDRESS = gql.default`
  query DepositsData($timestamp: BigInt, $address: String) {
    deposits(where: { timestamp_gte: $timestamp, id: $$address }) {
      amount
      token
    }
  }
`


module.exports = async function getHoneyFlow(message) {
  
  // Create the GraphQL wrapper using the specific Subgraph URL
  const wrapper = new GraphQLWrapper(SUBGRAPH_URL)

  // Inbound queries
  const { honeyMakerData } = await wrapper.performQuery(QUERY_24HR_DEPOSITS_ADDRESS, {
    timestamp,
    HONEY_MAKER_ADDRESS
  })
  
  let totalHoneyMakerInbound = 0
  
  honeyMakerData.forEach(({amount}) => totalHoneyMakerInbound += amount)

  const { issuanceData } = await wrapper.performQuery(QUERY_24HR_DEPOSITS_ADDRESS, {
    timestamp,
    ISSUER_ADDRESS
  })
  
  let totalIssuanceInbound = 0
  
  issuanceData.forEach(({amount}) => totalIssuanceInbound += amount)

  let totalInbound = totalIssuanceInbound + totalHoneyMakerInbound

  const honeyMakerPercentage = (totalHoneyMakerInbound / totalInbound) * 100
  const issuancePercentage = (totalIssuanceInbound / totalInbound) * 100

  // Outbound queries
  const { outboundData } = await wrapper.performQuery(QUERY_24HR_TRANSFERS, {
    timestamp
  })
  
  let totalOutbound = 0
  
  outboundData.forEach(({amount}) => totalOutbound += amount)

  message.reply({
    'embeds': [
      {
        'title': ':honey_pot: Honey Flow (inbound, 24hrs)',
        'color': 3320370,
        'fields': [
          {
            'name': 'Total Inflow',
            'value': `${totalInbound} HNY`
          },
          {
            'name': 'Honeymaker',
            'value': `${totalHoneyMakerInbound} HNY (${honeyMakerPercentage}%)`
          },
          {
            'name': 'Issuance',
            'value': `${totalIssuanceInbound} HNY (${issuancePercentage}%)`
          }
        ]
      },
      {
        'title': ':honey_pot: Honey Flow (outbound, 24hrs)',
        'color': 13571606,
        'fields': [
          {
            'name': 'Outflow',
            'value': `${totalOutbound} HNY`
          }
        ]
      }
    ]
  })
}