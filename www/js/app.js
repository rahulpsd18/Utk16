// (function() {
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var app = angular.module('app', ['ionic','ngCordova']);


app.directive('browseTo', function ($ionicGesture) {
 return {
  restrict: 'A',
  link: function ($scope, $element, $attrs) {
   var handleTap = function (e) {
    // todo: capture Google Analytics here
    var inAppBrowser = window.open(encodeURI($attrs.browseTo), '_system');
   };
   var tapGesture = $ionicGesture.on('tap', handleTap, $element);
   $scope.$on('$destroy', function () {
    // Clean up - unbind drag gesture handler
    $ionicGesture.off(tapGesture, 'tap', handleTap);
   });
  }
 }
});
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('home', {
    url: '/home',
    views: {
      'tab-home':{
        templateUrl: 'templates/home.html'
      }
    }
  });

  $stateProvider.state('cultural', {
    url: '/cultural',
    views: {
      'tab-home':{
        templateUrl: 'templates/cultural.html'
      }
    }
  });

  $stateProvider.state('technical', {
    url: '/technical',
    views: {
      'tab-home':{
        templateUrl: 'templates/technical.html'
      }
    }
  });

  $stateProvider.state('literary', {
    url: '/literary',
    views: {
      'tab-home':{
        templateUrl: 'templates/literary.html'
      }
    }
  });


  $stateProvider.state('finearts', {
      url: '/finearts',
      views: {
        'tab-home':{
          templateUrl: 'templates/finearts.html'
        }
      }
    });

    $stateProvider.state('informal', {
      url: '/informal',
      views: {
        'tab-home':{
          templateUrl: 'templates/informal.html'
        }
      }
    });

      $stateProvider.state('sports', {
          url: '/sports',
          views: {
            'tab-home':{
              templateUrl: 'templates/sports.html'
            }
          }

        });


 $stateProvider.state('announcement', {
          url: '/announcement',
          views: {
            'tab-home':{
              templateUrl: 'templates/announcement.html'
            }
          }
        });


  $stateProvider.state('developer', {
    url: '/developer',
    views: {
      'tab-home':{
        templateUrl: 'templates/developer.html'
      }
    }
  });

  $stateProvider.state('team', {
    url: '/team',
    views: {
      'tab-home':{
        templateUrl: 'templates/team.html'
      }
    }
  });

  $stateProvider.state('livefeed', {
    url: '/livefeed',
    views: {
      'tab-home':{
        templateUrl: 'templates/livefeed.html'
      }
    }
  });

    $stateProvider.state('about', {
      url: '/about',
      views: {
        'tab-home':{
          templateUrl: 'templates/about.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/home');
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('app2', function($scope, $ionicPopup,$http) {
  $scope.data = [];

   $scope.showAlert = function(name,post,img,phone,email) {

      var alertPopup = $ionicPopup.alert({
         title: "<u>"+name+"</u>",
         template: "<center><img src='"+img+"' style='height:50%; width:50%'><br/><a href='tel:"+phone+"'>"+phone+"</a><br/><a href='mailto:"+email+"'>"+email+"</center>",
         subTitle: post
      });

      alertPopup.then(function(res) {
         console.log('Thanks');
      });
   };

   $scope.showInfo = function(pevent,event) {

  var ev = $scope.data[pevent]['events'][event];
      var alertPopup = $ionicPopup.alert({
         title: "<u>"+ev['menu'][0]['title']+"</u>",
         template: ""+ev['menu'][0]['content'].replaceAll("\n","<br/>")+"",
         subTitle:ev['title']
      });
   };
   
   $scope.init = function(name){
    
     $http.get('js/data/'+name+'.json').success(function(response){ 
      $scope.data = response;
    });
   }
});

//NEW CODE FROM HERE

app.controller("shareCtrl", function($scope, $cordovaSocialSharing) {
    $scope.OtherShare=function(){
     window.plugins.socialsharing.share('Check out this cool app I\'m using called Utkarsh\'16 for ' + device.platform, null, null, '. Link:---');
  }
});

app.controller("announcementCtrl", function($scope,$http) {
  $scope.data = {};
    $http.get('js/feeds.json').success(function(response){ 
      $scope.data = response;
    });
});


app.controller("ExampleController", function($scope, $ionicSlideBoxDelegate) {
    $scope.navSlide = function(index) {
        $ionicSlideBoxDelegate.slide(index, 500);
    }
});


// app.run(function($ionicPlatform, $ionicPopup) {
//   // Disable BACK button on home
//   $ionicPlatform.registerBackButtonAction(function(event) {
//     if (true) { // your check here
//       $ionicPopup.confirm({
//         title: 'Exit warning',
//         template: 'Are you sure you want to exit?'
//       }).then(function(res) {
//         if (res) {
//           ionic.Platform.exitApp();
//         }
//       })
//     }
//   }, 100);
// });
app.run(function($ionicPlatform, $ionicPopup) {
$ionicPlatform.registerBackButtonAction(function (event) {
                    event.preventDefault();
            }, 100);
});
// app.controller('GalleryCtrl', function($scope, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
//
//   $scope.allImages = [{
//     src: 'img/bg1.jpg'
//   }, {
//     src: 'img/bg2.jpg'
//   }, {
//     src: 'img/bg3.jpg'
//   }, {
//     src: 'img/bg4.jpg'
//   }, {
//     src: 'img/bg5.jpg'
//   }];
//
//   $scope.zoomMin = 1;
//
//
//
//   $scope.showImages = function(index) {
//   $scope.activeSlide = index;
//   $scope.showModal('templates/gallery-zoomview.html');
// };
//
// $scope.showModal = function(templateUrl) {
//   $ionicModal.fromTemplateUrl(templateUrl, {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//     $scope.modal.show();
//   });
// }
//
// $scope.closeModal = function() {
//   $scope.modal.hide();
//   $scope.modal.remove()
// };
//
// $scope.updateSlideStatus = function(slide) {
//   var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
//   if (zoomFactor == $scope.zoomMin) {
//     $ionicSlideBoxDelegate.enableSlide(true);
//   } else {
//     $ionicSlideBoxDelegate.enableSlide(false);
//   }
// };
//
// });

// }());
