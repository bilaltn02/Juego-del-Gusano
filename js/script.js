let contenedor = document.getElementById("contenedor")
let puntuacion=document.getElementById("puntuacion")
let cuadrados = document.getElementsByClassName("divs")

//los cuadrados que tiene el tablero de izquierda a derecha(40)
let width = 40
//la direccion que tiene el gusano al empezar la partida
let direccion = 1
//los puntos que se van sumando según coma una manzana
let puntos = 0





//Const para que el contenedor se reparta en cuadrados pequeños y añadirles la clase divs
//600 son todos los cuadrados que tiene el contenedor
const contenedorjuego=()=> {
    for (let i = 0; i < 600; i++) {
        let div = document.createElement("div");
        div.classList.add("divs")
        contenedor.appendChild(div);
    }
}





//Const que tiene el const de crearmanzana para crear una manzana, poner a 0 los puntos, poner a las posiciones (0,1) y (0,2) la clase de serpiente y el set interval para el movimiento de la serpiente
const juego=()=> {
    crearmanzana()

    puntuacion.textContent=puntos
    
    serpiente = [1, 0]
    serpiente.forEach((i) => cuadrados[i].classList.add("snake"))

    intervalTime = 80
    interval = setInterval(choque, intervalTime)
}





//Const para según que tecla pulsas se mueve a un lado o a otro
const control=(event)=> {
    switch(event.keyCode){
        case 37://izquierda
            if(direccion != 1)
                direccion = -1
            break;
        case 39://derecha
            if(direccion != -1)
                direccion = 1
            break;
        case 38://arriba
            if(direccion != +width)
                direccion = -width
            break;
        case 40://abajo
            if(direccion != -width)
                direccion = +width
            break;
    }
}




//Const con un if para ver si se ha chocado con las paredes o contra si mismo y el else se utiliza para ir añadiendo una clase mas al principio y luego se elimina la clase de snake y el pop para eliminar la ultima clase de la serpiente para el movimiento.
//El if dentro del else controla si la serpiente esta en en cuadrado donte esta la manzana y lo que hace es eliminar la imagen y cambia el nombre de la clase. Crea otra manzana, suma un punto y reinicia el interval
const choque=()=> {
    //El numero 15 son los cuadrados que hay de arriba a abajo
    if ((serpiente[0] + width >= width * 15 && direccion == +width) ||
        (serpiente[0] - width <= 0 && direccion == -width) ||
        (serpiente[0] % width == width - 1 && direccion == 1) ||
        (serpiente[0] % width == 0 && direccion == -1) ||
        cuadrados[serpiente[0]+direccion].classList.contains("snake")) {
        clearInterval(interval)
    } else {
        let ultimocuadrado = serpiente.pop()
        cuadrados[ultimocuadrado].classList.remove("snake")
        serpiente.unshift(serpiente[0] + direccion);

        if (cuadrados[serpiente[0]].classList.contains("manzana")) {
            cuadrados[serpiente[0]].removeChild(img)
            cuadrados[serpiente[0]].classList.remove("manzana")
            cuadrados[ultimocuadrado].classList.add("snake")
            serpiente.push(ultimocuadrado)

            crearmanzana()
    
            puntos++
            puntuacion.textContent = puntos
    
            clearInterval(interval)
    
            interval = setInterval(choque, intervalTime)
        }
        cuadrados[serpiente[0]].classList.add("snake")
    }
}





//Const para crear una IMG para poner la manzana en un cuadrado pequeño random del contenedor que no sea la misma en la que se encuentra la serpiente cuando la serpiente accede al div de la manzana
const crearmanzana=()=> {
    do {
      manzana = Math.floor(Math.random() * cuadrados.length)
    } while (cuadrados[manzana].classList.contains("snake"))

    cuadrados[manzana].classList.add("manzana")
    let img=document.createElement("IMG")
    img.classList.add("manzana")
    img.id ="img"
    img.src="../images/manzana.png"
    cuadrados[manzana].appendChild(img)
}





//DOMContentLoaded
document.addEventListener("DOMContentLoaded", contenedorjuego)
document.addEventListener("DOMContentLoaded", juego)
document.addEventListener("keydown", control)
