const express = require('express');
const router = express.Router();
const extensionController = require('../../controllers/user/extensionController');

//Renderiza la vista de busqueda por sucursal
router.get('/branchExtensions', async (req, res) => {
  res.render('pages/users/userExtensions', {
    title: 'Consulta de Extensiones',
    viewName: 'viewUserExtensions'
  });
});

/**
 * @openapi
 * /v1/user/getAllExtensions:
 *   get:
 *     summary: Obtiene todas las extensiones
 *     description: Obtiene todas las extensiones con opción de filtrado
 *     tags:
 *       - Extensions
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar extensiones
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de extensiones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       branch:
 *                         type: integer
 *                         description: Número de sucursal
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: Correo electrónico del empleado
 *                       employee:
 *                         type: string
 *                         description: Nombre del empleado
 *                       area:
 *                         type: integer
 *                         description: Número del área
 *                       position:
 *                         type: string
 *                         description: Puesto del empleado
 *                       extension:
 *                         type: integer
 *                         description: Número de extensión
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Datos inválidos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.get('/getAllExtensions', extensionController.getAllBranchExtension);

/**
 * @openapi
 * /v1/user/getBranchExtension/{sucursal}:
 *   get:
 *     summary: Obtiene extensiones por sucursal
 *     description: Obtiene las extensiones de una sucursal en particular
 *     tags:
 *       - Extensions
 *     parameters:
 *       - in: path
 *         name: sucursal
 *         schema:
 *           type: string
 *         description: Nombre de la sucursal
 *         required: true
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar extensiones
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de extensiones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       branch:
 *                         type: integer
 *                         description: Número de sucursal
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: Correo electrónico del empleado
 *                       employee:
 *                         type: string
 *                         description: Nombre del empleado
 *                       area:
 *                         type: integer
 *                         description: Número del área
 *                       position:
 *                         type: string
 *                         description: Puesto del empleado
 *                       extension:
 *                         type: integer
 *                         description: Número de extensión
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Datos inválidos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.get('/getBranchExtension/:sucursal',extensionController.getBranchExtension);

module.exports = router;