// Função para exibir o endereço IP no parágrafo com id "ipAddress"
function displayIPAddress(ip) {
  const ipAddressElement = document.getElementById("ipAddress");
  ipAddressElement.textContent = ip;
}

// Função para obter o endereço IP do cliente
function getIPAddress() {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;
      displayIPAddress(ipAddress);
    })
    .catch((error) => console.error("Erro ao obter endereço IP:", error));
}

// Chamada da função para obter o endereço IP quando a página é carregada
getIPAddress();
