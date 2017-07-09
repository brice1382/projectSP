(function() {
    'use strict';

    angular
        .module('cleaningList', ['cleaning-core']);
})();


(function() {
    'use strict';

    angular
        .module('core', ['cleaning-core']);
})();


(function() {
    'use strict';

    angular
        .module('cleaning-core', ['ngResource']);
})();

