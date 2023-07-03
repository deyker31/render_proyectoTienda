const url = 'https://capstyle.onrender.com/gorrasBd';  //url produccion
//const url = 'http://localhost:3001/apiServer/gorras' //url desarrollo


export const nuevoProducto = async (producto) => {

    try {
        await fetch('https://capstyle.onrender.com/apiGorras', {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }

}


export const obtenerProductos = async () => {
    try {
        const resultado = await fetch(url);
        const productos = await resultado.json();

        return productos;
    } catch (error) {
        console.log(error);
    }
}


export const obtenerProducto = async (id) => {
    const resultado = await fetch(`/apiGorras/${id}`);
    const producto = await resultado.json();
    return producto; 
  }

/*
export const editarProducto = async producto => {
    try {
        await fetch(`${url}/${producto.id}`, {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
}*/

export const editarProducto = async (id, nuevoProducto) => {
    try {
      await fetch(`/apiGorras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      });
    } catch (error) {
      console.log(error);
    }
  };

export const eliminarProducto = async (id) =>{
    try {
        await fetch(`/apiGorras/${id}`,{
        method:'DELETE'       
        })
    } catch (error) {
        console.log(error);
    }
}


