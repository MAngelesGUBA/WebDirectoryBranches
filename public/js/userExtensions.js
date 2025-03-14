const fetchData =  async(url) =>{
  try{
    const response = await fetch(url);
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || 'Ocurrió un error');
    }
    return await response.json();
  }catch(error){
    throw error;
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
};

const renderExtensions = (data) => {
  return data.map(extension => {
    return `
    <tr>
      <td data-title='Correo'>
        <a class = "email-link" href="mailto: ${extension.email}">
        ${extension.email}</a>
      </td>
      <td data-title='Nombre'>${extension.employeeName}</td>
      <td data-title='Área'>${extension.area.areaName}</td>
      <td data-title='Posición'>${extension.position}</td>
      <td data-title='Extensión'>${extension.extension}</td>
    </tr>
  `}).join('');
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const subTitle = nameBranches(params);
  document.getElementById('branchSubTitle').innerHTML += ` ${subTitle}`;
  
  document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    let loadingSwal;
    const title = 'Realizando la búsqueda';
    const message = ' Espere un momento...';

    try{
      const formData = new FormData(event.target); 
      const plainData = Object.fromEntries(formData)
      const sucursal = params.get('sucursal');
      const url = `/v1/user/getBranchExtension/${encodeURIComponent(sucursal)}?${new URLSearchParams(plainData)}`;
      
      loadingSwal = Message.waitingMessage(title, message);
      const { data } = await fetchData(url);
      event.target.reset();

      new UpdatePageTable(data,renderExtensions);
      Message.alertMessage(error.message);
    }finally{
      (loadingSwal).close();
    }
  });
});