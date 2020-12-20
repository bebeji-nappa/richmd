import mtp from '@/parse/index.js'
import { mdConvert } from '.'
const text = `|  TH1  |  TH2  |
| ---- | ---- |
|  TD1  |  TD2  |
|  TD1  |  TD2  |`

console.log(mdConvert(text))
console.log(JSON.stringify(mtp(text), null, '  '))
