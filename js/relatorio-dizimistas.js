const RelatorioDizimistas = {

gerar(){

let mesInput = document.getElementById("mesFiltro").value;
if(!mesInput) return alert("Selecione o mês");

let [ano, mes] = mesInput.split("-");

API.enviar({
    acao:"buscar_relatorio",
    mes, ano
}).then(res=>{

let linhas="";
let total=0;

(res.lista||[]).forEach(item=>{

if(item.categoria!=="Dízimo") return;

let valor = parseFloat(item.valor||0);
total+=valor;

linhas+=`
<tr>
<td>${item.codigo}</td>
<td>${item.nome}</td>
<td>${item.data}</td>
<td>${item.forma}</td>
<td style="text-align:right">R$ ${valor.toFixed(2)}</td>
</tr>`;
});

document.getElementById("res").innerHTML = `
<div id="doc">

<h2 style="text-align:center">RELATÓRIO DE DÍZIMO</h2>

<table style="width:100%;border-collapse:collapse">

<tr>
<th>CÓDIGO</th><th>NOME</th><th>DATA</th><th>FORMA</th><th>VALOR</th>
</tr>

${linhas}

<tr>
<td colspan="4"><b>TOTAL</b></td>
<td>R$ ${total.toFixed(2)}</td>
</tr>

</table>

</div>
`;

});
}
};