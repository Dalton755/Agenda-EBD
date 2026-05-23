const API="https://script.google.com/macros/s/AKfycbwz57iFC3Qbl9GfNAY0FWgi3x5G_dw1k2_mIf16c_KSNmxjrHtUCVgXjc2sx97Z0OqO1A/exec";

document.addEventListener(
"DOMContentLoaded",
carregar
);

let aulaAtual=null;
let dadosAulas=[];

async function carregar(){

const req=
await fetch(
`${API}?acao=agenda`
);

dadosAulas=
await req.json();

const cards=
document.getElementById(
"cards"
);

cards.innerHTML="";

dadosAulas.forEach(a=>{

cards.innerHTML+=`

<div
class="card"
onclick="
abrirDetalhes(${a.id})
"
>

<div class="aulaNumero">

Aula ${a.id}

</div>

<div class="titulo">

${a.aula}

</div>

<div class="info">

👨 ${a.professor}

</div>

<div class="info">

📅 ${a.data}

</div>

</div>

`;

});

}



function abrirDetalhes(id){

aulaAtual=id;

const aula=

dadosAulas.find(

a=>a.id==id

);

modal.style.display=
"flex";

conteudo.innerHTML=`

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
value="${aula.link}"
id="linkAula">

<button
onclick=
"copiarLink()">

Copiar Link

</button>

<button
onclick=
"mostrarEdicao()">

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

link.select();

document.execCommand(
"copy"
);

alert(
"Link copiado"
);

}



function mostrarEdicao(){

conteudo.innerHTML+=`

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

conteudo.innerHTML+=`

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

conteudo.innerHTML+=`

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

novoProfessor.value;

await fetch(
API,
{

method:"POST",

body:JSON.stringify({

acao:
"editarAgenda",

id:
aulaAtual,

professor:
professor

})

}

);

location.reload();

}



async function salvarData(){

const data=
novaData.value;

await fetch(
API,
{

method:"POST",

body:JSON.stringify({

acao:
"editarAgenda",

id:
aulaAtual,

data:
data

})

}

);

location.reload();

}
