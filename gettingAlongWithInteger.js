function part(n) {
    
    let result = []

    result.push(n)
    
    function recHandler(temp){

        for(let i = 1; i<=Math.floor((n)/2); i++){
    
            while(temp[0]-i>0){

                if(temp[0] == 5 || temp[0] == 3){
                    console.log(temp)
                }

                temp.push(i);
                temp[0]-=i;
    
                let mult = temp.reduce((acc, val)=> acc*=val);
                if(result.includes(mult)){
                    continue;
                } else{
                    result.push(mult);
                }
                recHandler([...temp])
            }
            temp = [n]
            
        }
    }   
    recHandler([n])

    result = result.sort((a, b) => a-b)
    console.log(result);

    let range = result[result.length-1] - result[0];
    let average = (result.reduce((acc, val)=> acc+=val) / result.length).toFixed(2);
    let median = (()=>{
        let lessCenter = Math.floor(result.length/2);
        if(result.length % 2 == 0){
            return ((result[lessCenter] + result[lessCenter-1]) / 2).toFixed(2)
        } else{
         return result[lessCenter].toFixed(2)
        }
    })()
    return `Range: ${range} Average: ${average} Median: ${median}`;
    

}

console.log(part(10))

// 30
// 10 - 5 = [5 5]
// 5 - 2 = [3 5 2]


// 30 = [3 2 5]








// function part(n) {
//     const partitions = [];

//     // Функция для построения всех разбиений числа n
//     function generatePartitions(target, max, current) {
//         if (target === 0) {
//             partitions.push(current);
//             return;
//         }
//         for (let i = Math.min(max, target); i >= 1; i--) {
//             generatePartitions(target - i, i, current.concat(i));
//         }
//     }

//     generatePartitions(n, n, []);
//     // Теперь у нас есть все разбиения
//     const productsSet = new Set();
//     for (let part of partitions) {
//         const product = part.reduce((acc, val) => acc * val, 1);
//         productsSet.add(product);
//     }
    
//     const products = Array.from(productsSet).sort((a, b) => a - b);
//     console.log(products)

//     const range = products[products.length - 1] - products[0];
//     const average = (products.reduce((acc, val) => acc + val, 0) / products.length).toFixed(2);
//     let median;
//     const len = products.length;
//     if (len % 2 === 0) {
//         median = ((products[len / 2 - 1] + products[len / 2]) / 2).toFixed(2);
//     } else {
//         median = (products[Math.floor(len / 2)]).toFixed(2);
//     }
    
//     return `Range: ${range} Average: ${average} Median: ${median}`;
// }

 // Проверка
// console.log(part(10)); // попробуй на 10


