import 'chai/register-should';
import request from 'supertest';
import app from '../server/middlewares/express';

describe('Merge Test', ()=>{

  let messages = {
    'created': 'New file "fichero2_fichero1.md" has been created',
    'api_key': 'Invalid API Key',
    'not_found': 'not Found',
    'text': 'Hola yo soy el fichero 1\nA ver si puedo explicar que soy\nHola yo soy el fichero 2'
  };

  it('Error - API KEY', (done) => {   
    request(app)
      .get('/api/merge?file=fichero1&extend=fichero2')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66'})
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.string(messages.api_key);
        done();
      });
  });

  it('Error - merge file1 not found', (done) => {   
    request(app)
      .get('/api/merge?file=error1&extend=fichero2')
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
      .get('/api/merge?file=fichero1&extend=error2')
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
      .get('/api/merge?file=fichero1&extend=fichero2')
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
      .get('/api/merge?file=fichero1&extend=fichero2')
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
      .get('/api/merge?file=fichero1&extend=fichero2')
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