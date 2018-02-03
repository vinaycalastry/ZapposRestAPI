var apiController = require('../controller/apiController.js');

module.exports = function(app){
    /* Base Route for API */
    app.route('/').get(apiController.root);

    /*Routes for Restaurant*/    
    app.get('/restaurant/:ID', apiController.getRestaurant);
    app.post('/restaurant',  apiController.addRestaurant);
    app.delete('/restaurant/:ID', apiController.deleteRestaurant);

    /* Routes for Menus */
    app.get('/menu/:ID', apiController.getMenu);
    app.post('/menu',  apiController.addMenu);
    app.delete('/menu/:ID', apiController.deleteMenu);

     /* Routes for MenuItems */
     app.get('/menuItem/:ID', apiController.getMenuItem);
     app.post('/menuItem',  apiController.addMenuItem);
     app.delete('/menuItem/:ID', apiController.deleteMenuItem);

}