const addMenuEventListeners = () =>{
  document.getElementById('menuHome').addEventListener('click',()=>{
    window.location.href = '/v1/home';
  });

  document.getElementById('menuColima').addEventListener('click',()=>{
    window.location.href = '/v1/user/branchExtensions?sucursal=Colima';
  });

  document.getElementById('menuManzanillo').addEventListener('click',()=>{
    window.location.href = '/v1/user/branchExtensions?sucursal=Manzanillo';
  });

  document.getElementById('menuTecoman').addEventListener('click',()=>{
    window.location.href = '/v1/user/branchExtensions?sucursal=Tecoman';
  });

  document.getElementById('menuVilla').addEventListener('click',()=>{
    window.location.href = '/v1/user/branchExtensions?sucursal=Villa';
  }); 

  document.getElementById('menuGuzman').addEventListener('click',()=>{
    window.location.href = '/v1/user/branchExtensions?sucursal=Guzman';
  }); 

  document.getElementById('menuAutlan').addEventListener('click',()=>{
    window.location.href = '/v1/user/branchExtensions?sucursal=Autlan';
  });
  
}

document.addEventListener('DOMContentLoaded',()=>{
  addMenuEventListeners();
});