window.addEventListener(
    "load",
    () => {

        document.getElementById(
            "dataHoje"
        ).innerHTML =
            new Date()
            .toLocaleDateString(
                "pt-BR"
            );

        Helpers.carregarCategorias();

        Helpers.alterarFormularioFinanceiro();

        Dashboard
        .carregarDashboard();
    }
);


function abrirTela(id) {

    document.getElementById(
        "dashboard"
    ).classList.add(
        "hidden"
    );

    document
        .querySelectorAll(
            "section"
        )
        .forEach(sec => {

            if (
                sec.id !== "dashboard"
            ) {
                sec.classList.add(
                    "hidden"
                );
            }
        });

    document
        .getElementById(id)
        .classList.remove(
            "hidden"
        );

    if (
        id ===
        "telaDizimistas"
    ) {
        Dizimistas.listar();
    }
}


function voltarDashboard() {

    document
        .querySelectorAll(
            "section"
        )
        .forEach(sec => {

            sec.classList.add(
                "hidden"
            );
        });

    document
        .getElementById(
            "dashboard"
        )
        .classList.remove(
            "hidden"
        );

    Dashboard
    .carregarDashboard();
}