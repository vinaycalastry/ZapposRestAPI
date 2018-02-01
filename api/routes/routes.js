var apiController = require('../controller/apiController.js');

module.exports = function(app){
    /* Base Route for API */
    app.route('/').get(apiController.root);

    /*Routes for Restaurant*/    
    app.get('/restaurant/:ID', apiController.getRestaurant);
    app.post('/restaurant',  apiController.addRestaurant);
    app.delete('/restaurant/:ID', apiController.deleteRestaurant);

    /* Routes for Menus */
    app.route('/menu/:ID')
    .get()
    .post()
    .delete();

     /* Routes for MenuItems */
    app.route('/menuitem/:ID')
    .get()
    .post()
    .delete();

}