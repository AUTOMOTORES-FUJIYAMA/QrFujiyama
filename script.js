let origenesDisponibles = [];
let vehiculosDisponibles = [];
let ciudadesDisponibles = [];

function showStep(stepNumber) {
  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.getElementById(`step-${stepNumber}`).classList.add('active');

  document.querySelectorAll('.step').forEach(step => {
    const stepNum = parseInt(step.dataset.step);
    step.classList.remove('active', 'completed');
    if (stepNum === stepNumber) step.classList.add('active');
    else if (stepNum < stepNumber) step.classList.add('completed');
  });
}

function nextStep(currentStep) {
  if (validateStep(currentStep)) showStep(currentStep + 1);
}

function prevStep(currentStep) {
  showStep(currentStep - 1);
}

function validateStep(step) {
  let isValid = true;
  document.querySelectorAll(`#step-${step} .error`).forEach(error => error.textContent = '');

  if (step === 1) {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre) { document.getElementById('nombre-error').textContent = 'Nombre requerido'; isValid = false; }
    if (!email || !validateEmail(email)) { document.getElementById('email-error').textContent = 'Email inválido'; isValid = false; }
    if (!telefono || !validatePhone(telefono)) { document.getElementById('telefono-error').textContent = 'Teléfono debe tener 10 dígitos'; isValid = false; }
  }

  if (step === 2) {
    const ciudad = document.getElementById('ciudad').value.trim();
    const origen = document.getElementById('origen').value.trim();
    const interes = document.getElementById('interes').value.trim();

    if (!ciudad) {
      document.getElementById('ciudad-error').textContent = 'Ingrese su ciudad';
      isValid = false;
    }

    if (!origen || !origenesDisponibles.includes(origen)) {
      document.getElementById('origen-error').textContent = 'Seleccione una opción válida del listado';
      isValid = false;
    }

    if (!interes || !vehiculosDisponibles.includes(interes)) {
      document.getElementById('interes-error').textContent = 'Seleccione un vehículo del listado';
      isValid = false;
    }
  }

  if (step === 3) {
    const privacidad = document.getElementById('privacidad').checked;
    if (!privacidad) {
      document.getElementById('privacidad-error').textContent = 'Debe aceptar los términos';
      isValid = false;
    }
  }

  return isValid;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

function submitForm() {
  if (validateStep(3)) {
    document.getElementById('step-3-buttons').style.display = 'none';
    document.getElementById('loading-message').style.display = 'block';

    const formData = {
      nombre: document.getElementById('nombre').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      ciudad: document.getElementById('ciudad').value.trim(),
      origen: document.getElementById('origen').value.trim(),
      interes: document.getElementById('interes').value.trim(),
      comentarios: document.getElementById('comentarios').value.trim()
    };

    fetch("https://script.google.com/macros/s/AKfycbx-JeX09B6r6Tbue27cAO58ah942rg0k9WE9gt5zHcjL8bH5LuLIti2S-dB5LBXsl7z/exec", {
      method: "POST",
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'OK') {
        document.getElementById('step-3').style.display = 'none';
        document.getElementById('loading-message').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
      }
    })
    .catch(() => alert('Error de conexión'));

    const nombre = document.getElementById('nombre').value.trim();
    const interes = document.getElementById('interes').value.trim();
    const origen = document.getElementById('origen').value.trim();

    const mensaje = `Hola, soy ${nombre}. Estoy interesado en el vehículo ${interes} que vi en ${origen}. Quisiera más información.`;

    // ⚠️ IMPORTANTE
    const url = `https://wa.me/573178942092?text=${encodeURIComponent(mensaje)}`;

    document.getElementById('whatsapp-btn').href = url;
  }
}

function setupAutocomplete(inputId, hiddenId, panelId, data) {
  const input = document.getElementById(inputId);
  const hidden = document.getElementById(hiddenId);
  const panel = document.getElementById(panelId);

  function closePanel() {
    panel.classList.remove('open', 'open-up');
    panel.innerHTML = '';
  }

  function maybeOpenUp() {
    const rect = input.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    if (spaceBelow < 220 && spaceAbove > spaceBelow) panel.classList.add('open-up');
    else panel.classList.remove('open-up');
  }

  function renderItems(value) {
  const query = value.trim().toLowerCase();
  panel.innerHTML = '';

  let filtered;

  if (!query) {
    // 🔥 MOSTRAR TODO SI NO HAY TEXTO
    filtered = data.sort((a, b) => a.localeCompare(b, 'es'));;
  } else {
    filtered = data
      .filter(item => item.toLowerCase().includes(query)).sort((a, b) => a.localeCompare(b, 'es'));
  }

  if (!filtered.length) {
    panel.innerHTML = `<div class="autocomplete-item" style="color:#6b7280;">Sin resultados</div>`;
    panel.classList.add('open');
    maybeOpenUp();
    return;
  }

  filtered.forEach(item => {
    const option = document.createElement('div');
    option.className = 'autocomplete-item';
    option.textContent = item;

    option.addEventListener('click', () => {
      input.value = item;
      hidden.value = item;
      closePanel();
    });


const aceptarBtn = document.getElementById('aceptar-privacidad');

const modal = document.getElementById('modal-privacidad');
const openBtn = document.getElementById('open-privacidad');
const closeBtn = document.getElementById('close-privacidad');

// Abrir modal
openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Cerrar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar al hacer clic afuera
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Cerrar haciendo clic afuera
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

    panel.appendChild(option);
  });

  panel.classList.add('open');
  maybeOpenUp();
}

  input.addEventListener('input', () => {
    hidden.value = '';
    renderItems(input.value);
  });

  input.addEventListener('focus', () => {
    renderItems(input.value); // 🔥 SIEMPRE ABRE
  });
  input.addEventListener('click', () => {
    renderItems(input.value);
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      const exact = data.find(item => item.toLowerCase() === input.value.trim().toLowerCase());
      if (exact) {
        input.value = exact;
        hidden.value = exact;
      }
      closePanel();
    }, 150);
  });

  window.addEventListener('resize', () => {
    if (panel.classList.contains('open')) maybeOpenUp();
  });
}

function loadData() {
  fetch("https://script.google.com/macros/s/AKfycbx-JeX09B6r6Tbue27cAO58ah942rg0k9WE9gt5zHcjL8bH5LuLIti2S-dB5LBXsl7z/exec")
    .then(res => res.json())
    .then(data => {
      origenesDisponibles = data.origenes || [];
      vehiculosDisponibles = data.vehiculos || [];

      setupAutocomplete('origen-input', 'origen', 'origen-list', origenesDisponibles);
      setupAutocomplete('interes-input', 'interes', 'interes-list', vehiculosDisponibles);
    })
    .catch(() => console.error("Error cargando datos dinámicos"));
}

function loadCiudades() {
  fetch("colombia.json")
    .then(res => res.json())
    .then(data => {
      
      // 🔥 Convertir a lista plana
      ciudadesDisponibles = data.flatMap(dep => dep.ciudades);

      // 🔥 Inicializar autocomplete
      setupAutocomplete('ciudad-input', 'ciudad', 'ciudad-list', ciudadesDisponibles);
    })
    .catch(() => console.error("Error cargando ciudades"));
}

showStep(1);
loadData();
loadCiudades();