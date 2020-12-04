
const mongoose = require('mongoose')
const Article = require('../models/article')
const User = require('../models/user')
const fs = require('fs')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp)
let user = {username:'CYIMANA-JR', email:'cyimanafaisal@gmail.com', password: '1234pass'}
let token = ''

describe('# USER MANAGMENT TESTING BLOCK', () => {
    before(() => {
        // Article.deleteOne({email: user.email}, (err) => {
        //    done();
        User.deleteOne({"email": user.email}).then(()=>{

        }).catch((error) =>{
            console.log(error.message)
        })
    });
    /*
    * Test the CREATING user
    */
    it('It should create a user', (done) => {
        chai.request(server)
        .post('/api/user/signup')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('message').eql('User created')
            done()
        })
    })
    
    // There is a user with the same email

    it('It should not create a user with the same email', (done) => {
        chai.request(server)
        .post('/api/user/signup')
        .send(user)
        .end((err, res) => {
            res.should.have.status(409)
            res.body.should.have.property('message').eql('User with this email exist')
            done()
        })
    })
    /*
    * Test the LOGIN user
    */
    it('It should LOGIN a user', (done) => {
        chai.request(server)
        .get('/api/user/signin')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
            res.body.should.have.property('token')
            token = res.body.token
            done()
        })
    })
    // DONT LOGIN THE USER

    it('It should NOT LOGIN a user', (done) => {
        chai.request(server)
        .get('/api/user/signin')
        .send({email:"cyimanafaisal@gmail.com", password: "password123"})
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("Email and password are incorrect")
            done();
        })
    })
    
})

describe('# ARTICLE TESTING BLOCK', () => {
    let article = new Article({ title: "The Testing is better when is comes to making data integrity sure", content: "J.R.R. Tolkin" });
    let id = ''
    /*
    * Test the /POST aticles route
    */

   it('it should POST an Article ', (done) => {
        chai.request(server)
        .post('/api/articles')
        .set("Authorization", `Bearer ${token}`)
        .set('content-type', 'multipart/form-data')
        .field('title', 'cyimana testing')
        .field('content', 'this book might be amazing at the moment')
        .attach('imageURL', fs.readFileSync(`${__dirname}/DSC_0018.JPG`), 'test/DSC_0018.JPG')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Article creatred successfully');
                id = res.body.articleID
            done();
        });
    });


    // dont post article
    // it('it should not POST an Article ', (done) => {
    //     chai.request(server)
    //     .post('/api/articles')
    //     .set("Authorization", `Bearer ${token}`)
    //     .set('content-type', 'multipart/form-data')
    //     .field('content', 'this book might be amazing at the moment')
    //     .attach('imageURL', fs.readFileSync(`${__dirname}/DSC_0018.JPG`), 'test/DSC_0018.JPG')
    //     .end((err, res) => {
    //         res.should.have.status(400);
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('error')
    //         done();
    //     });
    // });
    /*
    * Test the /POST aticles route
    */
    it('it should UPDATE an article given the id', (done) => {        
        chai.request(server)
        .put('/api/articles/' + id)
        .set("Authorization", `Bearer ${token}`)
        .send({title: "Updated version", content: "this is the most updated version of the time", created_at: `${Date.parse(new Date)}`})
        .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('The article was updated successfully')
            done();
        });
    });

    /*
    * Test the /GET aticles route
    */
    it('It should GET all the articles', (done) => {
        chai.request(server)
            .get('/api/articles')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            })
    })

    /*
    * Test the /GET aticle by ID route
    */
    it('It should GET an article by a given id', (done) => {
        chai.request(server)
        .get('/api/articles/' + id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('content');
            res.body.should.have.property('_id').eql(id);
        done();
        });
    })
    /*
    * Test the /DELETE aticle by ID route
    */
   it('It should DELETE an article by a given id', (done) => {
        chai.request(server)
        .delete('/api/articles/' + id)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Article deleted successfully.');
        done();
        });
    })

})


module.exports = token