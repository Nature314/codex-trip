import { tips as tipsData } from './mockData.js'

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

export async function getTips() {
  await delay(100)
  return tipsData
}
