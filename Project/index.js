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
    const res= await fetch(apiURL, options)
    const data=await res.json()

    jockel.innerText =data[0].joke
    console.log(data[0].joke)
}

btnE1.addEventListener("click", getJoke)