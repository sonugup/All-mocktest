var baseURL='https://api.coinranking.com/v2/coins'
var proxyURL='https://cors-anywhere.herokuapp.com/'

var apiURL=`${baseURL}`
var coinsData=[]

let pageSize=10;
let currentPage=1

async function renderTable(page=1){
    await getData()

    if(page==1){
        prevButton.style.visibility="hidden";
    }else{
        prevButton.style.visibility="visible"
    }

    if(page==numberOfPages()){
        nextButton.style.visibility='hidden'
    }else{
        nextButton.style.visibility="visible"
    }
    var cryptoCoin='';

    console.log(coinsData)
    coinsData.filter((row, index) => {
        let start=(currentPage-1)*pageSize
        let end=currentPage*pageSize

        if(index>=start && index<end) return true;
    }).forEach(coin => {
        cryptoCoin+= "<tr>"
        cryptoCoin+=`<td>${parseFloat(coin.btcPrice)}</td>`
        cryptoCoin+=`<td>${(coin.rank)}</td>`
        cryptoCoin+=`<td>${(coin.tier)}</td>`
        cryptoCoin+=`<td>${(coin.name)}</td>`
        cryptoCoin+=`<td>${Math.round(coin.price)}</td>`
        cryptoCoin+=`<td>${(coin.symbol)}</td>`
        cryptoCoin+=`<td><img src=${coin.iconUrl}/></td>`
        "<tr>"
    })

    document.getElementById('data').innerHTML=cryptoCoin;
}

// renderTable()


function previosPage(){
    if(currentPage>1)
    currentPage--;
    renderTable(currentPage)
}
function nextPage(){
    if((currentPage*pageSize) < coinsData.length)
    currentPage++

    renderTable(currentPage)
}

function numberOfPages(){
    return Math.ceil(coinsData.length/pageSize)
}

document.querySelector("#nextButton").addEventListener("click", nextPage, false)
document.querySelector("#prevButton").addEventListener("click", previosPage, false)
//fetch data from rest api

async function getData(){
    const response=await fetch(apiURL);
    const coins=await response.json()
    coinsData=coins.data.coins
    console.log(coinsData)
}

getData()
