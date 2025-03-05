document.addEventListener("DOMContentLoaded", async function() {
  //CONSUMO DE APIs --------------------------------------------------------------------
  const branchesHTML = await getBranch();
  const areaHTML = await getArea();

  //SELECT FORM
  document.getElementById('sucursal').innerHTML=branchesHTML;
  document.getElementById('area').innerHTML=areaHTML;

  //SELECT TABLE
  //document.getElementsByClassName('branch-extension').innerHTML = branchesHTML;
  //document.getElementsByClassName('area-extension').innerHTML = areaHTML;
});


//Listar sucursales
const getBranch = async()=>{
  try{
    const response = await fetch('/v1/admin/getBranch');
    const dataJson = await response.json(); //Transforma la respuesta a un JSON 
    const data = dataJson.data; //Accede a la propiedad data
    let branchesHTML = '';
    data.forEach(branch => { //Concatena la estructura del select
      branchesHTML+=` <option value="${branch.id}">${branch.branchName}</option>`;
    });
    return branchesHTML;
  }catch(error){
    alert('Ocurrio un error al cargar datos de las sucursales', error);
  }
};


//Listar sucursales
const getArea = async()=>{
  try{
    const response = await fetch('/v1/admin/getArea');
    const dataJson = await response.json(); //Transforma la respuesta a un JSON 
    const data = dataJson.data; //Accede a la propiedad data
    let areaHTML = '';
    data.forEach(area => { //Concatena la estructura del select
      areaHTML+=` <option value="${area.id}">${area.areaName}</option>`;
    });
    return areaHTML;
  }catch(error){
    alert('Ocurrio un error al cargar datos de las sucursales', error);
  }
};

//Insertar datos
document.getElementById('frmExtension').addEventListener('submit',async (event)=>{
  const buttonSubmit = document.getElementById('btnSendExtension');
  buttonSubmit.setAttribute('disabled','disabled');

  event.preventDefault(); //Evita el envio del formulario hacia el servidor

  //Obtiene todos los datos que tienen el atributo name
  const formData = new FormData(event.target); //Obtiene los elementos del formulario --> event.target
  try{
    //Obtiene las entradas (datos del form) y los combierte a un objeto
    const dataPlain = Object.fromEntries(formData.entries());
    const dataJson = JSON.stringify(dataPlain); //transforma a formato a json 
    const response = await fetch('/v1/admin/insertExtension',{
      method:'POST',
      headers: {'Content-type':'application/json'},
      body: dataJson
    });
    const dataResponseJSON = await response.json();
    alert(dataResponseJSON.message);
  }catch(error){
    alert('Ocurrio un error en el envío del formulario', error);
  }
  buttonSubmit.removeAttribute('disabled');
});


document.getElementById('frmSearch').addEventListener('submit', table = async(event)=>{
  event.preventDefault();
  try{
    const formData = new FormData(event.target);

    const dataPlain = Object.fromEntries(formData.entries());
    const url = `/v1/admin/getExtension?${new URLSearchParams(dataPlain)}`;
    const response = await fetch(url);
    const dataJson = await response.json();
    const data = dataJson.data;
    let extensionHTML = '';
    data.forEach(extension => {
      extensionHTML += `
        <tr class='editable-row' id='${extension.id}'>
          <td data-title='Sucursal'>
            <span>${extension.branch.branchName}</span>
            <select class='branch-extension' name='sucursal' required style='display:none;'></select>
          </td>
          <td data-title='Nombre'>
            <span>${extension.employeeName}</span>
            <input type='text' name='employee' style='display:none;'> 
          </td>
          <td data-title='Área'>
            <span>${extension.area.areaName}</span>
            <select class='area-extension' name='area' required style='display:none;'></select>
          </td>
          <td data-title='Puesto'>
            <span>${extension.position}</span>
            <input type='text' name='position' style='display:none;'>
          </td>
          <td data-title='Extensión'>
            <span>${extension.extension}</span>
            <input type='number' name='extension' style='display:none;'>
          </td>
          <td class='action-column action-buttons' data-title='Acciones'>
            <button class='btn-update-data' type='button'>
              <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="25" height="28" fill="#F4F5F7">
                <path d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z"></path>
                <path d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z"></path>
              </svg>
            </button>
            <button class='btn-delete-data' type='button'>
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="28" fill="#F4F5F7">
                <path d="M19.756,5.993c-.068-.016-.862-.202-2.107-.396l-.661-3.075c-.126-.583-.584-1.036-1.169-1.155-.074-.015-1.839-.368-3.818-.368s-3.745,.354-3.819,.369c-.584,.119-1.042,.572-1.168,1.154l-.661,3.075c-1.244,.193-2.038,.379-2.106,.395-.807,.19-1.306,.999-1.115,1.805,.161,.684,.767,1.146,1.439,1.155-.1,1.28-.173,2.786-.173,4.227,0,4.659,.752,8.084,.784,8.228,.078,.353,.342,.636,.688,.74,.116,.035,2.875,.853,6.132,.853s6.015-.817,6.131-.852c.348-.104,.611-.388,.689-.743,.032-.145,.783-3.605,.783-8.225,0-1.449-.072-2.953-.171-4.228,.671-.01,1.275-.472,1.437-1.155,.19-.806-.308-1.613-1.113-1.804Zm-10.257-.763l.231-1.072c1.194-.157,3.34-.158,4.54,0l.23,1.072c-.913-.062-1.792-.091-2.674-.087-.008,0-.016,0-.025,0-.757,.004-1.517,.033-2.303,.087Zm1.336,12.715c0,.552-.447,1-1,1s-1-.448-1-1v-7.231c0-.552,.447-1,1-1s1,.448,1,1v7.231Zm4.33,0c0,.552-.447,1-1,1s-1-.448-1-1v-7.231c0-.552,.447-1,1-1s1,.448,1,1v7.231Z"></path>
              </svg>
            </button>
          </td>
        </tr>
      `;
    });
    document.getElementById('bodyExtensions').innerHTML = extensionHTML;
  }catch(error){
    console.log(error);
    alert('OOPS!', error);
  }
});


