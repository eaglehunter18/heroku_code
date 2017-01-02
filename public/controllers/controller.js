//create A module by using the AngularJS function angular.module 
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
//Add a controller to myApp, and refer to the controller with the ng-controller directive in index.htnl
myApp.controller('AppCtrl',['$scope','$http' , function($scope,$http) {
console.log("Hello World from controller.js");


 $scope.searchKeyword = {}
 $scope.SearchTerm = '$';


    var refresh=function(){
    $http.get('/contactlist').then(function successCallback(response){
    console.log("I got the data I requested it is below");
     $scope.contactlist=response.data;
     console.log($scope.contactlist);


    },
       function errorCallback(response) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
       console.log("Error , I did not  got the data I requested from server");
       }
     
    );

    };
    refresh();
    $scope.addContact=function(){
    	//view entered data in console
    	console.log($scope.contact);
    	//send data to contactlist
    	$http.post('/contactlist',$scope.contact).then(
    		//if response success we print data of response
    		function successCallback(response){
    		console.log(response.data);
    		refresh();

    		$scope.contact.name="";
    		$scope.contact.email="";
    		$scope.contact.number="";
    		$scope.contact.fbid="";
    		$scope.contact.fburl="";

    	},
    	//if response failed we print data of error
    	function errorCallback(response) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
       console.log("Error while sending post request to server");
    }
    );//end of http request
};//end of function add

$scope.remove=function(id){
console.log("id of the item we want to delete from controller is "+id);
//$http.delete('/contactlist'+id);
$http.delete('/contactlist/' + id).then(function successCallback(response) {
	console.log("id of the user we want to delete "+id);
    refresh();
  },
  //if response failed we print data of error
    	function errorCallback(response) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
       console.log("Error while sending delete request to server");
    }
  );
};//end of $scope.remove

$scope.edit=function(id){
	//this is 
console.log("id of the user we want to edit "+id);
$http.get('/contactlist/' + id).then(function successCallback(response) {
	//move data of selected user to $scope.contact(input tags)	
$scope.contact=response.data;
console.log("response data "+response.data);
},
function errorCallback(response) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
       console.log("Error while sending get request to server to get data of selected user (select to Edit)");
    }
    );//end of http request
};//end of $scope.edit


//when finish entering new data
$scope.update=function(){
//prints _id of selected user(we moved data of this user to $scope to edit)
	console.log($scope.contact._id);
//send put request to server with new data($scope.contact)
	$http.put('/contactlist/'+$scope.contact._id,$scope.contact).then(function successCallback(response) {
    refresh();
   $scope.contact.name = "";
  $scope.contact.email = "";
  $scope.contact.number = "";
  $scope.contact.fbid = "";
  $scope.contact.fburl = "";
  },
  //if response failed we print data of error
    	function errorCallback(response) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
       console.log("Error while sending put request to server");
    }
  );
};//end of $scope.updat function

$scope.clear = function() {
	 //$scope.contact="";
  $scope.contact.name = "";
  $scope.contact.email = "";
  $scope.contact.number = "";
  $scope.contact.fbid = "";
  $scope.contact.fburl = "";
}
$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
}]);﻿