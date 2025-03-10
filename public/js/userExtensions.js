const fetchData = async (url, options = {}) => {
  let loadingSwal;
  try {
    loadingSwal = Message.waitingMessage("Realizando la búsqueda","Espere un momento...");

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      Message.alertMessage(errorData.error || "Error en la solicitud");
      throw new Error(errorData.error || "Error en la solicitud");
    }
    return await response.json();
  } catch (error) {
    throw error;
  } finally {
    (loadingSwal).close(); 
  }
};

const nameBranches = (params) => {
  const branchMappings = {
    'tecoman': 'Tecomán',
    'villa': 'Villa de Álvarez',
    'guzman': 'Guzmán',
    'autlan': 'Autlán'
  };

  const searchBranch = params.get('sucursal')?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Buscar coincidencia en el mapping
  for (const [key, value] of Object.entries(branchMappings)) {
    if (searchBranch?.includes(key)) {
      return value;
    }
  }
  
  return params.get('sucursal');
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const subTitle = nameBranches(params);
  document.getElementById('branchSubTitle').innerHTML += ` ${subTitle}`;

  try{
    document.getElementById('searchForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      const sucursal = params.get('sucursal');
      console.log(sucursal);
  
      const formData = new FormData(event.target); 
      const dataPlain = Object.fromEntries(formData.entries());
      const url = `/v1/user/getBranchExtension/${encodeURIComponent(sucursal)}?${new URLSearchParams(dataPlain)}`;
        const { data } = await fetchData(url);
        document.getElementById('extensionList').innerHTML = data.map(extension => `
          <tr>
            <td data-title='Nombre'>${extension.employeeName}</td>
            <td data-title='Área'>${extension.area.areaName}</td>
            <td data-title='Área'>${extension.position}</td>
            <td data-title='Extensión'>${extension.extension}</td>
          </tr>
        `).join('');
    });
  }catch(error){
    console.log(error);
    Message.errorMessage("Error al realizar la búsqueda");
  }
});