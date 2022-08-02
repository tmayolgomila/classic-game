const contenedor= document.querySelector('.contenedor')
// definimos medidas
const altoTablero = 300
const anchoTablero = 570
const altoBloque = 20
const anchoBloque = 100

//definir posicion usuario
const posicionInicialUsuario = [230, 10]
let posicionActualUsuario = posicionInicialUsuario
//definir posicion bola
const posicionInicialBola = [270, 40]
let posicionActualBola = posicionInicialBola
//definicion particularidad de la bola
let xDireccionBola = 2
let yDireccionBola = 2
let diametro = 20
//definir timer
let timerID

//definicion clase bloque
class Bloque{
    constructor(ejeX, ejeY){
    this.bottomLeft =[ejeX, ejeY]
    this.bottomRight = [ejeX + anchoBloque, ejeY]
    this.topLeft = [ejeX, ejeY + altoBloque]
    this.topRight = [ejeX + anchoBloque, ejeY + altoBloque]
    }
}   

//definir todos los bloques
const bloques = [
    new Bloque(10, 250),
    new Bloque(120, 250),
    new Bloque(230, 250),
    new Bloque(340, 250),
    new Bloque(450, 250),
    new Bloque(10, 220),
    new Bloque(120, 220),
    new Bloque(230, 220),
    new Bloque(340, 220),
    new Bloque(450, 220),
    new Bloque(10, 190),
    new Bloque(120, 190),
    new Bloque(230, 190),
    new Bloque(340, 190),
    new Bloque(450, 190),
]
//Funcion añadir bloques
function addBloques(){
    for(let i = 0; i < bloques.length; i++){
        const bloque = document.createElement('div')
        bloque.classList.add('bloque')
        bloque.style.left = bloques[i].bottomLeft[0] + 'px'
        bloque.style.bottom = bloques[i].bottomRight[1]+ 'px'
        contenedor.appendChild(bloque)
    }
}
addBloques()
//definimos el usuario
function dibujarUsuario(){
    usuario.style.left = posicionActualUsuario[0] + 'px'
    usuario.style.bottom = posicionActualUsuario[1] + 'px'
}

//Añadir usuario
const usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarUsuario()
//Mover al usuario por el tablero
function moverUsuario(e){
    switch(e.key){
        case 'ArrowLeft':
            if(posicionActualUsuario[0] > 0){
                posicionActualUsuario[0] -= 10
                dibujarUsuario()
            }
            break
        case 'ArrowRight':
            if(posicionActualUsuario[0]< (anchoTablero - anchoBloque)){
                posicionActualUsuario[0] += 10
                dibujarUsuario()
            }
            break
    }
}
//Añadir event listener para el documento
document.addEventListener('keydown', moverUsuario)

//dibujar bola
function dibujarBola(){
    bola.style.left = posicionActualBola [0] + 'px'
    bola.style.bottom = posicionActualBola [1] + 'px'
}
const bola = document.createElement('div')
bola.classList.add('bola')
contenedor.appendChild(bola)
dibujarBola()

function moverBola(){
    posicionActualBola[0] += xDireccionBola
    posicionActualBola[1] += yDireccionBola
    dibujarBola()
    revisarColisiones()
    gameOver()
}

timerID = setInterval(moverBola, 20) //cada 20 milisegundos ejecuta la funcion de mover la bola

function revisarColisiones(){
    //Colision con bloques
    for(let i = 0; i < bloques.length; i++){
        if((posicionActualBola[0] > bloques[i].bottomLeft[0] && posicionActualBola[0] < bloques[i].bottomRight[0]) &&
        ((posicionActualBola[1] + diametro)> bloques[i].bottomLeft[1] && posicionActualBola[1] < bloques[i].topLeft[1])
    ){
        const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
        todosLosBloques[i].classList.remove('bloque')
        bloques.splice(i, 1)
        cambiarDireccion()
    }
}

    //Colisiones con las paredes
    if(
        posicionActualBola[0] >= (anchoTablero - diametro) || 
        posicionActualBola[1] >= (altoTablero - diametro) ||
        posicionActualBola[0] <= 0 ||
        posicionActualBola[1] <= 0
    ){
        cambiarDireccion()
    }
    //colision con el usuario
    if((posicionActualBola[0]> posicionActualUsuario[0] && posicionActualBola[0] < posicionActualUsuario[0] + anchoBloque) &&
    (posicionActualBola[1] > posicionActualUsuario[1] && posicionActualBola[1] < posicionActualUsuario[1] + altoBloque)
    ){
        cambiarDireccion()
    }

} 


function gameOver(){
    if(posicionActualBola[1] <= 0){
        clearInterval(timerID)
        document.removeEventListener('keydown', moverUsuario)
    }
}

//Funcion cambiar de direccion
function cambiarDireccion(){
    if(xDireccionBola === 2 && yDireccionBola=== 2){
        yDireccionBola = -2
        return
    }
    if(xDireccionBola ===2 && yDireccionBola=== -2){
        xDireccionBola = -2
        return 
    }
    if(xDireccionBola===-2 && yDireccionBola=== -2){
        yDireccionBola = 2
        return 
    }
    if(xDireccionBola=== -2 && yDireccionBola === 2){
        xDireccionBola = 2
        return
    }
}
