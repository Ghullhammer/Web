
function calcGMD(a, b){

    while(b!=0){
        b = b%a;
        if(b == 0){
            return a;
        } else{
            a = b;
        }
        console.log(`${a}, ${b}`)
    }
    return a;
}

function kiyoLcm(a) {
    //your code
      
      for(let lineIndex in a){
        a[lineIndex] = a[lineIndex].filter((a)=>a%2!=0).reduce( (sum, a)=>sum+a);
      }

      for(let numIndex in a){
        if(numIndex+1<=a.length){
            calcGMD(Math.max(a[numIndex], a[numIndex+1]), Math.min(a[numIndex], a[numIndex+1]))
        }
      

      return a;

      
}

console.log(kiyoLcm([
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ]))