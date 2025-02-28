//Controlador de extensiones
const express = require('express');
//instancia de router | manejo de endpoints de manera modularizada
const router = express.Router();
//Controlador de extensiones
const extensionController = require('../../controllers/admin/extensionController');

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
 *               - employee
 *               - area
 *               - position
 *               - extension
 *             properties:
 *               branch:
 *                 type: integer
 *                 description: Número de sucursal
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
router.post('/insertExtension',extensionController);

module.exports = router;
