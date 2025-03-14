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

const addHomeEventListeners  = ()=>{
  document.getElementById('branchColima').addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Colima';
  });

  document.getElementById('branchManzanillo').addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Manzanillo';
  });

  document.getElementById('branchTecoman').addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Tecoman';
  });

  document.getElementById('branchVilla').addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Villa';
  });

  document.getElementById('branchGuzman').addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Guzman';
  });

  document.getElementById('branchAutlan').addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Autlan';
  });
};

// Función personalizada para renderizar extensiones
const renderExtensions = (data) => {
  return data.map(extension =>{
    return `
      <tr>
        <td data-title='Sucursal'>${extension.branch.branchName}</td>
        <td data-title='Coreo'>
          <a class="email-link" href="mailto:${extension.email}">
          ${extension.email}
          </a>
        </td>
        <td data-title='Nombre'>${extension.employeeName}</td>
        <td data-title='Área'>${extension.area.areaName}</td>
        <td data-title='Puesto'>${extension.position}</td>
        <td data-title='Extensión'>${extension.extension}</td>
      </tr>
    `;
  }).join('');
};

document.addEventListener('DOMContentLoaded',()=>{
  //Redireccion a las sucursales ------------------------------
  addHomeEventListeners();

  //Busqueda de todas las sucursales ------------------------------
  document.getElementById('frmSearch').addEventListener('submit', async (event)=>{
    event.preventDefault();
    let loadingSwal;
    const title = 'Realizando la búsqueda';
    const message = ' Espere un momento...';

    try{
      const formData = new FormData(event.target);
      const url = `/v1/user/getAllExtensions?${new URLSearchParams(Object.fromEntries(formData))}`;
      
      loadingSwal = Message.waitingMessage(title,message);
      const {data} = await fetchData(url);
      event.target.reset();

      new UpdatePageTable(data,renderExtensions);
    }catch(error){
      Message.alertMessage(error.message);
    }finally{
      (loadingSwal).close();
    }
  })
});