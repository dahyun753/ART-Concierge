const { Router } = require('express');
const { Category } = require('../../db/index');
const router = Router();

router.post('/', async(req, res, next) => {
    try{
        const { category } = req.body;

        const newcategory = await Category.create({ category });
        res.status(200).json(newcategory);
    } catch (err){
        res.json(err);
    };
})

router.get('/', async(req, res, next) => {
    try{
        const categories = await Category.find({});
        res.json(categories);
    } catch (err) {
        res.json(err)
    }
});

router.get('/:categoryId', async(req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Exhibit.findOne({_id : categoryId});
        res.json(category);
    }   catch (err) {
        res.json(err)
    }
});

router.put('/:categoryId', async(req, res, next) => {
    try{
        const { categoryId } = req.params;
        const { category } = req.body;

        const newcategory = await Category.updateOne({_id : categoryId},{ category });
        res.send('OK');
    } catch (err) {
        res.json(err)
    }
});

router.delete('/:categoryId', async(req, res, next) => {
    try{
        const { categoryId } = req.params;
        await Category.deleteOne({ _id : categoryId  });
    
        res.send('OK');
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;