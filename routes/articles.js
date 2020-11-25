
const express = require('express');
const auth = require('../middlewares/authMiddleware')

const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, './images/articles/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({storage: storage});
const {
    getArticles, 
    getArticle, 
    postArticle, 
    updateArticle, 
    deleteArticle
} = require('../controler/article');

router.post('/',auth, upload.single('imageURL'),postArticle);
router.get('/', getArticles);
router.get('/:id', getArticle);
router.put('/:id',auth, updateArticle);
router.delete('/:id',auth, deleteArticle);

module.exports = router;