angular.module('FrontendApp').controller('HomeController', ['$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', function ($sce, $q, $scope, $rootScope, $http, $cookies) {

    $scope.GetTopNews = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetTopNews',
            params: { searchKey: '' },
        }).then(function successCallback(response) {
            $scope.ListNews_CCM = response.data.list;
            $scope.ListNews_CCM_2 = response.data.list2;
            if ($scope.ListNews_CCM.length > 0) {
                $scope.First = $scope.ListNews_CCM[0];
                $scope.ListNews_CCM.splice(0, 1);
            };
            if ($scope.ListNews_CCM_2.length > 0) {
                $scope.First_2 = $scope.ListNews_CCM_2[0];
                $scope.ListNews_CCM_2.splice(0, 1);
            };
            if ($scope.First != null || $scope.First != undefined) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:44345/api/CCM_Home/GetTags',
                    params: { code: $scope.First.FCode },
                }).then(function successCallback(response) {
                    $scope.First_Tags = response.data.list;
                }, function errorCallback(response) {

                });
            }
            if ($scope.First_2 != null || $scope.First_2 != undefined) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:44345/api/CCM_Home/GetTags',
                    params: { code: $scope.First_2.FCode },
                }).then(function successCallback(response) {
                    $scope.First_2_Tags = response.data.list;
                }, function errorCallback(response) {

                });
            }
        }, function errorCallback(response) {

        });
    }
    $scope.GetAllNews = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetAllNews',
            params: { searchKey: '' },
        }).then(function successCallback(response) {
            $scope.News_CCM = response.data.list;
        }, function errorCallback(response) {

        });
    }
    $scope.GetCDTD = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetCDTD',
        }).then(function successCallback(response) {
            $scope.ListNews_GSTD = response.data.list;
            if ($scope.ListNews_GSTD.length > 0) {
                $scope.First_GSTD = $scope.ListNews_GSTD[0];
                $scope.ListNews_GSTD.splice(0, 1);
            };
            $scope.CDTDUrl = response.data.url;
        }, function errorCallback(response) {

        });
    }
    $scope.GetNewsBienBan = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetNewsBienBan',
        }).then(function successCallback(response) {
            $scope.News_BB = response.data.list;
        }, function errorCallback(response) {

        });
    }
    $scope.GetNewsNCQG = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetNewsNCQG',
        }).then(function successCallback(response) {
            $scope.News_NCQG = response.data.list;
        }, function errorCallback(response) {

        });
    }
    $scope.GetNewsTieuBan = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetNewsTieuBan',
        }).then(function successCallback(response) {
            $scope.News_TB = response.data.list;
        }, function errorCallback(response) {

        });
    }
    $scope.GetNewsThongBao = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetNewsThongBao',
        }).then(function successCallback(response) {
            $scope.News_ThongBao = response.data.list;
        }, function errorCallback(response) {

        });
    }
    $scope.GetLinks = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetLinks',
        }).then(function successCallback(response) {
            $scope.Links = response.data.list;
            $scope.MaxLinks = response.data.max;
        }, function errorCallback(response) {

        });
        $scope.GetVideoIntro = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:44345/api/CCM_Home/GetVideoIntro',
            }).then(function successCallback(response) {
                $scope.Video = response.data;
                var url = $scope.Video.Url.replace(".com/watch?v=", ".com/embed/");
                $scope.VideoUrl = $sce.trustAsResourceUrl(url);
            }, function errorCallback(response) {

            });
        }
    }
    $scope.LoadGroupLinks = function () {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: '/api/CMS_GroupLinks/GetList',
            params: { type: "gallery" }
        }).then(function successCallback(response) {
            $scope.GroupLinks = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
        return def.promise;
    }
    $scope.$on('$viewContentLoaded', function () {
        $scope.GetTopNews();
        $scope.GetAllNews();
        $scope.GetCDTD();
        $scope.GetLinks();
        $scope.GetVideoIntro();
        $scope.GetNewsBienBan();
        $scope.GetNewsNCQG();
        $scope.GetNewsTieuBan();
        $scope.GetNewsThongBao();
        $scope.LoadGroupLinks();
    });

}]);

angular.module('FrontendApp').controller('TimHieuController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies) {
    $scope.SearchKey = '';
    $scope.$on('$viewContentLoaded', function () {
        //$scope.GetNews();
        $scope.GetHotNews();
    });
    $scope.GetNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetList10BienBan',
            params: { searchKey: '', TAG: 'nhu-cau-quoc-gia' },
        }).then(function successCallback(response) {
            $scope.NewsNCQG = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
}]);

angular.module('FrontendApp').controller('LienHeController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies) {
    $scope.SearchKey = '';
    $scope.UserEmail = '';
    $scope.UserName = '';
    $scope.UserMobile = '';
    $scope.UserAddress = '';
    $scope.UserComment = '';
    $scope.$on('$viewContentLoaded', function () {
        $scope.GetName();
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.GetName = function () {
        if ($routeParams.language == "vn") {
            $http({
                method: 'GET',
                url: '/api/CCM_Home/GetNameParentMenu',
                params: { FCode: 'lien-he' },
            }).then(function successCallback(response) {
                $scope.Name = response.data;
            }, function errorCallback(response) {
                // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
            });
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CCM_Home/GetNameParentMenu',
                params: { FCode: 'contactus' },
            }).then(function successCallback(response) {
                $scope.Name = response.data;
            }, function errorCallback(response) {
                // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
            });
        }
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
            $scope.Storage.forEach(function (value, key) {
                if (value.MM == $scope.month && value.yyyy == $scope.year) $scope.Name = value.MMMM;
            })
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.PostComment = function () {
        $scope.loading = true;
        angular.element('#author').removeClass("has-error");
        angular.element('#email').removeClass("has-error");
        angular.element('#comment').removeClass("has-error");
        angular.element('#mobile').removeClass("has-error");
        angular.element('#address').removeClass("has-error");
        $scope.Error = false;
        if ($scope.UserName == '' && $scope.UserEmail == '' && $scope.UserWebsite == '' && $scope.UserComment == '' && $scope.UserMobile == '' && $scope.UserAddress == '') {
            $scope.loading = false;
            return;
        }
        if ($scope.UserName == '') {
            if ($routeParams.language == 'vn') toastr.warning('Tên không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your name!', 'Warning');
            angular.element('#author').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.UserEmail == '') {
            if ($routeParams.language == 'vn') toastr.warning('Email không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your email!', 'Warning');
            angular.element('#email').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.UserComment == '') {
            if ($routeParams.language == 'vn') toastr.warning('Bình luận không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your comment!', 'Warning');
            angular.element('#comment').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.UserMobile == '') {
            if ($routeParams.language == 'vn') toastr.warning('Điện thoại không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your phone!', 'Warning');
            angular.element('#mobile').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.UserAddress == '') {
            if ($routeParams.language == 'vn') toastr.warning('Địa chỉ không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your address!', 'Warning');
            angular.element('#address').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.Error == false) {
            $scope.item = {
                Name: $scope.UserName,
                Email: $scope.UserEmail,
                PhoneNumber: $scope.UserMobile,
                Comment: $scope.UserComment,
                Address: $scope.UserAddress
            };
            $http({
                method: 'POST',
                url: '/api/CCM_Home/Contact',
                data: $scope.item
            }).then(function successCallback(response) {
                if ($routeParams.language == 'vn') toastr.success('Gửi bình luận thành công !', 'Thông báo');
                else toastr.success('Comment successfully !', 'Success');
                $scope.UserEmail = '';
                $scope.UserName = '';
                $scope.UserWebsite = '';
                $scope.UserComment = '';
                $scope.loading = false;
            }, function errorCallback(response) {
                toastr.warning(response.data, 'Error');
                $scope.loading = false;
            });
        }
        $scope.loading = false;
    }
}]);

angular.module('FrontendApp').controller('PageController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies) {
    $scope.SearchKey = '';
    $scope.$on('$viewContentLoaded', function () {
        $scope.GetNews();
        $scope.GetParent();
        $scope.GetName();
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.GetNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetPageContent',
            params: { code: $routeParams.page },
        }).then(function successCallback(response) {
            $scope.News = response.data;
            //$scope.GetFilesByNew($scope.News.Id);
            if ($scope.News.Content != null) $scope.News.Content = $sce.trustAsHtml($scope.News.Content);
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetFilesByNew = function (id) {
        $http({
            method: 'GET',
            url: '/api/CMS_News/GetFilesByNews',
            params: { newsId: id },
        }).then(function successCallback(response) {
            $scope.itemFiles = response.data;

        }, function errorCallback(response) {
        });
    }
    $scope.GetName = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetNameParentMenu',
            params: { FCode: $routeParams.page },
        }).then(function successCallback(response) {
            $scope.Name = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetParent = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetNameParentMenu',
            params: { FCode: $routeParams.pageparent },
        }).then(function successCallback(response) {
            $scope.Parent = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
            $scope.Storage.forEach(function (value, key) {
                if (value.MM == $scope.month && value.yyyy == $scope.year) $scope.Name = value.MMMM;
            })
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.OpenFile = function (path) {
        window.open(path);
    }
}]);

angular.module('FrontendApp').controller('NewsController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies) {
    $scope.SearchKey = '';
    $scope.UserEmail = '';
    $scope.UserName = '';
    $scope.UserWebsite = '';
    $scope.UserComment = '';
    $scope.$on('$viewContentLoaded', function () {
        var Id = $routeParams.Id;
        $scope.GetNews(Id);
        //$scope.GetFilesByNew(Id);
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.GetComments(Id);
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.GetNews = function (Id) {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/ViewNews',
            params: { Id:  Id},
        }).then(function successCallback(response) {
            $scope.News = response.data;
            $scope.News.SortContent = $sce.trustAsHtml($scope.News.SortContent);
            $scope.News.Content = $sce.trustAsHtml($scope.News.Content);
            $scope.GetParentTag($scope.News.UrlTag);
            $http({
                method: 'GET',
                url: '/api/CCM_Home/GetTags',
                params: { code: $scope.News.FCode },
            }).then(function successCallback(response) {
                $scope.Tags = response.data.list;
            }, function errorCallback(response) {

            });
            $scope.GetNextPrevNews(Id, $scope.News.Menu);
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetFilesByNew = function (id) {
        $http({
            method: 'GET',
            url: '/api/CMS_News/GetFilesByNews',
            params: { newsId: id },
        }).then(function successCallback(response) {
            $scope.itemFiles = response.data;

        }, function errorCallback(response) {
        });
    }
    $scope.GetParentTag = function (Url) {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetParentTag',
            params: { Url: Url },
        }).then(function successCallback(response) {
            $scope.Parent = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetComments = function (Id) {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetComments',
            params: {NewsId : Id }
        }).then(function successCallback(response) {
            $scope.Comments = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
            $scope.Storage.forEach(function (value, key) {
                if (value.MM == $scope.month && value.yyyy == $scope.year) $scope.Name = value.MMMM;
            })
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetNextPrevNews = function (id, menu) {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetNextPrevNews',
            params: { newsId: id , menu: menu},
        }).then(function successCallback(response) {
            $scope.NextNews = response.data.NextNews;
            $scope.PrevNews = response.data.PrevNews;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.PostComment = function () {
        $scope.loading = true;
        angular.element('#author').removeClass("has-error");
        angular.element('#email').removeClass("has-error");
        angular.element('#comment').removeClass("has-error");
        $scope.Error = false;
        if ($scope.UserName == '' && $scope.UserEmail == '' && $scope.UserWebsite == '' && $scope.UserComment == '') {
            $scope.loading = false;
            return;
        }
        if ($scope.UserName == '') {
            if ($routeParams.language == 'vn') toastr.warning('Tên không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your name!', 'Warning');
            angular.element('#author').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.UserEmail == '') {
            if ($routeParams.language == 'vn') toastr.warning('Email không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your email!', 'Warning');
            angular.element('#email').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.UserComment == '') {
            if ($routeParams.language == 'vn') toastr.warning('Bình luận không được để trống!', 'Thông báo');
            else toastr.warning('Please enter your comment!', 'Warning');
            angular.element('#comment').addClass("has-error");
            $scope.Error = true;
        }
        if ($scope.Error == false) {
            $http({
                method: 'POST',
                url: '/api/CCM_Home/PostComment',
                params: { Name: $scope.UserName, Email: $scope.UserEmail, Website: $scope.UserWebsite, Comment: $scope.UserComment, NewsId: $scope.News.Id }
            }).then(function successCallback(response) {
                if ($routeParams.language == 'vn') toastr.success('Gửi bình luận thành công !', 'Thông báo');
                else toastr.success('Comment successfully !', 'Success');
                $scope.UserEmail = '';
                $scope.UserName = '';
                $scope.UserWebsite = '';
                $scope.UserComment = '';
                $scope.loading = false;
            }, function errorCallback(response) {
                toastr.warning(response.data, 'Error');
                $scope.loading = false;
            });
        }
        $scope.loading = false;
    }
    $scope.OpenFile = function (path) {
        window.open(path);
    }
}]);

angular.module('FrontendApp').controller('NewsOtherController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies) {
    $scope.SearchKey = '';
    $scope.UserEmail = '';
    $scope.UserName = '';
    $scope.UserWebsite = '';
    $scope.UserComment = '';
    $scope.$on('$viewContentLoaded', function () {
        $scope.Link = $routeParams.link;
        var Branch = $routeParams.branch;
        if (Branch == 'TTO') {
            $scope.Link = $sce.trustAsResourceUrl("https://tuoitre.vn/" + $scope.Link);
        }
        if (Branch == 'VNE') {
            $scope.Link = $sce.trustAsResourceUrl("https://vnexpress.net/" + $scope.Link);
        }
        $scope.GetHotNews();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
}]);


angular.module('FrontendApp').controller('SearchController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', '$window', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies, $window) {
    
    $scope.pageNumber = 1;
    $scope.pageSize = 10;
    $scope.$on('$viewContentLoaded', function () {
        $scope.SearchKey = $routeParams.SearchKey;
        $scope.GetNews();
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.GetNews = function () {
        $window.scrollTo(0, 0);
        $http({
            method: 'GET',
            url: '/api/CCM_Home/SearchNews',
            params: { pageNumber: $scope.pageNumber, pageSize: $scope.pageSize, searchKey: $scope.SearchKey },
        }).then(function successCallback(response) {
            $scope.News = response.data.list;
            $scope.News.forEach(function (value, key) {
                if (value.SortContent.length > 200) {
                    value.SortContent = value.SortContent.substr(0, 200) + "..."
                }
            })
            $scope.Total = response.data.total;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
            $scope.Storage.forEach(function (value, key) {
                if (value.MM == $scope.month && value.yyyy == $scope.year) $scope.Name = value.MMMM;
            })
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.change = function (page) {
        $scope.pageNumber = page;
        $scope.GetNews();
        $window.scrollTo(0, 0);
    }
}]);

angular.module('FrontendApp').controller('CategoryController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', '$window', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies, $window) {

    $scope.pageNumber = 1;
    $scope.pageSize = 10;
    $scope.SearchKey = '';
    $scope.Url = '';
    $scope.$on('$viewContentLoaded', function () {
        if ($routeParams.child != undefined) {
            $scope.param = $routeParams.child;
            $scope.Url = 'category/' + $routeParams.parent + '/' + $routeParams.child;
        }
        else {
            $scope.param = $routeParams.parent;
            $scope.Url = 'category/' + $routeParams.parent;
        }
        $scope.GetNews();
        $scope.GetName($scope.Url);
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.GetNews = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:44345/api/CCM_Home/GetList10BienBan',
            params: { pageNumber: $scope.pageNumber, pageSize: $scope.pageSize, searchKey: '', TAG: $scope.param },
        }).then(function successCallback(response) {
            $scope.News = response.data.list;
            $scope.News.forEach(function (value, key) {
                if (value.SortContent.length > 200) {
                    value.SortContent = value.SortContent.substr(0, 200) + "..."
                }
            })
            $scope.Total = response.data.total;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetName = function (Url) {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetNameMenu',
            params: { Url: Url },
        }).then(function successCallback(response) {
            $scope.Name = response.data;
            if (response.data.ParentMenu != null) {
                $scope.GetParentName(response.data.ParentMenu);
            }
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetParentName = function (FCode) {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetNameParentMenu',
            params: { FCode: FCode },
        }).then(function successCallback(response) {
            $scope.ParentName = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.change = function (page) {
        $scope.pageNumber = page;
        $scope.GetNews();
        $window.scrollTo(0, 0);
    }
}]);

angular.module('FrontendApp').controller('CategoryStorageController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', '$window', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies, $window) {
    $scope.SearchKey = '';
    $scope.Url = '';
    $scope.pageNumber = 1;
    $scope.pageSize = 10;
    $scope.$on('$viewContentLoaded', function () {
        $scope.year = $routeParams.year;
        $scope.month = '';
        if ($routeParams.month != null || $routeParams.month != undefined) $scope.month = $routeParams.month;
        $scope.GetNews();
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.GetNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetList10Categories',
            params: { pageNumber: $scope.pageNumber, pageSize: $scope.pageSize, searchKey: '', month: $scope.month, year: $scope.year },
        }).then(function successCallback(response) {
            $scope.News = response.data.list;
            $scope.News.forEach(function (value, key) {
                if (value.SortContent.length > 200) {
                    value.SortContent = value.SortContent.substr(0, 200) + "..."
                }
            })
            $scope.Total = response.data.total;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
            $scope.Storage.forEach(function (value, key) {
                if (value.MM == $scope.month && value.yyyy == $scope.year) $scope.Name = value.MMMM;
            })
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.change = function (page) {
        $scope.pageNumber = page;
        $scope.GetNews();
        $window.scrollTo(0, 0);
    }
}]);

angular.module('FrontendApp').controller('ViewGalleryController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', '$window', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies, $window) {

    $scope.pageNumber = 1;
    $scope.pageSize = 10;
    $scope.SearchKey = '';
    $scope.Url = '';
    $scope.$on('$viewContentLoaded', function () {
        $scope.GetNews();
        $scope.GetListBanner(true);
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.pageChanged = function () {
        $scope.GetListBanner(false);
    };
    $scope.GetListBanner = function (refresh) {
        if (refresh) {
            $scope.pageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_Gallery',
            params: { pageNumber: $scope.pageNumber, pageSize: $scope.pageSize, searchKey: $scope.SearchKey, groupId: $routeParams.gallery, authorId: 0 }
        }).then(function successCallback(response) {
            $scope.ListImage = response.data.list;
            var total = parseInt(response.data.total / $scope.pageSize);
            if (response.data.total == $scope.pageSize)
                $scope.Total = total;
            else $scope.Total = total + 1;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetAlbum?Id=' + $routeParams.gallery
        }).then(function successCallback(response) {
            $scope.Album = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.change = function (page) {
        $scope.pageNumber = page;
        $scope.GetListBanner(false);
        $window.scrollTo(0, 0);
    }
}]);

angular.module('FrontendApp').controller('GalleryController', ['$location', '$routeParams', '$sce', '$q', '$scope', '$rootScope', '$http', '$cookies', '$window', function ($location, $routeParams, $sce, $q, $scope, $rootScope, $http, $cookies, $window) {

    $scope.$on('$viewContentLoaded', function () {
        $scope.LoadGroupLinks();
        $scope.GetHotNews();
        $scope.GetStorage();
        $scope.date = new Date();
        $scope.DayInWeek = '';
        if ($routeParams.language == "us") $scope.SwitchFuctionEN($scope.date.getDay());
        else $scope.SwitchFuctionVN($scope.date.getDay());
    });
    $scope.SwitchFuctionVN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Thứ hai";
                break;
            case 1:
                $scope.DayInWeek = "Thứ ba";
                break;
            case 2:
                $scope.DayInWeek = "Thứ tư";
                break;
            case 3:
                $scope.DayInWeek = "Thứ năm";
                break;
            case 4:
                $scope.DayInWeek = "Thứ sáu";
                break;
            case 5:
                $scope.DayInWeek = "Thứ bảy";
                break;
            case 6:
                $scope.DayInWeek = "Chủ nhật";
                break;
        }
    };
    $scope.SwitchFuctionEN = function (sno) {
        switch (sno) {
            case 0:
                $scope.DayInWeek = "Monday";
                break;
            case 1:
                $scope.DayInWeek = "Tuesday";
                break;
            case 2:
                $scope.DayInWeek = "Wednesday";
                break;
            case 3:
                $scope.DayInWeek = "Thursday";
                break;
            case 4:
                $scope.DayInWeek = "Friday";
                break;
            case 5:
                $scope.DayInWeek = "Saturday";
                break;
            case 6:
                $scope.DayInWeek = "Sunday";
                break;
        }
    };
    $scope.LoadGroupLinks = function () {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: '/api/CMS_GroupLinks/GetList',
            params: { type: "gallery" }
        }).then(function successCallback(response) {
            $scope.GroupLinks = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
        return def.promise;
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetStorage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetStorage',
        }).then(function successCallback(response) {
            $scope.Storage = response.data;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
}]);