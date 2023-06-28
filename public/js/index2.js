//slider products
function App() {}

window.onload = function (event) {
    var app = new App();
    window.app = app;
};

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;
    
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == ""  ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition,slickWidth,track) : nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
}

let prevAction = (leftPosition,slickWidth,track) => {
    if(leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition,trackWidth,listWidth,slickWidth,track) => {
    if(leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}

//Generar html ultimas novedades

const contenedor = document.querySelector('.slick-track');
const url = '/bd.json';


(async()=>{
    try {
        const res = await fetch(url);
        const data = await res.json();
        mostrarHTML(data.gorras);
        
    } catch (error) {
        console.log(error);
    }
})()

function mostrarHTML(products){
    
    products.forEach(product =>{
        
            
        const {id,nombre,tipo,marca,precio,imagen} = product
        if(id > 40 && id < 54) {

        const div  = document.createElement('div');
        div.classList.add('slick','relative' , 'flex', 'flex-col','text-center', 'items-center', 'justify-center','border','h-30','sm:h-30','md:h-40','lg:h-64','w-32','sm:w-40','md:w-40','lg:w-52','mx-3','sm:mx-5','md:mx-1','lg:mx-2');
        div.innerHTML = `
                <a href="#" class="pointer-events-none select-none w-4/5">
                    <img class="rounded hover:opacity-60  mx-auto w-16 sm:w-20 md:w-24 lg:w-full h-14 sm:h-16 md:h-20 lg:h-40" src="${imagen}" alt="Image">
                </a>
                <p class="text-zinc-500 dark:text-white text-md md:text-lg lg:text-xl">${tipo} ${marca}</p>
                <p class="my-1 text-md md:text-lg lg:text-xl text-black dark:text-white">${nombre}</p>
                <p class="text-black dark:text-white font-bold text-md md:text-lg lg:text-xl">${precio}$</p>
        `;

        contenedor.appendChild(div);

            
        }
        
    })
}