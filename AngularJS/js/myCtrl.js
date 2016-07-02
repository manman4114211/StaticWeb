app.controller('namesCtrl', function ($scope) {
    $scope.names = [
        {name: 'Jani', country: 'Norway'},
        {name: 'Hege', country: 'Sweden'},
        {name: 'Kai', country: 'Denmark'}
    ];
});
app.controller('myCtrl', function ($scope) {
    $scope.count = 0;
    $scope.myVar = false;
    $scope.toggle = function () {
        $scope.myVar = !$scope.myVar;
    };
});
app.controller('formCtrl', function ($scope) {
    $scope.master = {firstName: "John", lastName: "Doe"};
    $scope.reset = function () {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
});
app.controller('validateCtrl', function ($scope) {
    $scope.user = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
});
app.controller('apiCtrl', function ($scope) {
    $scope.source = "John";
    $scope.sourceCopy = angular.copy($scope.source);
    $scope.lower = angular.lowercase($scope.source);
    $scope.upper = angular.uppercase($scope.source);
    
    $scope.x1 = angular.isString($scope.source);
    $scope.x2 = angular.isNumber($scope.source);
});
