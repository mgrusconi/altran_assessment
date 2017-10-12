'use strict';


/**
 * AppController
 *
 * NodeJS version ES6
 * @category Assessment
 * 
 * @module
 * @author   Marcelo Rusconi <mgrusconi@gmail.com>
 *
 */

import fs  from 'fs';
import config from '../../../config/';

class AppController{
  
  /**
   * Método que permite unir 2 archivos sin repetir contenido entre si.
   * Method that allows to merge 2 files without repeating content with each other.
   *
   * @param \ req, res
   * @return \Json
   */
  merge(req, res) {
    const file1 = req.params.file1;
    const file2 = req.params.file2;
    const output = file2 + '_' + file1;
    fs.readFile(config.resources.files + file2 + '.md', {encoding: 'utf8'}, (err, data) => {
      if(err) {
        if(err.code == 'ENOENT'){
          return res.status(404).json({
            'message': 'File ' + file2 + ' not Found',
            'err': err
          });
        }else{
          return res.status(500).json({
            'message': 'Internal server error',
            'err': err
          });
        }
      } else {
        let file_2_lines = data.split('\n').slice(0,-1);
        fs.readFile(config.resources.files + file1 + '.md', {encoding: 'utf8'}, (err, data) => {
          if(err) {
            if(err.code == 'ENOENT'){
              return res.status(404).json({
                'message': 'File ' + file1 + ' not Found',
                'err': err
              });
            }else{
              return res.status(500).json({
                'message': 'Internal server error',
                'err': err
              });
            }
          } else {
            let file_1_lines = data.split('\n').slice(0,-1);
            let final_file_lines = file_2_lines.slice();
            for (let i = 0, len = file_1_lines.length; i < len; i++) {
              if(final_file_lines.indexOf(file_1_lines[i]) == -1){
                final_file_lines.push(file_1_lines[i]);
              }
            }
            let text_file = final_file_lines.join('\n');
            fs.writeFile(config.resources.files + output + '.md', text_file, { encoding: 'utf-8' }, (err)=>{
              if(err) {
                return res.status(500).json({
                  'message': 'Internal server error',
                  'err': err
                });
              } else {
                return res.status(200).json({
                  'message': 'New file created',
                  'text_file': text_file
                });
              }
            });
          }
        });
      }
    });
  }
}

module.exports = new AppController;