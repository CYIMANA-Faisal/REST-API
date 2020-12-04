const Comment = require('../models/comment')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp)
const comment = {articleID: '5fb66a924ed3cf6f53976c00', name:'cyimana', comment: 'cyimana testing'}
describe('COMMENTS ENDPOINTS TESTING', () => {
    // POSTING A COMMENT
    it('It should post a comment', (done) => {
        chai.request(server)
        .post('/api/comment/' + comment.articleID)
        .send(comment)
        .end((error, res) => {
            res.should.have.status(200)
            res.body.should.have.property('message').eql('comment added')
            done()
        })
    })

    // IT SHOULD NOT POST THE COMMENT
    it('It should not post a comment', (done) => {
        chai.request(server)
        .post('/api/comment/' + comment.articleID)
        .send({})
        .end((error, res) => {
            res.should.have.status(500)
            res.body.should.have.property('error')
            done()
        })
    })

    // GET COMMENTS

    it('It should GET the comments', (done) => {
        chai.request(server)
        .get('/api/comment/' + comment.articleID)
        .end((error, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    })

    // IT SHOULD NOT GET THE THE COMMENT

    it('It should not GET the comments', (done) => {
        chai.request(server)
        .get('/api/comment/' + comment.articleID + '/rero')
        .end((error, res) => {
            res.should.have.status(404)
            done()
        })
    })
    after(() => {
        Comment.deleteMany({articleID: comment.articleID})
                .then(() => {
                    console.log("comments deleted")
                }).catch((error) => {
                    console.log(error.message)
                })
    })
})