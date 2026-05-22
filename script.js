const API="https://script.google.com/macros/s/AKfycbyEXjf4KY5kd_S5ploNUI7cjJbEcfn50HSkP8XxSWBlvlRQhEyyntCaBw4UpF7vosKLkA/exec";

let aulaAtual=null;

carregar();

async function carregar(){

const req=
await fetch(
`${API}?acao=agenda`
);

const dados=
await req.json();

const cards=
document.getElementById(
"cards"
);

cards.innerHTML="";

dados.forEach(a=>{

cards.innerHTML+=`

<div
class="card"

ondblclick="
abrirModal(
${a.id}
)
"

>

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



function abrirModal(id){

aulaAtual=id;

modal.style.display=
"flex";

}



function abrirProfessor(){

conteudo.innerHTML=`

<input
id="novoProfessor"

placeholder=
"Nome do professor"
>

<button
onclick="salvarProfessor()">

Salvar

</button>

`;

}



function abrirData(){

conteudo.innerHTML=`

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

document.getElementById(
"novoProfessor"
).value;

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

document.getElementById(
"novaData"
).value;

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



window.onclick=
function(e){

if(
e.target==modal
){

modal.style.display=
"none";

}

}
