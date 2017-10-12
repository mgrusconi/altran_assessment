// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

/**
 * Librerias utilizadas que no estan en el package.js:  
 *   @types/supertest
 *   mocha-typescript
 */

import * as supertest from 'supertest';
import * as express from 'express';
import { assert } from "chai";

const app = express();
const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Merge Test', ()=>{

  let messages = {
    'created': 'New file "file_2_file_1.md" has been created',
    'not_found': 'not Found',
    'text': 'Hola yo soy el fichero 2\nA ver si puedo explicar que soy\nHola yo soy el fichero 1'
  };

  it('Error - merge file1 not found', (done) => {   
    request(app)
      .get('/api/merge/error1/file_2')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h'})
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.string(messages.not_found);
        done();
      });
  });

  it('Error - merge file2 not found', (done) => {   
    request(app)
      .get('/api/merge/file_1/error2')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h'})
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.string(messages.not_found);
        done();
      });
  });

  it('Successful - Merge - Property', (done) => {   
    request(app)
      .get('/api/merge/file_1/file_2')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Successful - Merge - Message', (done) => {   
    request(app)
      .get('/api/merge/file_1/file_2')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.equal(messages.created);
        done();
      });
  });

  it('Successful - Merge - Text', (done) => {   
    request(app)
      .get('/api/merge/file_1/file_2')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.text_file.should.equal(messages.text);
        done();
      });
  });
  
});