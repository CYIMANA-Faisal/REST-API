const Message = require('../models/message')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const token = require('./article')
chai.use(chaiHttp)
const message = {
    name:"Sync with Klod",
    subject: "Testing the end point",
    email: "example@gmail.com",
    message: "Hopefully, this will work as well"
}
let messageID = ''
describe('MESSAGE ENDPOINTS TESTING', () => {
    // POSTING A COMMENT
    it('It should post a message', (done) => {
        chai.request(server)
        .post('/api/message')
        .send(message)
        .end((error, res) => {
            res.should.have.status(200)
            res.body.should.have.property('sent').eql('your query is sent')
            messageID = res.body.message._id
            console.log(messageID);
            done()
        })
    })
    // NOT POST THE MESSAGE
    it('It should NOT post a message', (done) => {
        chai.request(server)
        .post('/api/message')
        .send({})
        .end((error, res) => {
            res.should.have.status(500)
            res.body.should.have.property('error')
            done()
        })
    })
    // GET MESSAGES
    it('It GET messages', (done) => {
        chai.request(server)
        .get("/api/message")
        .end((error, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    })
    //GET MESSAGE
    it('GET messages by id', (done) => {
        chai.request(server)
        .get("/api/message/" + messageID)
        .end((error, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
        })
    })
    //DELETE MESSAGE
    it('DELETE messages by id', (done) => {
        chai.request(server)
        .delete("/api/message/" + messageID)
        .end((error, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
        })
    })
    after(() => {
        Message.deleteMany({_id: messageID})
                .then(() => {
                    console.log("comments deleted")
                }).catch((error) => {
                    console.log(error.message)
                })
    })
})