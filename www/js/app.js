// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
  'ionic',
  'angularMoment',
  'your_app_name.controllers',
  'your_app_name.directives',
  'your_app_name.filters',
  'your_app_name.services',
  'your_app_name.factories',
  'your_app_name.config',
  'your_app_name.views',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCordova',
  'slugifier',
  'ionic.contrib.ui.tinderCards',
  'youtube-embed'
])

.run(function($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $timeout) {

  $ionicPlatform.on("deviceready", function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PushNotificationsService.register();
  });

  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function(){
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      	console.log("setting transition to android and disabling swipe back");
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('app.patientScreens') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
    }
  });

  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });

})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.walkthrough', {
    url: '/walkthrough',
    templateUrl: "views/auth/walkthrough.html",
    controller: 'LoginCtrl'//added to loggin from walkthrough
  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })

  .state('auth.signup', {
    url: '/signup',
    templateUrl: "views/auth/signup.html",
    controller: 'SignupCtrl'
  })

  .state('auth.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/auth/forgot-password.html",
    controller: 'ForgotPasswordCtrl'
  })
//newly added for Doctor
.state('auth.doctorRegistration', {
  url: "/doctorRegistration",
  templateUrl: "views/auth/doctorRegistration.html",
  controller: 'doctorRegistrationCtrl'
})

.state('auth.doctorRegistration2', {
  url: "/doctorRegistration2",
  templateUrl: "views/auth/doctorRegistration2.html",
  controller: 'doctorRegistration2Ctrl'
})

.state('auth.doctorThankq', {
  url: "/doctorThankq",
  templateUrl: "views/auth/doctorThankq.html",
  controller: 'doctorThankqCtrl'
})


//Patient
.state('auth.patientRegistration1', {
  url: "/patientRegistration1",
  templateUrl: "views/auth/patientRegistration1.html",
  controller: 'patientRegistration1Ctrl'
})

.state('auth.patientRegistration2', {
  url: "/patientRegistration2",
  templateUrl: "views/auth/patientRegistration2.html",
  controller: 'patientRegistration2Ctrl'
})

.state('auth.patientRegistration3', {
  url: "/patientRegistration3",
  templateUrl: "views/auth/patientRegistration3.html",
  controller: 'patientRegistration3Ctrl'
})

.state('auth.confirm', {
  url: "/patientRegistration3",
  templateUrl: "views/auth/patientRegistration3.html",
  controller: 'confirmCtrl'
})


.state('auth.doctorscreens', {
  url: "/doctorscreens",
  templateUrl: "views/auth/doctorscreens.html"

})



  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })
  //MISCELLANEOUS
  .state('app.miscellaneous', {
    url: "/miscellaneous",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/miscellaneous.html"
      }
    }
  })

  .state('app.maps', {
    url: "/miscellaneous/maps",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/maps.html",
        controller: 'MapsCtrl'
      }
    }
  })

  .state('app.image-picker', {
    url: "/miscellaneous/image-picker",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/image-picker.html",
        controller: 'ImagePickerCtrl'
      }
    }
  })


  //LAYOUTS
  .state('app.layouts', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/layouts.html"
      }
    }
  })

  .state('app.tinder-cards', {
    url: "/layouts/tinder-cards",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/tinder-cards.html",
        controller: 'TinderCardsCtrl'
      }
    }
  })

  .state('app.slider', {
    url: "/layouts/slider",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/slider.html"
      }
    }
  })

  //FEEDS searchDoctors
  .state('app.patientScreens', {
    url: "/patientScreens",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/patientScreens.html",
        controller: 'FeedsCategoriesCtrl'
      }
    }
  })





  //WORDPRESS




  //OTHERS



  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html"
      }
    }
  })

  //mydoctors
  .state('app.mydoctors', {
    url: "/mydoctors",
    views: {
      'menuContent': {
        templateUrl: "views/app/mydoctors.html"
      }
    }
  })
//myconsultations
.state('app.myconsultations', {
  url: "/myconsultations",
  views: {
    'menuContent': {
      templateUrl: "views/app/myconsultations.html"
    }
  }
})

.state('app.consultSummary', {
  url: "/consultSummary",
  views: {
    'menuContent': {
      templateUrl: "views/app/consultSummary.html"
    //  controller:'consultSummaryCtrl'
    }
  }
})

//patientPayments
.state('app.patientPayments', {
  url: "/patientPayments",
  views: {
    'menuContent': {
      templateUrl: "views/app/patientPayments.html",
      controller:'patientPayCtrl'
    }
  }
})
//refund
.state('app.patientRefund', {
  url: "/patientRefund",
  views: {
    'menuContent': {
      templateUrl: "views/app/patientRefund.html",
      controller:'patientRefundCtrl'
    }
  }
})
//topup
.state('app.patientTopup', {
  url: "/patientTopup",
  views: {
    'menuContent': {
      templateUrl: "views/app/patientTopup.html",
    //  controller:'patientTopupCtrl'
    }
  }
})
//customercare patient
.state('app.customercare', {
  url: "/customercare",
  views: {
    'menuContent': {
      templateUrl: "views/app/customercare.html"
    }
  }
})
//medicalSpeciality
.state('app.medicalSpeciality', {
  url: "/medicalSpeciality",
  views: {
    'menuContent': {
      templateUrl: "views/app/medicalSpeciality.html"
    }
  }
})

//search
.state('app.searchDoctors', {
  url: "/searchDoctors",
  views: {
    'menuContent': {
      templateUrl: "views/app/searchDoctors.html"
    }
  }
})

//doctor profile
  .state('app.doctorprofile', {
    url: "/doctorprofile",
    views: {
      'menuContent': {
        templateUrl: "views/app/doctorprofile.html",
        controller: 'doctorprofile'


      }
    }
  })

//doctore screens


  .state('app.specialityDetails', {
    url: "/specialityDetails",
    views: {
      'menuContent': {
        templateUrl: "views/app/specialityDetails.html"
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "views/app/bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    }
  })

  .state('templates', {
    url: "/templates",
    abstract: true,
    templateUrl: "views/templates/menu.html",
    controller: 'templatesCtrl'
  })

  .state('templates.doctorscreens', {
    url: "/doctorscreens",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doctorscreens.html",
          controller: 'doctorScreensCtrl'
      }
    }
  })

  .state('templates.doctorprofile', {
    url: "/doctorprofile",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doctorprofile.html"
      }
    }
  })

  .state('templates.doctoraccounts', {
    url: "/doctoraccounts",
    views: {
      'menuContent': {
        templateUrl: "views/templates/doctoraccounts.html"
      }
    }
  })
  .state('templates.consultedpatients', {
    url: "/consultedpatients",
    views: {
      'menuContent': {
        templateUrl: "views/templates/consultedpatients.html"
      }
    }
  })
  .state('templates.patientrequest', {
    url: "/patientrequest",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientrequest.html",
          controller: 'patientrequestCtrl'
      }
    }
  })

  .state('templates.patientchat', {
    url: "/patientchat",
    views: {
      'menuContent': {
        templateUrl: "views/templates/patientchat.html"
      }
    }
  })
  .state('templates.customercare', {
    url: "/customercare",
    views: {
      'menuContent': {
        templateUrl: "views/templates/customercare.html"
      }
    }
  })

  .state('templates.accepted', {
    url: "/accepted",
    views: {
      'menuContent': {
        templateUrl: "views/templates/accepted.html"
      }
    }
  })

  .state('templates.notes', {
    url: "/notes",
    views: {
      'menuContent': {
        templateUrl: "views/templates/notes.html"
      }
    }
  })

  .state('templates.diagnosis', {
    url: "/diagnosis",
    views: {
      'menuContent': {
        templateUrl: "views/templates/diagnosis.html"
      }
    }
  })

  .state('templates.medication', {
    url: "/medication",
    views: {
      'menuContent': {
        templateUrl: "views/templates/medication.html"
      }
    }
  })

  .state('templates.tests', {
    url: "/tests",
    views: {
      'menuContent': {
        templateUrl: "views/templates/tests.html"
      }
    }
  })
;



//Patient signup


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/walkthrough');

});
