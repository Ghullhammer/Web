function findVariant(num){
  
    switch(num){
        case 1:
          return [1,2,4];
          break;
        case 2:
          return [2, 1, 5, 3];
          break;
        case 3:
          return [3, 2, 6];
          break;
        case 4:
          return [4, 1,5,7];
          break;
        case 5:
          return [5, 2, 4, 6, 8];
          break;
        case 6:
          return [6, 3, 5, 9];
          break;
        case 7:
          return [7, 4,8];
          break;
        case 8:
          return [8, 7, 5, 9, 0];
          break;
        case 9:
          return [9, 8, 6];
          break;
        case 0:
          return [0, 8];
          break;
    }
    
  }
  
function getPINs(observed) {
    // TODO: This is your job, detective!
    
    let result = [];
    function recursion(prefix, suffix){
  
        if(suffix){
            let variants = findVariant(+suffix[0])
            for(let variant of variants){
                recursion([...prefix, variant], suffix.slice(1))
            }
        } else{
            result.push(prefix.join(""));
        } 
    }
    recursion([], observed);
    
    
    return result
  }

console.log(getPINs("11"))