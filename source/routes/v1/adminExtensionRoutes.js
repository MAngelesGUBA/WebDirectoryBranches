//Controlador de extensiones
const express = require('express');
//instancia de router | manejo de endpoints de manera modularizada
const router = express.Router();
//Controlador de extensiones
const extensionController = require('../../controllers/admin/extensionController');
const {requiresAuth} = require('express-openid-connect');

//VISTA DE ADMINISTRADOR ------------------------------------------------------------------------
router.get('/viewAdmin',requiresAuth(),extensionController.viewAdmin);

//ENDPOINTS DE EXTENSIONES ----------------------------------------------------------------------
/**
 * @openapi
 * /v1/admin/getExtension:
 *   get:
 *     summary: Obtiene extensiones
 *     description: Obtiene las extensiones según los parámetros de búsqueda proporcionados
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
router.get('/getExtension',requiresAuth(),extensionController.getExtension);

/**
 * @openapi
 * /v1/admin/insertExtension:
 *   post:
 *     summary: Inserta una nueva extensión
 *     description: Crea un nuevo registro de extensión con la información proporcionada
 *     tags:
 *       - Extensions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch
 *               - email
 *               - employee
 *               - area
 *               - position
 *               - extension
 *             properties:
 *               branch:
 *                 type: integer
 *                 description: Número de sucursal
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del empleado
 *               employee:
 *                 type: string
 *                 description: Nombre del empleado
 *               area:
 *                 type: integer
 *                 description: Número del área
 *               position:
 *                 type: string
 *                 description: Puesto del empleado
 *               extension:
 *                 type: integer
 *                 description: Número de extensión
 *     responses:
 *       200:
 *         description: Extensión creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Extensión creada correctamente"
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
router.post('/insertExtension',requiresAuth(),extensionController.insertExtension);

/**
 * @openapi
 * /v1/admin/updateExtension/{id}:
 *   patch:
 *     summary: Actualiza una extensión existente
 *     description: Actualiza un registro de extensión existente con la información proporcionada
 *     tags:
 *       - Extensions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la extensión a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch
 *               - email
 *               - employee
 *               - area
 *               - position
 *               - extension
 *             properties:
 *               branch:
 *                 type: integer
 *                 description: Número de sucursal
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del empleado
 *               employee:
 *                 type: string
 *                 description: Nombre del empleado
 *               area:
 *                 type: integer
 *                 description: Número del área
 *               position:
 *                 type: string
 *                 description: Puesto del empleado
 *               extension:
 *                 type: integer
 *                 description: Número de extensión
 *     responses:
 *       200:
 *         description: Extensión actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Extensión actualizada correctamente"
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
router.patch('/updateExtension/:id', requiresAuth(),extensionController.updateExtension);

/**
 * @openapi
 * /v1/admin/deleteExtension/{id}:
 *   delete:
 *     summary: Elimina una extensión existente
 *     description: Elimina un registro de extensión existente según el ID proporcionado
 *     tags:
 *       - Extensions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la extensión a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Extensión eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Extensión eliminada correctamente"
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
router.delete('/deleteExtension/:id', requiresAuth(),extensionController.deleteExtension);

//ENDPOINTS DE AREAS ----------------------------------------------------
/**
 * @openapi
 * /v1/admin/getArea:
 *   get:
 *     summary: Obtiene todas las áreas
 *     description: Obtiene un listado completo de las áreas disponibles
 *     tags:
 *       - Areas
 *     responses:
 *       200:
 *         description: Lista de áreas obtenida exitosamente
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
 *                       id:
 *                         type: integer
 *                         description: ID del área
 *                       name:
 *                         type: string
 *                         description: Nombre del área
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
router.get('/getArea',requiresAuth(),extensionController.getArea);

//ENDPOINTS DE SUCURSALES -----------------------------------------------

/**
 * @openapi
 * /v1/admin/getBranch:
 *   get:
 *     summary: Obtiene todas las sucursales
 *     description: Obtiene un listado completo de las sucursales disponibles
 *     tags:
 *       - Branches
 *     responses:
 *       200:
 *         description: Lista de sucursales obtenida exitosamente
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
 *                       id:
 *                         type: integer
 *                         description: ID de la sucursal
 *                       name:
 *                         type: string
 *                         description: Nombre de la sucursal
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

router.get('/getBranch',requiresAuth(),extensionController.getBranch);

module.exports = router;
