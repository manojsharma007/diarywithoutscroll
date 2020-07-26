import Vue from 'vue'
import Router from 'vue-router'
import diarylist from '../views/diary-list.vue'
import addjournal from '../views/add-journal.vue'
import viewjournal from '../views/veiw-journal.vue'
import login from '../views/login.vue'
Vue.use(Router)
// This will remove the warning for router
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
const router = new Router({
  mode: 'history',
  base: "",
  routes: [
      {
        path: '*',
        name: 'login',
        component: login
    },  
   
    {
      path: '/diarylist',
      name: 'diarylist',
      component: diarylist,
      meta: {requiresAuth: true}
    },
    {
      path: '/viewjournal/:id',
      name: 'viewjournal',
      component: viewjournal,
      meta: {requiresAuth: true}
    },
    {
      path: '/addjournal',
      name: 'addjournal',
      component: addjournal,
      meta: {requiresAuth: true}
    }
  ]
})
router.beforeEach( (to,from,next)=>{
  // Allow finishing callback url for logging in
  if(to.matched.some(record=>record.path == "/login")){
   //console.log("router.beforeEach found /login url");
   //Store.dispatch('auth0HandleAuthentication');
   next(false);
 }
 
  // check if user is logged in (start assuming the user is not logged in = false)
  let routerAuthCheck = false; 
  // Verify all the proper access variables are present for proper authorization
  if( localStorage.getItem('userDetails') ){
   // console.log('found local storage tokens');
    // set localAuthTokenCheck true if unexpired / false if expired
    routerAuthCheck = true; 
    
  }
 
  //Store.commit('setUser', userDetails); 
   // check if the route to be accessed requires authorizaton
   if (to.matched.some(record => record.meta.requiresAuth)) {
     // Check if user is Authenticated
     if(routerAuthCheck){
       // user is Authenticated - allow access
       next();
     }
     else{
       // user is not authenticated - redirect to login
       router.push('/login');
     }
     
   }
   // Allow page to load 
   else{
     next();
   }
 });
export default router
