const router = require('express').Router()
const roomCtrl = require('../controllers/roomCtrl')

router.route('/room').
    post(roomCtrl.addRoom)
    // get(roomCtrl.getRoom)



// module.exports = router