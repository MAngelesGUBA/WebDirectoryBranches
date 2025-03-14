const fetchData =  async(url, processMessage) =>{
  let loadingSwal;
  try{
    loadingSwal = Message.waitingMessage(processMessage);
    const response = await fetch(url);
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || 'Ocurrió un error');
    }
    return await response.json();
  }catch(error){
    throw error;
  }finally{
    (loadingSwal).close();
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

const formatEmail = (email) =>{
  return email.replace(/@/g,"&commat;").replace(/\./g,"&period;");
}

const createMailtoEmail = (event, email ) =>{
  event.preventDefault();
  const mailtoLink = `mailto:${email}`;
  window.location.href = mailtoLink;
}

document.addEventListener('DOMContentLoaded',()=>{
  //Redireccion a las sucursales ------------------------------
  addHomeEventListeners();
  //Busqueda de todas las sucursales ------------------------------
  const searchForm = document.getElementById('frmSearch');
  searchForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const processMessage = `Realizando la búsqueda, Espere un momento...`;
    try{
      const formData = new FormData(event.target);
      const url = `/v1/user/getAllExtensions?${new URLSearchParams(Object.fromEntries(formData))}`;
      const {data} = await fetchData(url, processMessage);
      document.getElementById('extensionList').innerHTML = data.map(extension =>{
        const formattedEmail = formatEmail(extension.email); 
        return`
          <tr>
            <td data-title='Sucursal'>${extension.branch.branchName}</td>
            <td data-title='Coreo'>
              <a class="email-link" href="#" data-email=${extension.email}>
                ${formattedEmail}
              </a>
            </td>
            <td data-title='Nombre'>${extension.employeeName}</td>
            <td data-title='Área'>${extension.area.areaName}</td>
            <td data-title='Puesto'>${extension.position}</td>
            <td data-title='Extensión'>${extension.extension}</td>
          </tr>
        `;
      }).join('');
    }catch(error){
      Message.alertMessage(error.message);
    }
  })
});