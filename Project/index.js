const btnE1= document.getElementById('btn')

const jockel=document.getElementById("joke")
const api= 'cFXRwX80L6gmY8Xud+u6yg==yinFMObOOFxj4eEI';

const options={
    method:"GET",
    headers:{
        "X-Api-Key":api,
    },
}

const apiURL='https://api.api-ninjas.com/v1/dadjokes?limit=1'
 
 async function getJoke(){
    try{
        jockel.innerText="Loading...."

        btnE1.disabled=true;
        btnE1.innerText="Loading..."
        const res= await fetch(apiURL, options)
        const data=await res.json()
    
        btnE1.disabled=true;
        btnE1.innerText="Tell me a joke"
    
        jockel.innerText =data[0].joke
        console.log(data[0].joke)
    }catch(error){
        jockel.innerText="An error happened , try again later"

        btnE1.disabled=true;
        btnE1.innerText="Tell me a joke"
        console.log(error)
    }
    
}

btnE1.addEventListener("click", getJoke)