const API_URL = "https://sheetdb.io/api/v1/ili8wk3w6v5da";

function showTab(tabName) {

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(tabName).classList.add("active");

}

let qrScanner = null;

window.onload = () => {

    showTab("activate");

    qrScanner = new Html5QrcodeScanner(
        "reader",
        {
            fps: 10,
            qrbox: 250
        }
    );

    qrScanner.render(onScanSuccess);

};

function onScanSuccess(decodedText) {

    document.getElementById("codigo").value = decodedText;
    document.getElementById("codigoRedimir").value = decodedText;

}

async function activarGiftCard() {

    const codigo = document.getElementById("codigo").value.trim();
    const valorInicial = document.getElementById("valorInicial").value.trim();
    const compradoPor = document.getElementById("compradoPor").value.trim();
    const telefonoComprador = document.getElementById("telefonoComprador").value.trim();
    const regaladaA = document.getElementById("regaladaA").value.trim();
    const empleado = document.getElementById("empleadoActivacion").value.trim();

    if (!codigo) {
        alert("Escanea un QR primero");
        return;
    }

    const payload = {
        data: [{
            Codigo: codigo,
            ValorInicial: valorInicial,
            Balance: valorInicial,
            CompradoPor: compradoPor,
            TelefonoComprador: telefonoComprador,
            RegaladaA: regaladaA,
            FechaActivacion: formatDateTime(),
            FechaExpiracion: "",
            Estado: "ACTIVA",
            Notas: "",
            EmpleadoActivacion: empleado
        }]
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        console.log(result);

        alert("Gift Card activada correctamente");

        document.getElementById("valorInicial").value = "";
        document.getElementById("compradoPor").value = "";
        document.getElementById("telefonoComprador").value = "";
        document.getElementById("regaladaA").value = "";
        document.getElementById("empleadoActivacion").value = "";

    }
    catch(error) {

        console.error(error);

        alert("Error activando Gift Card");

    }

}

async function buscarGiftCard() {

    const codigo = document.getElementById("codigoRedimir").value.trim();

    if (!codigo) {
        alert("Escanea una Gift Card");
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/search?Codigo=${encodeURIComponent(codigo)}`
        );

        const data = await response.json();

        console.log(data);

        if (!data.length) {

            document.getElementById("giftInfo").innerHTML =
                "<p class='error'>Gift Card no encontrada</p>";

            return;

        }

        const card = data[0];

        document.getElementById("giftInfo").innerHTML = `
            <div class="info-card">
                <p><strong>Código:</strong> ${card.Codigo}</p>
                <p><strong>Balance:</strong> $${card.Balance}</p>
                <p><strong>Estado:</strong> ${card.Estado}</p>
                <p><strong>Comprado por:</strong> ${card.CompradoPor}</p>
                <p><strong>Regalada a:</strong> ${card.RegaladaA}</p>
            </div>
        `;

    }
    catch(error) {

        console.error(error);

        alert("Error buscando Gift Card");

    }

}

function redimirGiftCard() {

    alert(
        "Perfecto. Ya validamos lectura y escritura. La redención completa será el próximo paso."
    );

}

function formatDateTime() {

    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;

}
