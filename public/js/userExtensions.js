const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const sucursal = params.get('sucursal');

    const formData = new FormData(event.target); 
    const dataPlain = Object.fromEntries(formData.entries());
    const dataJson = JSON.stringify(dataPlain); //transforma a formato a json 
    console.log(dataJson);
    const url = `/v1/admin/getBranchExtension/${encodeURIComponent(sucursal)}?${new URLSearchParams(dataPlain)}`;
      const { data } = await fetchData(url);
      console.log(data);
      document.getElementById('extensionList').innerHTML = data.map(extension => `
        <tr>
          <td data-title='Nombre'>${extension.employeeName}</td>
          <td data-title='Área'>${extension.area.areaName}</td>
          <td data-title='Área'>${extension.position}</td>
          <td data-title='Extensión'>${extension.extension}</td>
        </tr>
      `).join('');
  });
  
});