const express=require('express');
const router=express.Router();
const Item=require('../models/itemModel');
const fs=require('fs');
const multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname)
    }
    });
const upload = multer({ storage:storage});

router.post('/api/admin/additem', upload.single('item_image'), async (req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        // naujas irasas i database
        const item=new Item({
            name:req.body.name,
            price:req.body.price,
            category:req.body.category,
            imglocation:'/uploads/'+req.file.originalname,
            imgpath:req.file.path
        });
        await item.save();
        res.send({
            _id:item._id,
            message:'New item saved',
            name:item.name,
            price:item.price,
            category:item.category,
            imglocation:item.imglocation,
            imgpath:item.imgpath
        });
    }catch(err){
        console.log(err.message);
        res.send({message:err.message});
    };
});

router.get('/api/admin/getitems', (req,res)=>{
    Item.find((err,items)=>{
        if(err) console.log(err);
        res.send({items});
    });
});

// getitems su promise
//router.get('/api/admin/items',(req,res)=>{
    //Item.find({}).then((items)=>{
        //res.send({items:items});
    //});
//});

// getitems su async
//router.get('/api/admin/items', async (req,res)=>{
    //const items = await Item.find();
    //res.send({items:items});
//});

router.post('/api/admin/remove/item',async (req,res)=>{
    console.log(req.body);
    const item = await Item.findOne({_id:req.body.id});
    console.log(item);
    fs.unlink(item.imgpath, (err) => {
        if (err) throw err;
        console.log(`${item.name} image was deleted`);
    });
    await item.remove();
    res.send({message:"Item has been deleted successfully"});
});

router.post('/api/admin/update/item',async (req,res)=>{
    const item = await Item.findOne({name:req.body.name});
    item.price=req.body.price;
    await item.save();
    console.log(item);
    res.send({message:"Item has been updated successfully"});
});

module.exports = router;