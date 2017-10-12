'use strict';

/**
 * App Router
 *
 * @module
 * @author Marcelo Rusconi <mgrusconi@gmail.com>
 */

import { Router } from 'express';
import controller from './app-controller';
const router = new Router();

/**
 * @swagger
 * /api/merge/{file1}/{file2}:
 *   get:
 *     tags:
 *       - API v1
 *     summary: Unir Archivos
 *     description: Método que permite unir 2 archivos sin repetir contenido entre si.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: file1
 *         in: path
 *         description: Nombre del archivo a Unir
 *         required: true
 *         type: string
 *         default: file_1
 *       - name: file2
 *         in: path
 *         description: Nombre del archivo a Base
 *         required: true
 *         type: string
 *         default: file_2
 *       - name: x-key
 *         in: header
 *         description: API key
 *         required: true
 *         type: string
 *         format: string
 *         default: 2fvTdG53VCp6z8ZbV66h
 *     responses:
 *       200:
 *         description: {"text_file": "Resultado del merge entre archivos"}
 *         schema:
 *           $ref: ''
 */

router.route('/merge/:file1/:file2').get((...args) => controller.merge(...args));

module.exports = router;