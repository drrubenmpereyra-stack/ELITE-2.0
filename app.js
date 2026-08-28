// Configuración de Firebase (Conectado a materiales-terapeuticos)
const firebaseConfig = {
    apiKey: "AIzaSyCJietA0GuHsUpkN2-lk38Y3L6VDROxvZs",
    authDomain: "materiales-terapeuticos.firebaseapp.com",
    projectId: "materiales-terapeuticos",
    storageBucket: "materiales-terapeuticos.firebasestorage.app",
    messagingSenderId: "827133493876",
    appId: "1:827133493876:web:7d51b4befe64e0f8dfc721"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Estructura Jerárquica con Nombres Exactos Ordenados
const menuData = {
    "1": {
        nombre: "Administración",
        color: "linear-gradient(135deg, #1e3c72, #2a5298)",
        hijos: {
            "Pacientes": {},
            "Agenda": {},
            "Contabilidad": {},
            "Centro de impresiones": {}
        }
    },
    "2": {
        nombre: "Historia Clínica",
        color: "linear-gradient(135deg, #134e5e, #71b280)",
        hijos: {
            "1 Registro de Sesiones": {},
            "2 Primera entrevista": {},
            "3 Est y NC": {},
            "4 Ejes Proceso Terap": {
                "4.1 Eje 1 Foco": {},
                "4.2 Eje 2 Func yoicas": {},
                "4.3 Eje 3 Relac TP": {}
            },
            "5 Genograma": {},
            "6 Herramientas usadas": {},
            "7 Aparato Psiquico Freud": {
                "7.1 Val Yo": {},
                "7.2 Val SuperYo": {},
                "7.3 Val Ello": {},
                "7.4 Integraciones": {}
            },
            "8 Psiquismo creador": {
                "8.1 Protocolo Fiorini": {},
                "8.2 Puente simbolización": {},
                "8.3 Proyecto vital": {},
                "8.4 Via motora": {},
                "8.5 Temporalidad": {},
                "8.6 Convergencia clínica": {}
            },
            "9 Interconsultas": {}
        }
    },
    "3": {
        nombre: "Herramientas Clínicas Pacientes",
        color: "linear-gradient(135deg, #f39c12, #f1c40f)",
        hijos: {
            "3.1 Potencial acting out": {},
            "3.2 Exp emocional creativa": {},
            "3.3 Med neuropsicológicos": {},
            "3.4 Psicodiagnóstico": {},
            "3.5 Test": {},
            "3.6 Riesgos en PB": {},
            "3.7 Memorias traumáticas": {},
            "3.8 Ritmos circadianos": {},
            "3.9 Mapeos visuales": {},
            "3.10 Adherencia al tratamiento": {},
            "3.11 Resonancia CT": {},
            "3.12 Inteligencia Elite": {}
        }
    },
    "4": {
        nombre: "Herramientas Clínicas Terapeuta",
        color: "linear-gradient(135deg, #d35400, #e67e22)",
        hijos: {
            "4.1 Exp emocional creador T": {},
            "4.2 Contratransferencia": {},
            "4.3 Terminación Separación": {},
            "4.4 Autoevaluación": {
                "4.4.1 Rol profesional": {},
                "4.4.2 Alianza terapéutica": {},
                "4.4.3 Estilo de intervención y eficacia": {},
                "4.4.4 Cuidado del self y estado psicofisiológico": {}
            },
            "4.5 Farmacología": {}
        }
    },
    "5": {
        nombre: "Materiales Teóricos de Consulta",
        color: "linear-gradient(135deg, #512b58, #8c52ff)",
        hijos: {
            "5.1 Esquemas Neurodinámicos": {},
            "5.2 Esquemas Psicodinámicos": {},
            "5.3 Esquemas PNIE": {},
            "5.4 Psicotrópicos": {},
            "5.5 Rúbricas": {}
        }
    }
};

// Control de Acceso y Login con registro en Firestore
document.getElementById('loginBtn').addEventListener('click', async () => {
    const user = document.getElementById('userInput').value.trim();
    const pass = document.getElementById('passInput').value.trim();
    const errorDiv = document.getElementById('loginError');

    if (user === "DRPEREYRA" && pass === "235689") {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'flex';
        inicializarSistema();
        
        try {
            await db.collection("logs_acceso").add({
                usuario: user,
                fecha: new Date().toISOString()
            });
            console.log("Acceso registrado exitosamente en Firestore.");
        } catch (e) {
            console.error("Error al registrar en Firestore:", e);
        }
    } else {
        errorDiv.textContent = "Credenciales incorrectas.";
    }
});

// Inicializar Navegación por Barras
function inicializarSistema() {
    const barPrincipal = document.getElementById('barras-principales');
    barPrincipal.innerHTML = '';

    Object.keys(menuData).forEach(key => {
        const item = menuData[key];
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = `${key} - ${item.nombre}`;
        btn.style.background = item.color;
        
        btn.onclick = () => {
            document.querySelectorAll('#barras-principales .nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            cargarBarraSecundaria(item.hijos, item.color);
        };
        barPrincipal.appendChild(btn);
    });
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
                
                // Enlace específico para el componente Pacientes
                if (secKey === "Pacientes") {
                    cargarVistaPaciente();
                } else {
                    mostrarContenido(secKey);
                }
            }
        };
        barSecundaria.appendChild(btn);
    });
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
}

// Función exclusiva para incrustar paciente.html
function cargarVistaPaciente() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<iframe src="paciente.html" style="width: 100%; height: 75vh; border: none; background: #f8fafc;"></iframe>`;
}

function mostrarContenido(seccion) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<h2>Sección: ${seccion}</h2><p>Módulo interactivo conectado a Firebase (materiales-terapeuticos). Listo para programar formularios y persistencia específica.</p>`;
}
