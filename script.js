const API="https://script.google.com/macros/s/AKfycbyEXjf4KY5kd_S5ploNUI7cjJbEcfn50HSkP8XxSWBlvlRQhEyyntCaBw4UpF7vosKLkA/exec";

let aulaAtual=null;

carregar();

async function carregar(){

try{

const req=await fetch(
`${API}?acao=agenda`
);

if(!req.ok){

throw new Error(
"Erro HTTP: "+req.status
);

}

const dados=
await req.json();

console.log(
dados
);

const cards=
document.getElementById(
"cards"
);

cards.innerHTML="";

if(dados.length===0){

cards.innerHTML=`

<div class="card">

Nenhuma aula encontrada

</div>

`;

return;

}


// ==========================
// MONTA OS CARDS
// ==========================

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

});

}catch(erro){

console.error(
erro
);

document
.getElementById(
"cards"
)
.innerHTML=`

<div class="card">

Erro:

<br><br>

${erro}

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
.style.display=
"flex";

}


function abrirProfessor(){

conteudo.innerHTML=`

<input
id="novoProfessor"
placeholder="Digite nome do professor">

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
