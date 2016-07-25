var app = angular.module('msgBoard', []);
app.controller('ctrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.alert = 'none';
    $scope.showAlert = true;
    $scope.comment = {
        name: '',
        email: '',
        title: '',
        comment: ''
    };
    $scope.comments = [
        {
            name: 'yzx',
            email: '123@123.cn',
            title: 'say',
            comment: 'say something ...'
        },
        {
            name: 'yzx',
            email: '123@123.cn',
            title: 'say',
            comment: 'say something ...'
        },
        {
            name: 'yzx',
            email: '123@123.cn',
            title: 'say',
            comment: 'say something ...'
        },
    ];

    $scope.hasThisPerson = function (name) {
        var len = $scope.comments.length==null?0:$scope.comments.length;
        try{
            for (var i = 0; i < len; i++) {
                var curObj = $scope.comments[i];
                if (curObj.name == name) {
                    return true;
                }
                return false;
            }
        }catch (e){
            return false;
        }

    };
    $scope.save = function () {
        var name = $scope.comment.name;
        var url = '/comment?name=' + name;
        if ($scope.hasThisPerson(name)) {//表示修改
            $http({
                method: 'put',
                url: url,
                data: $scope.comment
            }).success(function (result) {//如果更新服务器端应该返回更新后的comments数组
                $scope.comments = result.data;
                $scope.alert = result.code;
                $scope.showAlert = true;
                $timeout(function () {
                    $scope.showAlert = false;
                }, 3000);
                console.log(result);
            }).error(function (err) {
                $scope.alert = err;
                $scope.showAlert = true;
                $timeout(function () {
                    $scope.showAlert = false;
                }, 3000);
            });

        } else {//新增
            console.log('post_send_start');
            $http({
                method:'post',
                url:'/comment',
                data:$scope.comment,
                headers:{
                    'content-type':'text/plain; charset=utf-8',
                    mimeType:'text/plain; charset=utf-8'
                }
            }).success(function (result) {//如果更新服务器端应该返回更新后的comments数组
                $scope.comments = result.data;
                $scope.alert = result.code;
                $scope.showAlert = true;
                $timeout(function () {
                    $scope.showAlert = false;
                }, 3000);

                console.log(result);
                //$('#userModal').modal('hide');
            }).error(function (err) {
                $scope.alert = err;
                $scope.showAlert = true;
                $timeout(function () {
                    $scope.showAlert = false;
                }, 3000);
            });
        }

        $('#userModal').modal('hide');
    };


}]);


function add() {
    $('#userModal').modal('show');
}


function del() {

}

function getCom() {

}

function init() {

}