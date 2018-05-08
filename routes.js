const routes = module.exports = require('next-routes')()

routes
.add('index', '/', 'index')
.add( 'profile' ,'/profile', 'profile/profile')
.add( 'main' ,'/main', 'main/main')
.add('main-detail', '/main/:id', 'main/details')
.add( 'course' ,'/courses', 'course/course')
.add( 'module' ,'/courses/:id', 'course/module')
.add( 'submodule' ,'/courses/:id/:submodule_id', 'course/submodule')
// .add( 'problems', '/problems', 'problems/problems')
.add( 'problem-detail', '/problems/:id', 'problems/details');