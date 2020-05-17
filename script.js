let selectElement = (s)=> document.querySelector(s);

selectElement(".touch").addEventListener('click',()=>{
    selectElement(".input").classList.add('active')
})
selectElement(".back").addEventListener('click',()=>{
    selectElement(".input").classList.remove('active')
})
