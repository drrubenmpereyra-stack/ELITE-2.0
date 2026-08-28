// Configuración de Firebase y SDKs Compat
const firebaseConfig = {
    apiKey: "AIzaSyCJietA0GuHsUpkN2-lk38Y3L6VDROxvZs",
    authDomain: "materiales-terapeuticos.firebaseapp.com",
    projectId: "materiales-terapeuticos",
    storageBucket: "materiales-terapeuticos.firebasestorage.app",
    messagingSenderId: "827133493876",
    appId: "1:827133493876:web:7d51b4befe64e0f8dfc721"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Estructura Completa de Menús, Submenús y Botones de ELITE 2.0
const estructuraMenu = {
    "Historia Clínica": {
        color: "#1e3c72",
        hijos: {
            "Pacientes": {},
            "1 Registro de Sesiones": {},
            "2 Primera entrevista": {},
            "3 Est y NC": {},
            "5 Genograma": {}
        }
    },
    "Agenda": {
        color: "#134e5e",
        hijos: {
            "Agenda de Turnos": {},
            "Calendario General": {}
        }
    },
    "Contabilidad": {
        color: "#f39c12",
        hijos: {
            "Ingresos y Egresos": {},
            "Honorarios": {},
            "Reportes": {}
        }
    },
    "Herramientas": {
        color: "#d35400",
        hijos: {
            "Centro de impresiones": {},
            "Test y Evaluaciones": {}
        }
    },
    "Administración": {
        color: "#512b58",
        hijos: {
            "Usuarios": {},
            "Configuración del Sistema": {},
            "Logs de Acceso": {}
        }
    }
};

// Autenticación de Acceso
document.getElementById('loginBtn').onclick = async () => {
    const user = document.getElementById('userInput').value.trim();
    const pass = document.getElementById('passInput').value.trim();
    const errorDiv = document.getElementById('loginError');

    if (user === "DRPEREYRA" && pass === "235689") {
        errorDiv.textContent = "";
        try {
            await db.collection("logs_acceso").add({
                usuario: user,
                fecha: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.error("Error al registrar acceso:", e);
        }

        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'flex';
        
        inicializarMenus();
    } else {
        errorDiv.textContent = "Credenciales incorrectas.";
    }
};

// Inicialización de la Navegación por Menús
function inicializarMenus() {
    const barPrincipal = document.getElementById('barras-principales');
    barPrincipal.innerHTML = '';

    Object.keys(estructuraMenu).forEach(menuKey => {
        const item = estructuraMenu[menuKey];
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = menuKey;
        btn.style.background = item.color;

        btn.onclick = () => {
            document.querySelectorAll('#barras-principales .nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            cargarBarraSecundaria(item.hijos, item.color);
        };
        barPrincipal.appendChild(btn);
    });

    const primerBtn = barPrincipal.querySelector('button');
    if (primerBtn) primerBtn.click();
}

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
                } else if (secKey === "Agenda de Turnos" || secKey === "Agenda") {
                    cargarVistaIframe("agenda.html");
                } else if (secKey === "Ingresos y Egresos" || secKey === "Contabilidad") {
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
                    cargarVistaIframe("genograma.html");
                } else {
                    mostrarContenido(secKey);
                }
            }
        };
        barSecundaria.appendChild(btn);
    });

    const primerBtnSec = barSecundaria.querySelector('button');
    if (primerBtnSec) primerBtnSec.click();
}

function cargarBarraTerciaria(hijosTerciarios, colorBase) {
    const barTerciaria = document.getElementById('barras-terciarias');
    barTerciaria.innerHTML = '';

    Object.keys(hijosTerciarios).forEach(terKey => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = terKey;
        btn.style.background = colorBase;

        btn.onclick = () => {
            document.querySelectorAll('#barras-terciarias .nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mostrarContenido(terKey);
        };
        barTerciaria.appendChild(btn);
    });

    const primerBtnTer = barTerciaria.querySelector('button');
    if (primerBtnTer) primerBtnTer.click();
}

// Carga de Vistas mediante Iframe Integrado
function cargarVistaIframe(urlArchivo) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<iframe src="${urlArchivo}" style="width:100%; height:100%; border:none; min-height:750px;"></iframe>`;
}

function mostrarContenido(seccion) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<h2>${seccion}</h2><p>Módulo de gestión para ${seccion}.</p>`;
}
