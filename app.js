
 function remStr(str)
          {  
              st=str;
              while( ( idd=st.indexOf('.') ) != -1) 
              {st=st.slice(0,idd)+st.slice(idd+1,st.length); 
              }
            return st;
          }         
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
var firebaseConfig = {
    apiKey: #########################,
    authDomain: #####################,
    databaseURL: ####################,
    projectId: ######################,
    storageBucket: ##################,
    messagingSenderId: ##############,
    appId: ##########################
  };
     var u,p,store,email;
     var arr=[]; 
     var online=false;
     firebase.initializeApp(firebaseConfig);
      var auth=firebase.auth();  
        
        function signup(){  u=document.getElementById("user").value;
        p=document.getElementById("pass").value;       
         auth.createUserWithEmailAndPassword(u, p).catch(function(error) {
             // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;  
              alert("Error :" + errorMessage);  
                      
});    
         //document.write(x); 
         //console.log(firebase);
         //console.log(person);  
         //var re=firebase.database().ref('per'); 
         //re.push(person);
     }
    function login()
           { u=document.getElementById("user").value;
             p=document.getElementById("pass").value;       
                auth.signInWithEmailAndPassword(u, p).catch(function(error) {
  // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
             // ...
             alert("Error :" + errorMessage);       
});
           } 
             
        
           auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.  
        
    //var displayName = user.displayName;
         email = user.email;
    //var emailVerified = user.emailVerified;
    //var photoURL = user.photoURL;
    //var isAnonymous = user.isAnonymous;
    //var uid = user.uid;
    //var providerData = user.providerData;
    // ...   
         online=true;
         console.log("Online"); 
         document.getElementById("btn").style="display: block";
         //console.log(user); 
         //var un=document.getElementById("un").value;
         foo(email); 
          store=setInterval(function() { foo(email); } , 5000);
  } else {
    // User is signed out.
    // ... 
      console.log("Offline"); 
      document.getElementById("btn").style="display: none"; 
      email=document.getElementById("user").value; 
      
      hoo(email);
  }
});   
            function logout()
           {  
               auth.signOut().then(function() {
               // Sign-out successful.
                }, function(error) {
              // An error happened. 
                   alert("Error :" + errorMessage); 
});              
            }
         var x,y,em;   
           function foo(email)
           {   
                em=email.slice(0, email.indexOf("@"));
               em=remStr(em);
                
              // re.child(em).set({user: un}).then().catch(); 
              getLocation();
                          
              query();
           }
           function hoo(email)
           {   if(email=="") 
               return;
                em=email.slice(0, email.indexOf("@"));
               em=remStr(em);
               var re=firebase.database().ref('person'); 
              // re.child(em).set({user: un}).then().catch();  
               online=false;
               re.child(em).set({id:email,lat:y,lon:x,status:online}).then().catch();           
               clearInterval(store);
           }
         function query()
           { var re=firebase.database().ref('person');
                re.on("value", function(snapshot) {
                getArray(snapshot);   
                       if(arr[0].status == true && arr[1].status == true ) 
                           {
                               var km = distance(arr[0].lat,arr[0].lon,arr[1].lat,arr[1].lon);   
                               var me= km*1000;
                               var cm= me*100;  
                               if(cm!=0)
                               para.innerHTML=" kms ="+km+"<br> metres ="+me+"<br> centimetres"+cm;
                           } 
                        else para.innerHTML="User Offline";
                        arr.splice(0,arr.length);
                }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                });   
           } 
        
           
         function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success function
            showPosition, 
            // Error function
            null, 
            // Options. See MDN for details.
            {
               enableHighAccuracy: true,
               timeout: 5000,
               maximumAge: 0
            });
    } else { 
        para.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x=position.coords.longitude;
    y=position.coords.latitude;  
    var re=firebase.database().ref('person');
    if(em!=null)
    re.child(em).set({id:email,lat:y,lon:x,status:online}).then().catch();
}

function getArray(snapshot) {

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        arr.push(item);
    });
}; 

