const API="SUA_URL_DO_APPS_SCRIPT";

carregarAulas();

async function carregarAulas(){

const resposta=
await fetch(
`${API}?acao=aulas`
);

const aulas=
await resposta.json();

const lista=
document.getElementById(
"listaAulas"
);

lista.innerHTML="";

aulas.forEach(a=>{

const card=
document.createElement("div");

card.className="card";

card.innerHTML=`

<div class="numero">
Aula ${a.id}
</div>

<div class="titulo">
${a.nome}
</div>

`;

card.ondblclick=()=>{

location.href=
`detalhes.html?id=${a.id}`;

};

lista.appendChild(card);

});

}