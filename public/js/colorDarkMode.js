const darkMode = localStorage.getItem('darkMode');
console.log(darkMode)
if(darkMode === 'on'){
    document.querySelector("body").classList.add('dark');
}else{
    document.querySelector("body").classList.remove('dark');
}