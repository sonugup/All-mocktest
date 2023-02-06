
async function getData(){
   
    let url="https://www.balldontlie.io/api/v1/players"
    try{
        let res=await fetch(url)

        let data=await res.json()
        console.log(data.data)
        fatch(data.data)
    }catch(err){
        console.log("err", err)
    }
}

getData()

function fatch(el){
    let room=document.getElementById("contain");

    el.forEach((e) => {
        let name=document.createElement("p");
        let img=document.createElement("img")
        img.src=e.
        name.innerText=e.first_name;
        room.append(name)
    })
}
