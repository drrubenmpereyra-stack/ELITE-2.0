function cargarBarraSecundaria(hijosSecundarios, colorBase) {
    const barSecundaria = document.getElementById('barras-secundarias');
    const barTerciaria = document.getElementById('barras-terciarias');
    barSecundaria.innerHTML = '';
    barTerciaria.innerHTML = '';

    Object.keys(hijosSecundarios).forEach(secKey => {
        const subHijos = hijosSecundarios[secKey];
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = secKey;
        btn.style.background = colorBase;

        btn.onclick = () => {
            document.querySelectorAll('#barras-secundarias .nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (Object.keys(subHijos).length > 0) {
                cargarBarraTerciaria(subHijos, colorBase);
            } else {
                barTerciaria.innerHTML = '';
                
                if (secKey === "Pacientes") {
                    cargarVistaIframe("paciente.html");
                } else if (secKey === "Agenda") {
                    cargarVistaIframe("agenda.html");
                } else if (secKey === "Contabilidad") {
                    cargarVistaIframe("contabilidad.html");
                } else if (secKey === "Centro de impresiones") {
                    cargarVistaIframe("impresiones.html");
                } else if (secKey === "1 Registro de Sesiones") {
                    cargarVistaIframe("sesiones.html");
                } else if (secKey === "2 Primera entrevista") {
                    cargarVistaIframe("entrevista.html");
                } else if (secKey === "3 Est y NC") {
                    cargarVistaIframe("eync.html");
                } else if (secKey === "5 Genograma") {
                    cargarVistaIframe("genograma.html"); // <- Aquí se conecta el nuevo módulo de Genograma Avanzado
                } else {
                    mostrarContenido(secKey);
                }
            }
        };
        barSecundaria.appendChild(btn);
    });
}
