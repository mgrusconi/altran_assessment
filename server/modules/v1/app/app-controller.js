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
    const file1 = req.query.file;
    const file2 = req.query.extend;
    const output = file2 + '_' + file1;
    
    let file_1_lines = '';
    let file_2_lines = '';
        
    try {
      file_1_lines = this.readFile(file1);
      file_2_lines = this.readFile(file2);
    } catch (err) {
      return res.status(404).json({
        'message': 'File not Found',
        'err': err.toString()
      });
    }

    file_1_lines = file_1_lines.split('\n');
    file_2_lines = file_2_lines.split('\n');
    let final_file_lines = file_1_lines.slice();
    
    for (let i = 0, len = file_2_lines.length; i < len; i++) {
      if(file_1_lines.indexOf(file_2_lines[i]) == -1){
        final_file_lines.push(file_2_lines[i]);
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
          'message': 'New file "' + output + '.md" has been created',
          'text_file': text_file
        });
      }
    });
  }

  readFile(file){
    let fileContents = '';
    try {
      fileContents = fs.readFileSync(config.resources.files + file + '.md');
    } catch (err) {
      throw new Error(err);
    }
    return fileContents.toString();
  }
}

module.exports = new AppController;