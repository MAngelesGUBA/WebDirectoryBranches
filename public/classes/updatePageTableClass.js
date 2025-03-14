class UpdatePageTable {
  constructor(data, renderFunction) {
    this.data = data;
    this.currentPage = 1;
    this.itemsPerPage = 15;
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.renderFunction = renderFunction;

    // Añadir event listeners una sola vez en el constructor
    document.getElementById('btnBack').addEventListener('click', () => this.backPage());
    document.getElementById('btnNext').addEventListener('click', () => this.nextPage());
    
    // Mostrar la primera página al inicio
    this.renderTable();
    //State de los botones;
    this.updateButtonStates();
  }

  backPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTable();
      this.updateButtonStates();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderTable();
      this.updateButtonStates();
    }
  }
  
  // Método separado para actualizar el estado de los botones
  updateButtonStates() {
    const backButton = document.getElementById('btnBack');
    const nextButton = document.getElementById('btnNext');
    
    // Habilitar/deshabilitar el botón "atrás" según la página actual
    if (this.currentPage <= 1) {
      backButton.setAttribute('disabled', 'disabled');
    } else {
      backButton.removeAttribute('disabled');
    }
    
    // Habilitar/deshabilitar el botón "siguiente" según la página actual
    if (this.currentPage >= this.totalPages) {
      nextButton.setAttribute('disabled', 'disabled');
    } else {
      nextButton.removeAttribute('disabled');
    }
  }

  renderTable() {
    // Cálculos para obtener los elementos de la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.data.length);
    const currentPageData = this.data.slice(startIndex, endIndex);

    // Obtener el elemento de la tabla donde se insertarán las filas
    const tableBody = document.getElementById('bodyExtensions');
    // Generar HTML para cada elemento y añadirlo a la tabla
    tableBody.innerHTML = this.renderFunction(currentPageData);
    
    // Actualizar indicador de página
    document.getElementById('pageIndicator').textContent = `Página ${this.currentPage} de ${this.totalPages}`;
  }
}