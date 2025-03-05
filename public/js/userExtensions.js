// Este archivo puede contener la lógica para manejar interacciones en la página userExtensions

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  // Agrega un evento para manejar la búsqueda
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#no-more-tables tbody tr');

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(query));
      row.style.display = match ? '' : 'none'; // Muestra u oculta la fila según el resultado
    });
  });
});
