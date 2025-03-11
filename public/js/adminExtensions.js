// Constants
const API_ENDPOINTS = {
  getBranch: '/v1/admin/getBranch',
  getArea: '/v1/admin/getArea',
  getExtension: '/v1/admin/getExtension',
  insertExtension: '/v1/admin/insertExtension',
  updateExtension: '/v1/admin/updateExtension',
  deleteExtension: '/v1/admin/deleteExtension'
};

// Utility functions
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || 'Error en la solicitud');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Data fetching functions
const getBranch = async () => {
  try {
    const { data } = await fetchData(API_ENDPOINTS.getBranch);
    return data.map(branch => 
      `<option value="${branch.id}">${branch.branchName}</option>`
    ).join('');
  } catch (error) {
    throw new Error('Error loading branches data');
  }
};

const getArea = async () => {
  try {
    const { data } = await fetchData(API_ENDPOINTS.getArea);
    return data.map(area => 
      `<option value="${area.id}">${area.areaName}</option>`
    ).join('');
  } catch (error) {
    throw new Error('Error loading areas data');
  }
};

// Table management class
class TableManager {
  constructor(tableId, bodyId) {
    this.table = document.getElementById(tableId);
    this.tbody = document.getElementById(bodyId);
    this.activeRow = null;
    this.eventsInitialized = false; // Bandera para evitar inicializar eventos duplicados
    this.initializeEvents();
  }

  async initializeSelects() {
    const [branchesHTML, areaHTML] = await Promise.all([getBranch(), getArea()]);
    document.querySelectorAll('.branch-extension').forEach(select => select.innerHTML = branchesHTML);
    document.querySelectorAll('.area-extension').forEach(select => select.innerHTML = areaHTML);
  }

  toggleEditMode(row, activate) {
    row.classList.toggle('active-row', activate);
    row.querySelectorAll('span').forEach(span => span.style.display = activate ? 'none' : 'inline-block');
    row.querySelectorAll('input, select').forEach(input => input.style.display = activate ? 'inline-block' : 'none');
  }

  async setRowData(row) {
    await this.initializeSelects();
    const elements = ['branch', 'email', 'employee', 'area', 'position', 'extension'];
    elements.forEach(element => {
      const span = row.querySelector(`.${element}`);
      const input = row.querySelector(`.t${element.charAt(0).toUpperCase() + element.slice(1)}`);
      if (input && span) {
        // Para branch y area, usa el data-id del span
        if (element === 'branch' || element === 'area') {
          input.value = span.dataset.id || '';
        } else {
          // Para los demás campos, usa el textContent
          input.value = span.textContent || '';
        }
      }
    });
  }

  setInputsData(row) {
    const elements = ['branch', 'employee', 'area', 'position', 'extension'];
    elements.forEach(element => {
      const span = row.querySelector(`.${element}`);
      const input = row.querySelector(`.t${element.charAt(0).toUpperCase() + element.slice(1)}`);
      if (input && span) {
        if (element === 'branch' || element === 'area') {
          span.dataset.id = input.value;
          span.textContent = input.querySelector(`option[value="${input.value}"]`).textContent;
        } else
          span.textContent = input.value;
      }
    });
  }

  toggleActionButtons(row, enable) {
    ['btn-update-data', 'btn-delete-data'].forEach(btnClass => {
      const button = row.querySelector(`.${btnClass}`);
      if (button) enable ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
    });
  }

  initializeEvents() {
    if (this.eventsInitialized) return; // Evita inicializar eventos duplicados
    this.eventsInitialized = true;

    this.table.addEventListener('click', (event) => {
      const row = event.target.closest('tr');
      if (!row || event.target.closest('.action-column')) return;

      // Ignorar clics en inputs o selects dentro de la fila activa
      if (this.activeRow && this.activeRow.contains(event.target) 
        && (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT')) {
        return;
      }

      if (this.activeRow && this.activeRow !== row) {
        this.toggleEditMode(this.activeRow, false);
        this.toggleActionButtons(this.activeRow, false);
      }

      if (row.parentElement === this.tbody) {
        const isCurrentRow = row === this.activeRow;
        this.toggleEditMode(row, !isCurrentRow);
        this.toggleActionButtons(row, !isCurrentRow);
        if (!isCurrentRow) this.setRowData(row);
        this.activeRow = isCurrentRow ? null : row;
      }
    });

    // Outside click handler
    document.addEventListener('click', (event) => {
      if (!this.table.contains(event.target) && this.activeRow) {
        this.toggleEditMode(this.activeRow, false);
        this.toggleActionButtons(this.activeRow, false);
        this.activeRow = null;
      }
    });
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
  let loadingSwal;
  try {
    loadingSwal = Message.waitingMessage();
    const [branchesHTML, areaHTML] = await Promise.all([getBranch(), getArea()]);
    document.getElementById('sucursal').innerHTML = branchesHTML;
    document.getElementById('area').innerHTML = areaHTML;
    
    const tableManager = new TableManager('extensionsTable', 'bodyExtensions');

    // Form submission handlers
    document.getElementById('frmExtension').addEventListener('submit', async (event) => {
      event.preventDefault();
      const buttonSubmit = document.getElementById('btnSendExtension');
      buttonSubmit.disabled = true;
      try {
        const formData = new FormData(event.target);
        const response = await fetchData(API_ENDPOINTS.insertExtension, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData))
        });
        Message.successMessage(response.message);
        event.target.reset();
      } catch (error) {
        Message.alertMessage(error.message);
      } finally {
        buttonSubmit.disabled = false;
      }
    });

    // Search form handler
    document.getElementById('frmSearch').addEventListener('submit', async (event) => {
      event.preventDefault();
      let loadingSwal;
      try {
        loadingSwal = Message.waitingMessage("Realizando la búsqueda","Espere un momento...");
        const formData = new FormData(event.target);
        const url = `${API_ENDPOINTS.getExtension}?${new URLSearchParams(Object.fromEntries(formData))}`;
        const { data } = await fetchData(url);
        event.target.reset();
        document.getElementById('bodyExtensions').innerHTML = data.map(extension => {
          return `
          <tr class='editable-row' id='${extension.id}'>
            <td data-title='Sucursal'>
              <span data-id='${extension.branch.id}' class='branch'>${extension.branch.branchName}</span>
              <select class='branch-extension tBranch' name='sucursal' required style='display:none;'></select>
            </td>
            <td data-title='Correo'>
              <span data-id='${extension.email}' class='email'>${extension.email}</span>
              <input class='tEmail' type='email' name='email' required style='display:none;'>
            </td>
            <td data-title='Nombre'>
              <span class='employee'>${extension.employeeName}</span>
              <input class='tEmployee' type='text' name='employee' required style='display:none;'> 
            </td>
            <td data-title='Área'>
              <span data-id='${extension.area.id}' class='area'>${extension.area.areaName}</span>
              <select class='area-extension tArea' name='area' required style='display:none;'></select>
            </td>
            <td data-title='Puesto'>
              <span class='position'>${extension.position}</span>
              <input class='tPosition' type='text' name='position' required style='display:none;'>
            </td>
            <td data-title='Extensión'>
              <span class='extension'>${extension.extension}</span>
              <input class='tExtension' type='number' name='extension' required style='display:none;'>
            </td>
            <td class='action-column action-buttons' data-title='Acciones'>
              <button class='btn-update-data' id='btnUpdateExtension' type='button' disabled>
                <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="25" height="28" fill="#F4F5F7">
                  <path d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z"></path>
                  <path d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z"></path>
                </svg>
              </button>
              <button class='btn-delete-data' id='btnDeleteExtension' type='button' disabled>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="28" fill="#F4F5F7">
                  <path d="M19.756,5.993c-.068-.016-.862-.202-2.107-.396l-.661-3.075c-.126-.583-.584-1.036-1.169-1.155-.074-.015-1.839-.368-3.818-.368s-3.745,.354-3.819,.369c-.584,.119-1.042,.572-1.168,1.154l-.661,3.075c-1.244,.193-2.038,.379-2.106,.395-.807,.19-1.306,.999-1.115,1.805,.161,.684,.767,1.146,1.439,1.155-.1,1.28-.173,2.786-.173,4.227,0,4.659,.752,8.084,.784,8.228,.078,.353,.342,.636,.688,.74,.116,.035,2.875,.853,6.132,.853s6.015-.817,6.131-.852c.348-.104,.611-.388,.689-.743,.032-.145,.783-3.605,.783-8.225,0-1.449-.072-2.953-.171-4.228,.671-.01,1.275-.472,1.437-1.155,.19-.806-.308-1.613-1.113-1.804Zm-10.257-.763l.231-1.072c1.194-.157,3.34-.158,4.54,0l.23,1.072c-.913-.062-1.792-.091-2.674-.087-.008,0-.016,0-.025,0-.757,.004-1.517,.033-2.303,.087Zm1.336,12.715c0,.552-.447,1-1,1s-1-.448-1-1v-7.231c0-.552,.447-1,1-1s1,.448,1,1v7.231Zm4.33,0c0,.552-.447,1-1,1s-1-.448-1-1v-7.231c0-.552,.447-1,1-1s1,.448,1,1v7.231Z"></path>
                </svg>
              </button>
            </td>
          </tr>
        `}).join('');
        tableManager.initializeEvents();
      } catch (error) {
        Message.alertMessage(error.message);
      }finally{
        (loadingSwal).close();
      }
    });

    // Update button handler
    document.addEventListener('click', async (event) => {
      const button = event.target.closest('.btn-update-data');
      if (!button) return;
      const row = button.closest('tr');
      const data = {
        branch: row.querySelector('.tBranch').value,
        email: row.querySelector('.tEmail').value,
        employee: row.querySelector('.tEmployee').value,
        area: row.querySelector('.tArea').value,
        position: row.querySelector('.tPosition').value,
        extension: row.querySelector('.tExtension').value,
      };
      
      let loadingSwal;
      try {
        const confirm = await Message.confirmationMessage('actualizar');
        if (!confirm) return;
        
        loadingSwal = Message.waitingMessage("Actualizando...", "Por favor espere");
        const url = `${API_ENDPOINTS.updateExtension}/${row.id}`;
        const response = await fetchData(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
    
        if (loadingSwal) {
          loadingSwal.close();
        }
    
        // Mostrar el mensaje de éxito
        await Message.successMessage(response.message);
        tableManager.setInputsData(row);
      } catch (error) {
        if (loadingSwal) {
          loadingSwal.close();
        }
        Message.alertMessage(error.message);
      }
    });

    // delete button handler
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.btn-delete-data');
    if (!button) return;

    const row = button.closest('tr');
    let loadingSwal;
    
    try {
      const confirm = await Message.confirmationMessage('eliminar');
      if (!confirm) return;
      
      loadingSwal = Message.waitingMessage("Eliminando...", "Por favor espere");
      const url = `${API_ENDPOINTS.deleteExtension}/${row.id}`;
      const response = await fetchData(url, { method: 'DELETE' });

      if (loadingSwal) {
        loadingSwal.close();
      }

      // Mostrar mensaje de éxito y esperar a que se cierre
      await Message.successMessage(response.message);
      // Eliminar la fila después de que se cierre el mensaje
      row.remove();
    } catch (error) {
      if (loadingSwal) {
        loadingSwal.close();
      }
      Message.alertMessage(error.message);
    }
  });

  } catch (error) {
    alert('Initialization error: ' + error.message);
  }finally{
    (loadingSwal).close();
  }
});
