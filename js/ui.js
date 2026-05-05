const UI = {

listaDizimistasCache: [],
indiceSelecionado: -1,

// 🔵 LIMPA ÁREA
limparTela() {
let res = document.getElementById("res");
if (res) res.innerHTML = "";
let lista = document.getElementById("listaDizimistas");
if (lista) lista.innerHTML = "";
let listaCad = document.getElementById("listaDizimistasCadastro");
if (listaCad) listaCad.innerHTML = "";
},

// 🔵 BOTÃO ATIVO
ativarBotao(el){
this.removerAtivo();
el.classList.add("bg-slate-900","text-white");
},

removerAtivo(){
document.querySelectorAll("#modalRelatorios button")
.forEach(btn=>{
btn.classList.remove("bg-slate-900","text-white");
});
},

// 🔵 AUTOCOMPLETE
buscarPorNome(){

let termo = document.getElementById("buscaNome").value.toLowerCase();

if(!termo) return document.getElementById("sugestoes").innerHTML="";

API.enviar({acao:"listar_dizimistas"}).then(res=>{

this.listaDizimistasCache = res.lista || [];

let filtrados = this.listaDizimistasCache.filter(d =>
d.nome.toLowerCase().includes(termo)
);

let html="";

filtrados.forEach((d,i)=>{
html+=`
<div onclick="UI.selecionar(${i})"
class="p-2 hover:bg-gray-200 cursor-pointer">
${d.nome}
</div>`;
});

document.getElementById("sugestoes").innerHTML = html;
this.indiceSelecionado = -1;

});
},

selecionar(i){

let d = this.listaDizimistasCache[i];

document.getElementById("codigo").value = d.codigo;
document.getElementById("nomeLanc").value = d.nome;
document.getElementById("buscaNome").value = d.nome;

document.getElementById("sugestoes").innerHTML = "";
},

navegarSugestoes(e){

let itens = document.querySelectorAll("#sugestoes div");

if(!itens.length) return;

if(e.key==="ArrowDown"){
this.indiceSelecionado++;
}

if(e.key==="ArrowUp"){
this.indiceSelecionado--;
}

if(e.key==="Enter"){
e.preventDefault();
if(this.indiceSelecionado>=0){
itens[this.indiceSelecionado].click();
}
}

itens.forEach(el=>el.classList.remove("bg-gray-300"));

if(itens[this.indiceSelecionado]){
itens[this.indiceSelecionado].classList.add("bg-gray-300");
}
},

// 🔵 IMPRESSÃO
imprimir(){

let element = document.getElementById("doc");

if (!element) {
alert("Gere um relatório primeiro");
return;
}

html2pdf().set({
margin: 5,
filename: "relatorio.pdf",
html2canvas: { scale: 2 },
jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
}).from(element).save();
}

};