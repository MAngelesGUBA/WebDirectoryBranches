class Message{
  static waitingMessage(title='',html=''){
    return Swal.fire({
      title: title,
      html: html,
      allowOutsideClick: false, // Evita que el usuario lo cierre antes de tiempo
      didOpen: () => {
        Swal.showLoading();
      }
    });
  };
  
  static async successMessage(message){
    return await Swal.fire({
      icon:"success",
      title: "Operación exitosa",
      text: message
    });
  }

  static alertMessage(error){
    return Swal.fire({
      icon: "warning",
      title: "OOPS!",
      text: error,
    });
  };

  static errorMessage(error){
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: error
    });
  };

  static async confirmationMessage(accion) {
    const result = await Swal.fire({
        title: `¿Está seguro de ${accion} este registro?`,
        showDenyButton: true,
        confirmButtonText: accion,
        denyButtonText: 'Cancelar',
        focusDeny: true
    });
    return result.isConfirmed;
}
}