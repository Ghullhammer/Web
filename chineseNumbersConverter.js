function toChineseNumeral(num){

    var numerals = {
        "-":"负",
        ".":"点",
        0:"零",
        1:"一",
        2:"二",
        3:"三",
        4:"四",
        5:"五",
        6:"六",
        7:"七",
        8:"八",
        9:"九",
        10:"十",
        100:"百",
        1000:"千",
        10000:"万"
    };


    let result = []
    

    let [intPart, fracPart] = num.toString().split(".");
    let splitedNumInt = intPart.split("");
    let splitedNumFraction = fracPart ? fracPart.split("") : undefined;
    
    // Проверка отрицательного числа
    let negativeFlag = false;
    if(splitedNumInt[0] == "-"){
        splitedNumInt.shift()
        negativeFlag = true;
        
    }
    
    console.log()
    if(splitedNumInt.join("")>=10 && splitedNumInt.join("") <=19){
        result.push(numerals[10]);
        result.push(numerals[splitedNumInt[1]]);
    } else{
        
        let splitedLen = splitedNumInt.length;
        for(let i = 0; i<splitedLen; i++){

            // Если последний записанный символ был ноликом, не записываем
            if(splitedNumInt[i] == "0" && result[result.length-1] == "零"){
                continue;
            } else{
                result.push(numerals[splitedNumInt[i]]);
            }   
            
            let rank = splitedLen-i-1;

            rank > 4 ? rank = 4 : "";
            
            if(rank && splitedNumInt[i] != 0){
                result.push(numerals[Math.pow(10, rank)]);
            }
        }
    }


    // Удаление внешних ноликов
    while(result[result.length-1] == "零" && result.length>1){
        result.pop()
    }

    negativeFlag ? result.unshift("负") : "";

    if(splitedNumFraction){
        result.push(numerals["."])
        for(let fractionNum of splitedNumFraction){
            result.push(numerals[fractionNum])
        }
    }

    return result.join("");
    
    
}
console.log(toChineseNumeral(-2845134.156))