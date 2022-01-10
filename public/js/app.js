console.log("Loaded client side js file")



const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#m1');
const msg2 = document.querySelector('#m2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    msg1.textContent="Loading..."
    msg2.textContent=""
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data) =>{
        if(data.err){
             msg1.textContent = data.err
         }else{
             msg1.textContent = data.location
             msg2.textContent = data.forecast
         }
        
    })
})
    
})