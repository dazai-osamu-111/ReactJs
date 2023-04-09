import 'core-js/modules/es.object.values'
import 'core-js/modules/es.promise'
import sum from './untils'
import domHandler from './dom'
import './styles/style.css'
import './styles/style.scss'

console.log(sum(100, 10))

domHandler()
// ES6 spread Operator
const person = { name: 'duoc' }
const personClone = { ...person }
console.log('personClone', personClone);

// ES7 Object value
console.log('Object.value', Object.values(personClone))

// Promise Async Await
const handle = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(100)
    }, 1000)
})

const main = async () => {
    const value = await handle()
    console.log("Value", value)
}

main()