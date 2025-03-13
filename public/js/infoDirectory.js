document.addEventListener('DOMContentLoaded',()=>{
  //Modal info
  const info = document.getElementById('infoApp');
  info.addEventListener('click', ()=>{
    Swal.fire({
      title: "Información de soporte",
      icon: "info",
      html: `
        <ul class="info-support">
          <li>
            <span>Número de teléfono: </span> 313 32 90 898 
          </li>
          <li>
            <span>Consultar el manual de usuario: </span>
            <a href='/assets/pdf/userManual.pdf' target='_blank'>Manual de usuario</a>
          </li>
        </ul>
      `
    });
  });
});