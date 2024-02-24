const { Router } = require('express');
const { Exhibit } = require('../db/index');
const router = Router();

// router.get('/', async(res, req, next) => {

// });

router.post('/', async(req, res, next) => {
   try{
        const {exhibitName, exhibitAddress, price} = req.body;
        const newExhibit = await Exhibit.create({
            exhibitName, exhibitAddress, price
    })
        res.json(newExhibit);
   } catch (err){
        res.json(err);
   }
})

router.get('/', async(req, res, next) => {
    const exhibits = await Exhibit.find({});
    res.json(exhibits);
});

router.get('/:exhibitId', async(req, res, next) => {
    const { exhibitId } = req.params;
    const exhibits = await Exhibit.findOne({exhibitId});
    res.json(exhibits);
});

router.put('/:exhibitId', async(req, res, next) => {
    const { exhibitId } = req.params;
    const {exhibitName, exhibitAddress, price} = req.body;

    const exhibit = await Exhibit.updateOne({exhibitId},{
        exhibitName, exhibitAddress, price
    });
    res.send('OK');
    // res.json(exhibit); updateOne 결과값이 변경 내용이 아니라 딴게 나오는 이유?
});

router.delete('/:exhibitId', async(req, res, next) => {
    try{
        const { exhibitId } = req.params;
        await Exhibit.deleteOne({exhibitId });
    
        res.send('OK');
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
})

module.exports = router;