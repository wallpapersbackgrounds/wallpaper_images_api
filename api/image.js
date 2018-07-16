var img = require('../models/image.js');

exports.getAll = function (req, res) {
  img
  .find({}).select('imgUrl appName -_id')
  .exec(function (error, images) {
    if (error) {
      res
      .status(500)
      .send({message: error});
    } else {
      res
      .status(200)
      .send(images);
    }
  })
}

exports.add = function (req, res) {
  if (req.body.appName == undefined || req.body.imgUrl == undefined) {
    res
    .status(404)
    .send({message: 'one or more perameters missing'});
  } else {
    var arr = JSON.parse(req.body.imgUrl);
    var promiseArray = [];
    img.findOne({appName: req.body.appName}).exec(function(error,final){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(final){
          img.remove({appName: req.body.appName}).then(function(comp){
            arr.forEach(function (element) {
              promiseArray.push(new Promise(function (resolve, reject) {
                new img({appName: req.body.appName, imgUrl: element})
                .save(function (err, user) {
                  if (err) {
                    reject({message: 'image URL already exists'})
                  } else {
                    resolve(user);
                  }
                });

              }))
            });
            Promise.all(promiseArray)
            .then(function(result){
              res.send(result);
            })
            .catch(err=> res.status(500).send({err:err}));
          })
        //  res.status(403).send({message:"Appname already exists please use update existing call to add more URLs."});
        }else{
          arr.forEach(function (element) {
            promiseArray.push(new Promise(function (resolve, reject) {
              new img({appName: req.body.appName, imgUrl: element})
              .save(function (err, user) {
                if (err) {
                  reject({message: 'image URL already exists'})
                } else {
                  resolve(user);
                }
              });

            }))
          });
          Promise.all(promiseArray)
          .then(function(result){
            res.send(result);
          })
          .catch(err=> res.status(500).send({err:err}));
        }
      }
    })
  }
}

exports.getAppNames = function(req,res){
  img.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      if (result.length > 0) {
        var imgResult = [];
        for (var i = 0; i < result.length; i++) {
          imgResult.push(result[i]);
        }
        var seenNames = {};
        imgResult = result.filter(function (currentObject) {

          if (currentObject.appName in seenNames) {
            return false;
          } else {

            seenNames[currentObject.appName] = true;
            return true;
          }
        });
        console.log("result : ",imgResult);
        res.status(200).send({result:imgResult});

      }
    }
  })
}

exports.getAppImages = function (req, res) {
  img
  .find({'appName': req.params.appName}).select('imgUrl appName -_id')
  .exec(function (error, images) {
    if (error) {
      res
      .status(500)
      .send({message: error});
    } else {
      if (images.length == 0) {
        res
        .status(200)
        .send({message: 'app images not fount'});
      } else {
        res
        .status(200)
        .send(images);
      }
    }
  })
}

exports.update = function(req,res){
  if (req.body.appName == undefined || req.body.imgUrl == undefined) {
    res
    .status(404)
    .send({message: 'one or more perameters missing'});
  } else {
    img.remove({appName: req.body.appName}).then(function(result){
      var arr = JSON.parse(req.body.imgUrl);
      var promiseArray = [];
      arr.forEach(function (element) {
        promiseArray.push(new Promise(function (resolve, reject) {
          new img({appName: req.body.appName, imgUrl: element})
          .save(function (err, user) {
            if (err) {
              reject({message: 'image URL already exists'})
            } else {
              resolve(user);
            }
          });

        }))
      });

      Promise.all(promiseArray)
      .then(function(result){
        res.send(result);
      })
      .catch(err=> res.status(500).send({err:err}));
    })
  }
}


exports.addToExisting = function(req,res){
  img.findOne({appName: req.body.appName}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      if(result){


           var arr = JSON.parse(req.body.imgUrl);
//           console.log(arr)
  var count = 0;
  var test = [];
          arr.forEach(function(i,idx,x){
            test.push(i);
            console.log("1");
            count = count+1;

            if(idx==x.length-1){

            }
          })



      }else{
        res.status(403).send({message:"App name not found"});
      }
    }
  })
}
