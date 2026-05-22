const API="https://script.google.com/macros/s/AKfycbxYP0vhXEaRClSXHnmZ0UK-nBWK5GlwDf_vzEGQm5MrM41wnFPSb7Mevqop7eLRCYy40g/exec";

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
