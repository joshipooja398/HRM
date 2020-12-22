const router = require('express').Router();
const { validate } = require('express-validation');

const { all } = require('../../validations/document');
const { show, create, update, destroy, isExists } = require('../../validations/document');
const { isAuth } = require('../../middlewares/authentication');

/**
 * Controllers
 */
const DOCUMENT = require('../../controllers/document');

router.get("/",(req,res)=>{
    res.send("hi");
})

// var Storage=multer.diskStorage({
//     destination:"./public/uploads/",
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//     }
// });

// var upload=multer({
//     storage:Storage
// }).single('file');

//router.get('/', DOCUMENT.all);
//router.get('/:id',isAuth(['admin', 'user']), validate(show), DOCUMENT.show);
router.post('/',/*upload, isAuth(['admin', 'user']),*/ validate(create), DOCUMENT.store);
//router.put('/:id', isAuth(['admin', 'user']), validate(update),DOCUMENT.update);
//router.delete('/:id', isAuth(['admin', 'user']), validate(destroy),DOCUMENT.destroy);
//router.get('/:id/comments', validate(all), COMMENT.all);
module.exports = router;