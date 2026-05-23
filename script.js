const API="https://script.google.com/macros/s/AKfycbzPNMhstLtlECiqSXOYVy71kZixpR3FSAcOcm4ve913aOEZi_MTUcyge03YHOwADcw_JQ/exec";


let aulaAtual=null; 
let dadosAulas=[];

document.addEventListener(
"DOMContentLoaded",
carregar
);

async function carregar(){

try{

const cards=
document.getElementById(
"cards"
);

cards.innerHTML=`

<div class="card">

Carregando...

</div>

`;

const resposta=

await fetch(
`${API}?acao=agenda`
);

if(!resposta.ok){

throw new Error(
"Falha na API"
);

}

dadosAulas=
await resposta.json();

cards.innerHTML="";

dadosAulas.forEach(a=>{

const card=
document.createElement(
"div"
);

card.className=
"card";

card.onclick=
()=>abrirDetalhes(
a.id
);

card.innerHTML=`

<div class="aulaNumero">

Aula ${a.id}

</div>

<div class="titulo">

📖 ${a.aula}

</div>

<div class="info">

👨 ${a.professor}

</div>

<div class="info">

📅 ${a.data}

</div>

`;

cards.appendChild(
card
);

});

}catch(erro){

console.log(
erro
);

document
.getElementById(
"cards"
)
.innerHTML=`

<div class="card">

Erro ao carregar

<br><br>

${erro.message}

</div>

`;

}

}



function abrirDetalhes(id){

aulaAtual=id;

const aula=

dadosAulas.find(
a=>a.id==id
);

document
.getElementById(
"modal"
)
.style.display=
"flex";

document
.getElementById(
"conteudo"
)
.innerHTML=`

<div class="detalhes">

<h2>

Aula ${aula.id}

</h2>

<h3>

${aula.aula}

</h3>

<p>

👨 ${aula.professor}

</p>

<p>

📅 ${aula.data}

</p>

<p>

🔗 Link da aula

</p>

<input
readonly
id="linkAula"
value="${aula.link||''}">

<button
onclick="copiarLink()">

Copiar Link

</button>

<button
onclick="mostrarEdicao()">

Editar

</button>

</div>

`;

}



function copiarLink(){

const link=
document.getElementById(
"linkAula"
);

navigator.clipboard.writeText(
link.value
);

alert(
"Link copiado"
);

}



function mostrarEdicao(){

document
.getElementById(
"conteudo"
)
.innerHTML+=`

<hr>

<h3>

O que deseja fazer?

</h3>

<button
onclick=
"abrirProfessor()">

Agendar Professor

</button>

<button
onclick=
"abrirData()">

Mudar Data

</button>

`;

}



function abrirProfessor(){

document
.getElementById(
"conteudo"
)
.innerHTML+=`

<input
id="novoProfessor"
placeholder=
"Novo professor">

<button
onclick=
"salvarProfessor()">

Salvar

</button>

`;

}



function abrirData(){

document
.getElementById(
"conteudo"
)
.innerHTML+=`

<input
type="date"
id="novaData">

<button
onclick=
"salvarData()">

Salvar

</button>

`;

}



async function salvarProfessor(){

const professor=

document
.getElementById(
"novoProfessor"
)
.value;

await fetch(
API,{

method:"POST",

body:JSON.stringify({

acao:
"editarAgenda",

id:
aulaAtual,

professor:
professor

})

});

location.reload();

}



async function salvarData(){

const data=

document
.getElementById(
"novaData"
)
.value;

await fetch(
API,{

method:"POST",

body:JSON.stringify({

acao:
"editarAgenda",

id:
aulaAtual,

data:
data

})

});

location.reload();

}



window.onclick=
function(e){

const modal=

document
.getElementById(
"modal"
);

if(
e.target===modal
){

modal.style.display=
"none";

}

}
