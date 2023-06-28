(async ()=>{
    const res = await fetch('../database/bd2.json');
    const data = await res.json();
    console.log(data)
})()
