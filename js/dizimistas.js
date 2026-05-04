// js/dizimistas.js

const Dizimistas = {

    adicionar() {

        let codigo = document.getElementById("dz_codigo").value.trim();
        let nome = document.getElementById("dz_nome").value.trim();
        let tel = document.getElementById("dz_tel").value.trim();

        if (!codigo || !nome) {
            alert("Informe código e nome");
            return;
        }

        API.enviar({
            acao: "cadastrar_dizimista",
            codigo,
            nome,
            tel
        }).then(res => {

            if (res && res.status === "ok") {
                alert("Dizimista cadastrado com sucesso");

                document.getElementById("dz_codigo").value = "";
                document.getElementById("dz_nome").value = "";
                document.getElementById("dz_tel").value = "";
            }
        });
    },

    listar() {

        API.enviar({
            acao: "listar_dizimistas"
        }).then(res => {

            let lista = res.lista || [];

            let html = `
                <table class="w-full border-collapse text-sm md:text-base">
                    <thead>
                        <tr class="border-b bg-slate-100">
                            <th class="text-left p-3 w-24">Código</th>
                            <th class="text-left p-3">Nome</th>
                            <th class="text-right p-3 w-48">Telefone</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
            `;

            lista.forEach(item => {
                html += `
                    <tr class="hover:bg-slate-50">
                        <td class="p-3">${item.codigo || ""}</td>
                        <td class="p-3">${item.nome || ""}</td>
                        <td class="p-3 text-right">${item.tel || "-"}</td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;

            document.getElementById("listaDizimistas").innerHTML = html;
        });
    }

};