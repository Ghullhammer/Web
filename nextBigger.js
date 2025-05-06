function nextBigger(n){
    n = n.toString().split("")

    for(let i = n.length-1; i>= 0; i--){

        for(let a = i; a<n.length; a++){

            

            if(n[a]>n[i]){


                // После индекса i я групирую от меньшего к большему, первое значение меняю с a[i] и еще раз сортирую

                let firstPart = n.slice(0, a);
                let secondPart = n.slice(a).sort((v, b) => v-b);

                for(let p = 0; p<secondPart.length; p++){
                    if(secondPart[p] > n[i]){
                        let buff = n[i];
                        firstPart[i] = secondPart[p];
                        secondPart[p] = buff;
                        break;
                    }
                }

                secondPart = secondPart.sort((v, b) => v-b)
                return +[...firstPart, ...secondPart].join("");
            }
        }

    }
    return -1;


}

console.log(nextBigger(12))