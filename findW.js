
function spacesHelp(base, len){

    
    for(let a = 0; a<len; a++){
        base+= " ";
    }
    
    return base;

}

function getW(height) {
    // your code here
    let len = height * 4 - 3;

    let verh = Math.ceil(len/2)

    
    let result = []

    for(let i = 0; i<height; i++){

        let base = ""
        base = spacesHelp(base, i); // Префикс

        base+= "*" // Первая звезда

        base = spacesHelp(base, verh-2*(i+1)); // Середина

        if(verh-2*(i+1) >=0){
            base+= "*" // Последняя звезда
        }
        
        base= spacesHelp(base, i); // Суфикс
        
        
        result[i] = base.concat(base.slice(1));

    }
    return result;

}


console.dir(getW(3))