(function () {
    'use strict';

    angular
        .module('toast', [])
        .service('GetToastedService', [function () {
            var sv = this;

            var showCustomToast = function() {
                $mdToast.show({
                    hideDelay   : 3000,
                    position    : 'top right',
                    controller  : 'ToastCtrl',
                    templateUrl : 'toast-tpl.html'
                });
            };

            var closeToast = function() {
                if (isDlgOpen) return;

                $mdToast
                    .hide()
                    .then(function() {
                        isDlgOpen = false;
                    });
            };

            var openMoreInfo = function(e) {
                if ( isDlgOpen ) return;
                isDlgOpen = true;

                $mdDialog
                    .show($mdDialog
                        .alert()
                        .title('More info goes here.')
                        .textContent('Something witty.')
                        .ariaLabel('More info')
                        .ok('Got it')
                        .targetEvent(e)
                    )
                    .then(function() {
                        isDlgOpen = false;
                    });
            };


            return {
                showCustomToast: showCustomToast,
                closeToast: closeToast,
                openMoreInfo: openMoreInfo
            }
        }])
})();
