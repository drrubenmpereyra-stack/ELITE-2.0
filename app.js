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

// Estructura Jerárquica Completa con Nombres Exactos Ordenados (Bloques Freud y Psiquismo Creador Integrados)
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
                "4.3 Eje 3 Relac TP": {},
                "4.4 Radar de Fiorini": {}
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
                "8.6 Convergencia clínica": {},
                "Ventana creadora": {}
            },
            "9 Interconsultas": {},
            "10 Creación de Documentos": {}
        }
    },
    "3": {
        nombre: "Herramientas Clínicas Pacientes",
        color: "linear-gradient(135deg, #f39c12, #f1c40f)",
        hijos: {
            "3.1 Potencial acting out": {},
            "3.2 Exp emocional creativa": {},
            "3.3 Med neuropsicológicos": {
                "Poligono de potencia": {},
                "Medidor de reserva neural": {},
                "Medidor autoestima": {},
                "Termómetro de identidad": {},
                "Medidor de ansiedad": {},
                "Alivio sintomático": {}
            },
            "3.4 Psicodiagnóstico": {},
            "3.5 Test": {
                "Burnout": {},
                "Ansiedad de Beck": {},
                "Depresión de Beck": {}
            },
            "3.6 Riesgos en PB": {},
            "3.7 Memorias traumáticas": {},
            "3.8 Ritmos circadianos": {},
            "3.9 Mapeos visuales": {},
            "3.10 Adherencia al tratamiento": {},
            "3.11 Resonancia CT": {},
            "3.12 Inteligencia Elite": {
                "MEM": {},
                "EPN": {},
                "CCRT": {},
                "ICC": {},
                "IE Calculo": {}
            }
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
    },
    "6": {
        nombre: "6 Herramientas Clínica Convergencia",
        color: "linear-gradient(135deg, #b91c1c, #ef4444)",
        hijos: {
            "1- Cartografia Intersubjetividad": {},
            "2- Memorias Traumáticas y el a posteriori": {},
            "3- Circuitos de recompensa": {},
            "4- Interfaz Cuerpo Mente": {},
            "5- Neurobiologia de la Repetición": {},
            "6- Plasticidad Simbólica y Sináptica": {},
            "7- Arquitectura del Sueño": {},
            "8- El Ello Somático y Trast PS": {},
            "9- Focalización en Est Límbicas": {},
            "10- La Ética de la Singulridad en la Era Tecnológica": {}
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
                    cargarVistaIframe("prim_entrevista.html");
                } else if (secKey === "3 Est y NC") {
                    cargarVistaIframe("eync.html");
                } else if (secKey === "5 Genograma") {
                    cargarVistaIframe("genograma.html");
                } else if (secKey === "6 Herramientas usadas") {
                    cargarVistaIframe("herramientas_usadas.html");
                } else if (secKey === "9 Interconsultas") {
                    cargarVistaIframe("interconsulta.html");
                } else if (secKey === "10 Creación de Documentos") {
                    cargarVistaIframe("creacion_documentos.html");
                } else if (secKey === "3.1 Potencial acting out") {
                    cargarVistaIframe("acting_out.html");
                } else if (secKey === "3.2 Exp emocional creativa") {
                    cargarVistaIframe("exp_em_creativa.html");
                } else if (secKey === "3.4 Psicodiagnóstico") {
                    cargarVistaIframeExterna("https://drrubenmpereyra-stack.github.io/LANZADOR-TEST-Drpereyra-Suite-Elite-7.0/");
                } else if (secKey === "3.6 Riesgos en PB") {
                    cargarVistaIframe("riesgos_PB.html");
                } else if (secKey === "3.7 Memorias traumáticas") {
                    cargarVistaIframe("memorias_trauma.html");
                } else if (secKey === "3.8 Ritmos circadianos") {
                    cargarVistaIframe("ritmos_circadianos.html");
                } else if (secKey === "3.9 Mapeos visuales") {
                    cargarVistaIframe("mapeos_visuales.html");
                } else if (secKey === "3.10 Adherencia al tratamiento") {
                    cargarVistaIframe("ad_tratamiento.html");
                } else if (secKey === "3.11 Resonancia CT") {
                    cargarVistaIframe("resonancia_CT.html");
                } else if (secKey === "4.1 Exp emocional creador T") {
                    cargarVistaIframe("exp_em_creativaT.html");
                } else if (secKey === "4.2 Contratransferencia") {
                    cargarVistaIframe("CT.html");
                } else if (secKey === "4.3 Terminación Separación") {
                    cargarVistaIframe("terminacion_separacion.html");
                } else if (secKey === "4.5 Farmacología") {
                    cargarVistaIframe("farmacologia.html");
                } else if (secKey === "5.1 Esquemas Neurodinámicos") {
                    cargarVistaIframe("esquemas_neurodinamicos.html");
                } else if (secKey === "5.2 Esquemas Psicodinámicos") {
                    cargarVistaIframe("esquemas_psicodinamicos.html");
                } else if (secKey === "5.3 Esquemas PNIE") {
                    cargarVistaIframe("esquemas_PNIE.html");
                } else if (secKey === "5.4 Psicotrópicos") {
                    cargarVistaIframe("psicotropicos.html");
                } else if (secKey === "5.5 Rúbricas") {
                    cargarVistaIframe("rubricas.html");
                } else if (secKey === "1- Cartografia Intersubjetividad") {
                    cargarVistaIframe("cartografia.html");
                } else if (secKey === "2- Memorias Traumáticas y el a posteriori") {
                    cargarVistaIframe("mt_tecnicas.html");
                } else if (secKey === "3- Circuitos de recompensa") {
                    cargarVistaIframe("circuitos_recompensas.html");
                } else if (secKey === "4- Interfaz Cuerpo Mente") {
                    cargarVistaIframe("interfaz_cuerpo_mente.html");
                } else if (secKey === "5- Neurobiologia de la Repetición") {
                    cargarVistaIframe("neuro_repeticion.html");
                } else if (secKey === "6- Plasticidad Simbólica y Sináptica") {
                    cargarVistaIframe("plasticidad_simb_sinaptica.html");
                } else if (secKey === "7- Arquitectura del Sueño") {
                    cargarVistaIframe("arq_sueño.html");
                } else if (secKey === "8- El Ello Somático y Trast PS") {
                    cargarVistaIframe("ello_somatico.html");
                } else if (secKey === "9- Focalización en Est Límbicas") {
                    cargarVistaIframe("foc_est_limbicas.html");
                } else if (secKey === "10- La Ética de la Singulridad en la Era Tecnológica") {
                    cargarVistaIframe("etica_sing_tecnologica.html");
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
            
            if (terKey === "4.1 Eje 1 Foco") {
                cargarVistaIframe("eje1.html");
            } else if (terKey === "4.2 Eje 2 Func yoicas") {
                cargarVistaIframe("elite_func_yoicas.html");
            } else if (terKey === "4.3 Eje 3 Relac TP") {
                cargarVistaIframe("eje3.html");
            } else if (terKey === "4.4 Radar de Fiorini") {
                cargarVistaIframe("radar_fiorini.html");
            } else if (terKey === "7.1 Val Yo") {
                cargarVistaIframe("val_yo.html");
            } else if (terKey === "7.2 Val SuperYo") {
                cargarVistaIframe("val_superyo.html");
            } else if (terKey === "7.3 Val Ello") {
                cargarVistaIframe("val_ello.html");
            } else if (terKey === "7.4 Integraciones") {
                cargarVistaIframe("integracion_freud.html");
            } else if (terKey === "8.1 Protocolo Fiorini") {
                cargarVistaIframe("protocolo_fiorini.html");
            } else if (terKey === "8.2 Puente simbolización") {
                cargarVistaIframe("puente_simbolizacion.html");
            } else if (terKey === "8.3 Proyecto vital") {
                cargarVistaIframe("proyecto_vital.html");
            } else if (terKey === "8.4 Via motora") {
                cargarVistaIframe("via_motora.html");
            } else if (terKey === "8.5 Temporalidad") {
                cargarVistaIframe("temporalidad.html");
            } else if (terKey === "8.6 Convergencia clínica") {
                cargarVistaIframe("convergencia_clinica.html");
            } else if (terKey === "Ventana creadora") {
                cargarVistaIframe("ventana_creadora.html");
            } else if (terKey === "MEM") {
                cargarVistaIframe("mem.html");
            } else if (terKey === "EPN") {
                cargarVistaIframe("epn.html");
            } else if (terKey === "CCRT") {
                cargarVistaIframe("ccrt.html");
            } else if (terKey === "ICC") {
                cargarVistaIframe("icc.html");
            } else if (terKey === "IE Calculo") {
                cargarVistaIframe("inteligencia_elite.html");
            } else if (terKey === "Poligono de potencia") {
                cargarVistaIframe("poligono_potencia.html");
            } else if (terKey === "Medidor de reserva neural") {
                cargarVistaIframe("reserva_neural.html");
            } else if (terKey === "Medidor autoestima") {
                cargarVistaIframe("medidor_autoestima.html");
            } else if (terKey === "Termómetro de identidad") {
                cargarVistaIframe("term_identidad.html");
            } else if (terKey === "Medidor de ansiedad") {
                cargarVistaIframe("medidor_ansiedad.html");
            } else if (terKey === "Alivio sintomático") {
                cargarVistaIframe("alivio_sintomatico.html");
            } else if (terKey === "Burnout") {
                cargarVistaIframe("burnout.html");
            } else if (terKey === "Ansiedad de Beck") {
                cargarVistaIframe("ansiedad_beck.html");
            } else if (terKey === "Depresión de Beck") {
                cargarVistaIframe("depresion_beck.html");
            } else if (terKey === "4.4.1 Rol profesional") {
                cargarVistaIframe("rol_profesional.html");
            } else if (terKey === "4.4.2 Alianza terapéutica") {
                cargarVistaIframe("alianza_terapeutica.html");
            } else if (terKey === "4.4.3 Estilo de intervención y eficacia") {
                cargarVistaIframe("estilo_eficacia.html");
            } else if (terKey === "4.4.4 Cuidado del self y estado psicofisiológico") {
                cargarVistaIframe("cuidado_self.html");
            } else {
                mostrarContenido(terKey);
            }
        };
        barTerciaria.appendChild(btn);
    });
}

// Función general para cargar vistas HTML limpias mediante iframe local
function cargarVistaIframe(archivoHtml) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<iframe src="${archivoHtml}" style="width: 100%; height: 75vh; border: none; background: #f8fafc;"></iframe>`;
}

// Función para cargar URLs externas (como el lanzador de GitHub) mediante iframe
function cargarVistaIframeExterna(urlExterna) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<iframe src="${urlExterna}" style="width: 100%; height: 75vh; border: none; background: #f8fafc;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
}

function mostrarContenido(seccion) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `<h2>Sección: ${seccion}</h2><p>Módulo interactivo conectado a Firebase (materiales-terapeuticos). Listo para programar formularios y persistencia específica.</p>`;
}
