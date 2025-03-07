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
  
  static successMessage(message){
    return Swal.fire({
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

  static confirmationMessage(accion){
    const result = Swal.fire({
      title: `Esta seguro de ${accion} este registro?`,
      showDenyButton:true,
      confirmButtonText: accion,
      focusDeny:true
    });
    return result.isConfirmed;
  }
}

