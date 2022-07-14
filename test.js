
const array = [100, 200, 300]
const array2 = ['りんご', 'みかん', 'ぶどう']
const result = array.map((data, index) => {
    return {name: data, price: array2[index]}
})
console.log(result)