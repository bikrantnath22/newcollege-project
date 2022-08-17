const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')

const roomsCategory = require('../controllers/RoomCategory')
// const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')


router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProduct)
    
router.route("/search-listings")   
    .post(productCtrl.searchListings);



router.route('/products/:id')
    .delete(productCtrl.deleteProduct)
    .put(productCtrl.updateProduct)
    

// add room
router.route('/products/room/:products_id').
    post(productCtrl.addRoom)

    router.route('/room/:room_id').
    patch(productCtrl.editRoom)
   

router.route('/room/:id').
get(productCtrl.getRoom)

router.delete('/room/:hotel_id/:room_id', productCtrl.removeRoom);


router.route('/roomCategory/:products_id').
get(roomsCategory.getRoomCategories)

router.route('/products/roomCategory/:products_id').
   get(roomsCategory.getRoomCategories)
   .post(roomsCategory.createRoomCategory)

   router.route('/roomCategory/:room_id').
   patch(roomsCategory.editRoomCategory)



router.delete('/roomCategory/:id', roomsCategory.removeRoomCategory);

router.get('/room/roomCategory/:id', roomsCategory.getRoomCategoryId);
  
router.get('/rooms/:id',productCtrl.getRooms) ; 
   
// router.patch('/products/:id', productCtrl.reviews)
    
    
    
    
    
    


module.exports = router
