(function () {
    'use strict';

    angular.module("myApp")
        .factory("CleanService", ['$filter',
            function ($filter) {

                var service = {};

                var arealist = [
                    {"id": 1, "area": "Bathroom"},
                    {"id": 2, "area": "Kitchen"},
                    {"id": 3, "area": "House"}
                ];

                var timelist = [
                    {"Id": 1, "time": "Daily", "areaId": 1},
                    {"Id": 2, "time": "Weekly", "areaId": 1},
                    {"Id": 3, "time": "Monthly", "areaId": 1},
                    {"Id": 4, "time": "Quarterly", "areaId": 1},
                    {"Id": 5, "time": "Daily", "areaId": 2},
                    {"Id": 6, "time": "Weekly", "areaId": 2},
                    {"Id": 7, "time": "Monthly", "areaId": 2},
                    {"Id": 8, "time": "Daily", "areaId": 3},
                    {"Id": 9, "time": "Weekly", "areaId": 3},
                    {"Id": 10, "time": "Quarterly", "areaId": 3},
                    {"Id": 11, "time": "Biannually", "areaId": 3}
                ];

                var tasklist = [
                    { "Id": 1, "task": "Quickly wipe out sink and tubs after each use", "timeId": 1},
                    { "Id": 2, "task": "Hang towels to dry", "timeId": 1},
                    { "Id": 3, "task": "Wipe up spills immediately", "timeId": 1},
                    { "Id": 4, "task": "Change hand towels", "timeId": 1},
                    { "Id": 5, "task": "Sweep and mop floor", "timeId": 2},
                    { "Id": 6, "task": "Empty trash can and recycling", "timeId": 2},
                    { "Id": 7, "task": "Wash towels and wash cloths (or twice a week if desired)", "timeId": 2},
                    { "Id": 8, "task": "Vacuum rugs", "timeId": 2},
                    { "Id": 9, "task": "Clean mirrors", "timeId": 2},
                    { "Id": 10, "task": "Clean and disinfect sink and countertops", "timeId": 2},
                    { "Id": 11, "task": "Clean shower and bath tub", "timeId": 2},
                    { "Id": 12, "task": "Clean and disinfect toilet", "timeId": 2},
                    { "Id": 13, "task": "Dust", "timeId": 2},
                    { "Id": 14, "task": "Check and restock toiletries and cleaning supplies", "timeId": 2},
                    { "Id": 15, "task": "Flush drains with boiling water", "timeId": 2},
                    { "Id": 16, "task": "Clean and organize cabinets and drawers", "timeId": 3},
                    { "Id": 17, "task": "Deal with any mold and mildew", "timeId": 3},
                    { "Id": 18, "task": "Wash trash can", "timeId": 3},
                    { "Id": 19, "task": "Clean grout", "timeId": 4},
                    { "Id": 20, "task": "Dispose of old medication", "timeId": 4},
                    { "Id": 21, "task": "Wash shower curtain", "timeId": 4},
                    { "Id": 22, "task": "Wash rugs", "timeId": 4},
                    { "Id": 23, "task": "Clean up dishes, pots and pans after each meal", "timeId": 5},
                    { "Id": 24, "task": "Run dishwasher as needed (and empty when clean)", "timeId": 5},
                    { "Id": 25, "task": "Wipe down kitchen counters, table and stove top", "timeId": 5},
                    { "Id": 26, "task": "Empty trash can", "timeId": 5},
                    { "Id": 27, "task": "Sweep floor", "timeId": 5},
                    { "Id": 28, "task": "Change out kitchen towels", "timeId": 5},
                    { "Id": 29, "task": "Wipe up spills as they occur", "timeId": 5},
                    { "Id": 29, "task": "Clean out refrigerator and freezer of older food", "timeId": 6},
                    { "Id": 30, "task": "Mop kitchen floor", "timeId": 6},
                    { "Id": 31, "task": "Check cleaning supplies, and restock as necessary", "timeId": 6},
                    { "Id": 32, "task": "Flush kitchen drain with boiling water", "timeId": 6},
                    { "Id": 33, "task": "Disinfect kitchen counters and other food work surfaces", "timeId": 6},
                    { "Id": 34, "task": "Take out recycling", "timeId": 6},
                    { "Id": 35, "task": "Clean coffee maker", "timeId": 7},
                    { "Id": 36, "task": "Clean dishwasher, inside and out", "timeId": 7},
                    { "Id": 37, "task": "Clean oven (may need to do less often, depending on the amount of use)", "timeId": 7},
                    { "Id": 38, "task": "Clean kitchen sink drain with vinegar and baking soda drain cleaner", "timeId": 7},
                    { "Id": 39, "task": "Clean inside of refrigerator", "timeId": 7},
                    { "Id": 40, "task": "Clean garbage can", "timeId": 7},
                    { "Id": 41, "task": "Clean microwave", "timeId": 7},
                    { "Id": 42, "task": "Wipe outside of kitchen appliances", "timeId": 7},
                    { "Id": 43, "task": "Wipe down areas that accumulate cooking grease with a degreaser", "timeId": 7},
                    { "Id": 44, "task": "Wash kitchen rugs", "timeId": 7},
                    { "Id": 45, "task": "Dust light fixtures", "timeId": 7},
                    { "Id": 46, "task": "Make sure pest control methods working and are properly supplied", "timeId": 7},
                    { "Id": 47, "task": "Update pantry and freezer inventories", "timeId": 7},
                    { "Id": 48, "task": "Straighten cabinets and drawers", "timeId": 7},
                    { "Id": 49, "task": "Tidy and neaten each room in the house", "timeId": 8},
                    { "Id": 50, "task": "Clean up kitchen after meals", "timeId": 8},
                    { "Id": 51, "task": "Deal with spills immediately", "timeId": 8},
                    { "Id": 52, "task": "Put away (in a designated place) everything that comes into the home", "timeId": 8},
                    { "Id": 53, "task": "Empty anything that has become too full", "timeId": 8},
                    { "Id": 54, "task": "Clean bathrooms", "timeId": 9},
                    { "Id": 55, "task": "Clean kitchen", "timeId": 9},
                    { "Id": 56, "task": "Clean bedrooms", "timeId": 9},
                    { "Id": 57, "task": "Clean home office, and deal with weekly paperwork and bill paying", "timeId": 9},
                    { "Id": 58, "task": "Clean all other rooms in your home", "timeId": 9},
                    { "Id": 59, "task": "Laundry", "timeId": 9},
                    { "Id": 60, "task": "Menu planning, making grocery list and grocery shopping", "timeId": 9},
                    { "Id": 61, "task": "Sweep garage, basement and attic", "timeId": 10},
                    { "Id": 62, "task": "Wash or air pillows", "timeId": 10},
                    { "Id": 63, "task": "Wash windows", "timeId": 10},
                    { "Id": 64, "task": "Air and turn mattresses", "timeId": 11},
                    { "Id": 65, "task": "Clean drapes and curtains", "timeId": 11},
                    { "Id": 66, "task": "Wash rugs and clean carpets", "timeId": 11},
                    { "Id": 67, "task": "Clean basement, garage and attic", "timeId": 11}
                ];

                service.getArea = function () {
                    return arealist;
                };

                service.getAreaTime = function (areaId) {
                    var times = ($filter('filter')(timelist, {areaId: areaId}));
                    return times;
                };


                service.getTimeTask = function (timeId) {
                    var tasks = ($filter('filter')(tasklist, {timeId: timeId}));
                    return tasks;
                };

                return service;
            }]);
})();

