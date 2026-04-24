const API = {

    enviar(params) {

        let url = CONFIG.API_URL + "?" + new URLSearchParams(params);

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Erro de comunicação:", error);
                alert("Erro ao comunicar com Google Sheets.");
            });
    }

};