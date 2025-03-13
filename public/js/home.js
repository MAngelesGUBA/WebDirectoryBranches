document.addEventListener('DOMContentLoaded',()=>{

  //Redireccion a las sucursales ------------------------------
  const colima = document.getElementById('branchColima');
  colima.addEventListener('click',()=>{
    window.location.href='/v1/user/viewExtension?sucursal=Colima';
  });
  const manzanillo = document.getElementById('branchManzanillo');
  manzanillo.addEventListener('click',()=>{
    window.location.href='/v1/user/viewExtension?sucursal=Manzanillo';
  });
  const tecoman = document.getElementById('branchTecoman');
  tecoman.addEventListener('click',()=>{
    window.location.href='/v1/user/viewExtension?sucursal=Tecoman';
  });
  const villa = document.getElementById('branchVilla');
  villa.addEventListener('click',()=>{
    window.location.href='/v1/user/viewExtension?sucursal=Villa';
  });
  const guzman = document.getElementById('branchGuzman');
  guzman.addEventListener('click',()=>{
    window.location.href='/v1/user/viewExtension?sucursal=Guzman';
  });
  const autlan = document.getElementById('branchAutlan');
  autlan.addEventListener('click',()=>{
    window.location.href='/v1/user/viewExtension?sucursal=Autlan';
  });
});