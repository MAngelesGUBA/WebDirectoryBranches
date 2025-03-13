const fetchData =  async(url, processMessage) =>{
  let loadingSwal;
  try{
    loadingSwal = Message.waitingMessage(processMessage);
    const response = await fetch(url);
    if(!response.ok){
      const errorData = await response.json().error;
      throw new Error(errorData || 'Error en la solicitud');
    }
    return await response.json();
  }catch(error){
    throw error;
  }finally{
    (loadingSwal).close();
  }
};

const redirectBranches = ()=>{
  const colima = document.getElementById('branchColima');
  colima.addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Colima';
  });

  const manzanillo = document.getElementById('branchManzanillo');
  manzanillo.addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Manzanillo';
  });

  const tecoman = document.getElementById('branchTecoman');
  tecoman.addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Tecoman';
  });

  const villa = document.getElementById('branchVilla');
  villa.addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Villa';
  });

  const guzman = document.getElementById('branchGuzman');
  guzman.addEventListener('click',()=>{
    window.location.href='/v1/user/branchExtensions?sucursal=Guzman';
  });

  const autlan = document.getElementById('branchAutlan');
  autlan.addEventListener('click',()=>{
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
  redirectBranches();
  //Busqueda de todas las sucursales ------------------------------
  const searchForm = document.getElementById('frmSearch');
  searchForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    processMessage = "Realizando la búsqueda","Espere un momento...";
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
      Message.errorMessage("Error al realizar la búsqueda", error.Message);
    }

  })
});