export const randoms = (max, min, cant) => {

    let numeros = {}
    for(let i = 0; i < cant; i++) {

        const random = Math.floor(Math.random() * (max - min) + 1)
        
        if (numeros[random]) {
            
            numeros[random] = numeros[random] + 1

        } else {

            numeros[random] = 1

        }



    } 

    return numeros

}

process.on('message', (opt) => {
    
    // if (msg == 'start') {
    if (opt.message == 'start') {
  
        console.log("Generacion de numeros random en proceso :" , process.pid); 
        const numeros = randoms(opt.max, opt.min, opt.cant)
        process.send(numeros)

    }
    
} )