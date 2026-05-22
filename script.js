const API="https://script.google.com/macros/s/AKfycbwz57iFC3Qbl9GfNAY0FWgi3x5G_dw1k2_mIf16c_KSNmxjrHtUCVgXjc2sx97Z0OqO1A/exec";


let aulaAtual = null;

document.addEventListener(
"DOMContentLoaded",
carregar
);

async function carregar(){

try{

const req = await fetch(
`${API}?acao=agenda`
);

const dados = await req.json();

console.log(dados);

const cards =
document.getElementById(
"cards"
);

cards.innerHTML="";

if(!dados || dados.length===0){

cards.innerHTML=`

<div class="card">

Nenhuma aula encontrada

</div>

`;

return;

}


dados.forEach(a=>{

const card=`

<div
class="card"
ondblclick="abrirModal(${a.id})"
>

<div class="aulaNumero">

Aula ${a.id}

</div>

<div class="titulo">

📖 ${a.aula}

</div>

<div class="info">

👨 Professor:
${a.professor}

</div>

<div class="info">

📅 Data:
${a.data}

</div>

</div>

`;

cards.innerHTML += card;

});

}catch(erro){

console.error(
erro
);

document.getElementById(
"cards"
).innerHTML=`

<div class="card">

Erro ao carregar:

<br><br>

${erro.message}

</div>

`;

}

}


function abrirModal(id){

aulaAtual=id;

document
.getElementById(
"modal"
)
.style.display="flex";

}


function abrirProfessor(){

document
.getElementById(
"conteudo"
)
.innerHTML=`

<input
id="novoProfessor"
placeholder="Digite o nome">

<button
onclick="salvarProfessor()">

Salvar

</button>

`;

}


function abrirData(){

document
.getElementById(
"conteudo"
)
.innerHTML=`

<input
type="date"
id="novaData">

<button
onclick="salvarData()">

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
API,
{

method:"POST",

body:JSON.stringify({

acao:"editarAgenda",
id:aulaAtual,
professor:professor

})

}

);

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
API,
{

method:"POST",

body:JSON.stringify({

acao:"editarAgenda",
id:aulaAtual,
data:data

})

}

);

location.reload();

}


window.onclick=(e)=>{

const modal=
document.getElementById(
"modal"
);

if(e.target===modal){

modal.style.display=
"none";

}

}
