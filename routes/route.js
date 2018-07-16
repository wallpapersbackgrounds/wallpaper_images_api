var express=require('express');
var router=express.Router();
var path=require('path');
var img=require('../api/image.js');


router.get('/img',img.getAll);
router.post('/img/add',img.add);
router.get('/img/:appName',img.getAppImages);
router.get('/getAppNames',img.getAppNames);
router.post('/img/update',img.update);
router.post('/addToExisting',img.addToExisting);

module.exports=router;
