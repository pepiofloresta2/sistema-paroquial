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

            let lista = res.lista || "";

            let html = `
                <table>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                    </tr>
            `;

            lista.forEach(item => {
                html += `
                    <tr>
                        <td>${item.codigo || ""}</td>
                        <td>${item.nome || ""}</td>
                        <td>${item.tel || ""}</td>
                    </tr>
                `;
            });

            html += `</table>`;

            document.getElementById("listaDizimistas").innerHTML = html;
        });
    }

};