(function() {
    'use strict';

    angular
        .module('cleaningList', [])
        .controller('CleaningListCtrl', ['Lists', function(Lists) {
            var vm = this;

            vm.lists = Lists.query();
            vm.orderProp = 'listId';
        }]);
})();
