//Slide de imagenes

//Variables
const arrayImg = ['img/background/1.jpg', 'img/background/2.png', 'img/background/3.jpg','img/background/4.jpg'];
let i = 0;
let sliderRight = document.querySelector('.slider-right');
let sliderLeft = document.querySelector('.slider-left');
const opacity1 = () => slider.style.opacity = '1';

const slider = document.querySelector('.slider-screen');




//Mostrando primera imagen

document.Imagen.src = arrayImg[i]

let time = setTimeout(transicion,2000);
opacity1();
//mover hacia la derecha para cambiar de imagen
function moveRight(){
    i++;
 
    if(i > arrayImg.length - 1){
        i = 0
    }
    
    document.Imagen.src = arrayImg[i];
    
    //transicion y limpiarlo para que no se sume el tiempo al hacerle click
    clearTimeout(time)
    time = setTimeout(transicion,2000);
    opacity1();
   

       
    
        
}  

//transicion
function transicion(){
    slider.style.transition = "all 1s";
    slider.style.opacity = '0';
}

//mover hacia la izquierda para cambiar de imagen
function moveLeft(){
    
    i--;
    if(i < 0){
        i = arrayImg.length - 1;
    }
    document.Imagen.src = arrayImg[i];
    //transicion y limpiarlo para que no se sume el tiempo al hacerle click
    clearTimeout(time)
    time = setTimeout(transicion,2000);
    opacity1();
}


//Se mueven las imagenes automaticamente despues de 2.5 segundos
let intervalo = setInterval(moveRight,2500);

//eventos click + limpieza de intervalo de ambos lados
sliderRight.addEventListener('click', function(){
   
    clearInterval(intervalo);
    moveRight();
    intervalo = setInterval(moveRight,2500);
   
})
sliderLeft.addEventListener('click', function(){
    
    clearInterval(intervalo);
    moveLeft();
    intervalo = setInterval(moveLeft,2500);
})


