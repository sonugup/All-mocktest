const ul=document.querySelector('ul');
let allPages=10;
function elem(allPages, page){
    let li='';

    let beforePages=page-1;
    let afterPages=page+1;
    let liActiv;
    if(page>1){
        li+=`<li class="btn" onClick="elem(allPages, ${page-1})"> <img src="https://tse1.mm.bing.net/th?id=OIP.xkHsNAOzNns-LyeCM444wwHaHa&pid=Api&P=0" alt=""></li>`;

    }

    for(let i=beforePages; i<=afterPages; i++){
        if(i>allPages){
            continue;
        }
        if(i==0){
            i=i+1;
        }
        if(page==i){
            liActiv='active';
        }else{
            liActiv='';
        }
        li+=`<li class="numb ${liActiv}" onClick="elem(allPages, ${i})"><span>${i}</span></li>`
    }
    if(page<allPages){
       li+=`<li class="btn1" onClick="elem(allPages, ${page+1})"> <img src="https://tse1.mm.bing.net/th?id=OIP.xkHsNAOzNns-LyeCM444wwHaHa&pid=Api&P=0" alt=""></li>`
    }
    ul.innerHTML=li;
}
elem(allPages, 2)