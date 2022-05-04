angular.module('WebApiApp').controller('NewsController', ['$q', '$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($q, $rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
    $rootScope.LoadTreeMenu = function () {
        //if ($scope.CoCode == "")
        //    return;
        $http({
            method: 'GET',
            url: '/CMS_Categories/Tree/' + $scope.CoCode
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.MenuTree = response.data;
            // console.log(response.data);
            $("#tree_3").jstree({
                "core": {
                    "themes": {
                        "responsive": false
                    },
                    // so that create works
                    "check_callback": true,
                    'data': $scope.MenuTree
                },
                "types": {
                    "default": {
                        "icon": "fa fa-folder icon-state-warning icon-lg"
                    },
                    "file": {
                        "icon": "fa fa-file icon-state-warning icon-lg"
                    }
                },
                "state": { "key": "demo2" },
                "plugins": ["dnd", "state", "types"]
                //"plugins": ["contextmenu", "dnd", "state", "types"]
            });
            $('#tree_3').jstree(true).settings.core.data = $scope.MenuTree;
            $('#tree_3').jstree(true).refresh();
            $('#tree_3').on("select_node.jstree", function (e, data) {
                if (data.node.id != null) {
                    data.instance.deselect_node(data.node);
                    //_selectedNodeId = "";
                }
                //debugger
                if ($scope.ViewType == "EDIT_NEWS") {
                    if (confirm('Bài viết đang soạn thảo chưa được lưu! Bạn có muốn lưu không?')) {
                        //if ($scope.item.Id != 0)
                        $scope.SaveNews();
                    }
                    else {
                        if ($scope.item == undefined) $scope.item = {}
                        $scope.ChoiceStatus = undefined;
                        $scope.ChoiceMenu = data.node.original.code;
                        $scope.CurrentMenu = data.node.original.code;
                        $scope.ListTitle = "Quản lý bài viết mục : '" + data.node.original.text + "'";
                        $scope.ListNewByMenu(data.node.original.code, true);

                        $scope.MenuListNews();
                        $scope.$apply();
                    }
                } else {
                    if ($scope.item == undefined) $scope.item = {}
                    $scope.ChoiceStatus = undefined;
                    $scope.ChoiceMenu = data.node.original.code;
                    $scope.CurrentMenu = data.node.original.code;
                    $scope.ListTitle = "Quản lý bài viết mục : '" + data.node.original.text + "'";
                    $scope.ListNewByMenu(data.node.original.code, true);

                    $scope.MenuListNews();
                    $scope.$apply();
                }

                //ComponentsSelect2.init();

            });


        }, function errorCallback(response) {

            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });

    }
    $rootScope.LoadTreeTextMenu = function () {
        if ($scope.CoCode == "")
            return;
        $http({
            method: 'GET',
            url: '/CMS_Categories/TreeText/' + $scope.CoCode
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.TreeTextMenu = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.MainMenuChange = function () {
        $rootScope.LoadTreeMenu();
        $rootScope.LoadTreeTextMenu();
        $http({
            method: 'GET',
            url: '/CMS_Categories/MenuByGroup/' + $scope.CoCode
        }).then(function successCallback(response) {
            $scope.MenuLevel = response.data;
        }, function errorCallback(response) {
        });
    };
    $scope.GetMenuName = function (obj) {
        if (obj.FLevel == 2)
            return " |--" + obj.FName;
        return obj.FName;
    }
    $scope.cancelModal = function () {
        // alert('cancelModal');
        //alert($scope.modalInstance);
        //$uibModal.dismiss('close');
    }
    $scope.$on('$viewContentLoaded', function () {
        $scope.GetAllNews();
        $scope.Paging = {
            PageSize: 30,
            PageNumber: 1,
            Total: 0,
            SearchKey: ''
        }
        $scope.MenuLevel = [];
        $scope.CoCode = "ALL";
        // initialize core components
        App.initAjax();
        //ComponentsSelect2.init();
        $rootScope.$settings.layout.pageContentWhite = true;
        $rootScope.$settings.layout.pageBodySolid = false;
        $rootScope.$settings.layout.pageSidebarClosed = false;
        $scope.LoadMainMenus();
        $scope.LoadMenus();
        $scope.GetDropCMSCategories();
        $rootScope.LoadTreeMenu();
        $scope.GetMenusByLevel();
        $scope.$state.current.data.pageTitle = "Quản lý danh mục tin tức sự kiện";
        $scope.ViewType = "LIST_NEWS";
        $('#summernote_Desc').summernote({
            height: 150,
        });
        $('#summernote_Content').summernote({
            height: 400,
            callbacks: {
                onImageUpload: function (files, editor, welEditable) {
                    sendFile(files[0], this);
                }
            },
        });
        $scope.ListNewByMenu(true);
    });

    $scope.types = [
        { value: "NOTUSE", text: "Không sử dụng", class: "label label-sm label-danger  font-sm" },
        { value: "EDITTING", text: "Soạn thảo", class: "label label-sm label-info  font-sm" },
        { value: "WATTING", text: "Chờ duyệt", class: "label label-sm label-warning  font-sm" },
        { value: "APPROVED", text: "Đã duyệt", class: "label label-sm label-primary  font-sm" },
    ];

    $scope.getStatus = function (status) {
        let s = $scope.types.find(x => x.value == status);
        return s;
    }
    $scope.DeleteNew = function (obj) {
        if (confirm('Bạn có chắc chắn muốn xóa tin này?')) {
            $http({
                method: 'POST',
                url: '/api/CMS_News/Delete',
                data: obj
            }).then(function successCallback(response) {
                $scope.ListNewByMenu($scope.ChoiceMenu, false);
                toastr.warning('Xóa tin bài thành công !', 'Thông báo');
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });

        }
    }
    $scope.EditNews = function (news) {
        $scope.ViewType = "EDIT_NEWS";
        $scope.itemError = null;
        $scope.ListTags = [];
        $scope.Tags = [""];
        document.getElementById('file').value = '';
        $(".danh-muc").select2({
            placeholder: 'Chọn',
            escapeMarkup: function (m) { return m; },
            width: null
        });
        $(".form_user").select2({
            placeholder: 'Chọn',
            escapeMarkup: function (m) { return m; },
            width: null
        });
        $http({
            method: 'GET',
            url: '/api/CMS_News/GetTags',
        }).then(function successCallback(response) {
            $scope.ListTags = response.data;
        }, function errorCallback(response) {
        });
        if (news != null) {
            $http({
                method: 'GET',
                url: '/api/CCM_Home/GetPageByCode',
                params: { code: $scope.CurrentMenu },
            }).then(function successCallback(response) {
                $scope.Page = response.data;
                $http({
                    method: 'GET',
                    url: '/api/CCM_Home/GetPage',
                }).then(function successCallback(response) {
                    $scope.ListPage = response.data;
                    $scope.changeCategoty();
                    $http({
                        method: 'GET',
                        url: '/api/CMS_News/GetById',
                        params: { id: news.Id },
                    }).then(function successCallback(response) {
                        $scope.item = response.data;
                        $scope.GetFilesByNew(news.Id);
                        if ($scope.item.IsTopNews) {
                            $('#CreateTime').datepicker("setDate", new Date(moment($scope.item.FCreateTime).toJSON()));
                        }
                        //if ($scope.item.SortContent != null) {

                        //    $('#summernote_Desc').summernote('code', $scope.item.SortContent);

                        //} else {

                        //    $('#summernote_Desc').summernote('code', '');
                        //}

                        if ($scope.item.Content != null) {
                            $('#summernote_Content').summernote('code', $scope.item.Content);

                        }
                        else {
                            $('#summernote_Content').summernote('code', '');
                        }
                        $scope.Tags = JSON.parse(response.data.Tags);
                        $('.danh-muc').val($scope.Menu).trigger('change.select2');
                        $('.form_user').val($scope.Tags).trigger('change.select2');
                    }, function errorCallback(response) {
                    });

                }, function errorCallback(response) {
                });
            }, function errorCallback(response) {
            });
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CCM_Home/GetPageByCode',
                params: { code: $scope.CurrentMenu },
            }).then(function successCallback(response) {
                $scope.Page = response.data;
                $http({
                    method: 'GET',
                    url: '/api/CCM_Home/GetPage',
                }).then(function successCallback(response) {
                    $scope.ListPage = response.data;
                    $scope.changeCategoty();
                    var menu = $scope.CurrentMenu;
                    var isnews = $scope.Page.IsNews;
                    $scope.item = {
                        Menu: menu,
                        IsLiveNews: isnews,
                        Id: 0,
                        SortContent: null,
                        Content: null,
                        Image: '../../../Uploads/Banners/banner-no-image.jpg',
                        DisplayCreateTime: null
                    }
                    //$scope.NewForm.$setPristine();
                    //$scope.NewForm.$setUntouched();
                    //if ($scope.item.SortContent != null) {

                    //    $('#summernote_Desc').summernote('code', $scope.item.SortContent);

                    //} else {

                    //    $('#summernote_Desc').summernote('code', '');
                    //}

                    if ($scope.item.Content != null) {
                        $('#summernote_Content').summernote('code', $scope.item.Content);

                    }
                    else {
                        $('#summernote_Content').summernote('code', '');
                    }
                }, function errorCallback(response) {
                });
            }, function errorCallback(response) {
                $http({
                    method: 'GET',
                    url: '/api/CCM_Home/GetPage',
                }).then(function successCallback(response) {
                    $scope.ListPage = response.data;
                    $scope.changeCategoty();
                    var menu = $scope.CurrentMenu;
                    var isnews = false;
                    $scope.item = {
                        Menu: menu,
                        IsLiveNews: isnews,
                        Id: 0,
                        SortContent: null,
                        Content: null,
                        Image: '../../../Uploads/Banners/banner-no-image.jpg',
                        DisplayCreateTime: null
                    }
                    //$scope.NewForm.$setPristine();
                    //$scope.NewForm.$setUntouched();
                    //if ($scope.item.SortContent != null) {

                    //    $('#summernote_Desc').summernote('code', $scope.item.SortContent);

                    //} else {

                    //    $('#summernote_Desc').summernote('code', '');
                    //}

                    if ($scope.item.Content != null) {
                        $('#summernote_Content').summernote('code', $scope.item.Content);

                    }
                    else {
                        $('#summernote_Content').summernote('code', '');
                    }
                }, function errorCallback(response) {
                });
            });
        }

        //return def.promise;
    }
    $scope.changeCategoty = function () {
        $scope.ListPage.forEach(function (value, key) {
            if (value.FCode == $scope.item.Menu) {
                $scope.item.IsLiveNews = value.IsNews;
            }
        })
    }
    $scope.DeleteFile = function (file) {
        if (confirm('Tệp đính kèm này sẽ bị xóa, bạn có muốn thực hiện thao tác này?')) {
            if (file.Id != 0 && file.Id != null) {
                $http({
                    method: 'POST',
                    url: '/api/CMS_News/DeleteFile',
                    params: { fileId: file.Id },
                }).then(function successCallback(response) {

                    if (response.data == "SUCCESS") {
                        var index = $scope.itemFiles.findIndex(x => x.Name == file.Name)
                        if (index != null)
                            $scope.itemFiles.splice(index, 1);
                    }
                }, function errorCallback(response) {
                });
            } else {
                var index = $scope.itemFiles.findIndex(x => x.Name == file.Name)
                if (index != null)
                    $scope.itemFiles.splice(index, 1);
            }
        }
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
    $scope.CheckTopNews = function (isTop) {
        if (isTop) {
            $('#CreateTime').datepicker("setDate", new Date(moment().toJSON()));
        }
        else
            $scope.item.DisplayCreateTime = null;
    }
    $scope.CountByStatus = function (stt) {
        if ($scope.ListAllNews != null) {
            var filteredArray = $scope.ListAllNews.filter(function (obj) {
                return obj.FStatus === stt;
            });
            return filteredArray.length;
        }
        return 0;
    }
    function sendFile(file, el) {
        data = new FormData();
        data.append("file", file);
        $http({
            method: 'POST',
            url: '/CMS_Categories/UpLoadImage',
            data: data,
            headers: {
                "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                'Content-type': undefined
            }
        }).then(function successCallback(response) {
            $(el).summernote('editor.insertImage', response.data);
        }, function errorCallback(response) {

        });
    }
    $scope.DisplayInfoPagination = function (page, itemsPerPage, totalItems) {
        start = (page - 1) * itemsPerPage + 1
        end = totalItems

        if (itemsPerPage < totalItems) {
            end = itemsPerPage * page
            if (end > totalItems) {
                end = totalItems;
            }
        }

        // e.g. "21-30 of 193 items"
        return "Hiển thị " + start + " đến " + end + " của " + totalItems + " bản ghi";
        //return start + '-' + end + ' of ' + totalItems + ' items'
    }
    $scope.pageChanged = function () {
        if ($scope.ChoiceMenu != undefined)
            $scope.ListNewByMenu($scope.ChoiceMenu, false);
        if ($scope.ChoiceStatus != undefined)
            $scope.ListNewByStatus($scope.ChoiceStatus, false);
    };
    $scope.Search = function () {
        if ($scope.ChoiceMenu != undefined)
            $scope.ListNewByMenu($scope.ChoiceMenu, true);
        if ($scope.ChoiceStatus != undefined)
            $scope.ListNewByStatus($scope.ChoiceStatus, true);
    }
    $scope.ListNewByMenu = function (menu, refresh) {
        if (refresh) {
            $scope.Paging.PageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_News/GetByMenu',
            params: { menu: menu, pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize, searchKey: $scope.Paging.SearchKey },
        }).then(function successCallback(response) {
            $scope.ListNews = response.data.list;
            $scope.Paging.Total = response.data.total;
        }, function errorCallback(response) {

        });
    }

    $scope.ListNewByStatus = function (status, refresh) {
        $scope.ChoiceMenu = undefined;
        $scope.ChoiceStatus = status;
        if (refresh) {
            $scope.Paging.PageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_News/GetByStatus',
            params: { status: status, pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize, searchKey: $scope.Paging.SearchKey },
        }).then(function successCallback(response) {
            $scope.ListNews = response.data.list;
            $scope.Paging.Total = response.data.total;
        }, function errorCallback(response) {

        });
    }

    $scope.MenuListNews = function () {
        $scope.item = {};
        $scope.itemFiles = [];
        $scope.ViewType = "LIST_NEWS";

    }

    $scope.itemFiles = [];
    $scope.ImageUploaded = function (files) {
        data = new FormData();
        data.append("file", files[0]);
        $http({
            method: 'POST',
            url: '/CMS_Categories/UpLoadImage',
            data: data,
            headers: {
                "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                'Content-type': undefined
            }
        }).then(function successCallback(response) {
            if (response.data == "/Uploads/Images/")
                $scope.item.Image = null;
            else
                $scope.item.Image = response.data;
        }, function errorCallback(response) {

        });
    }

    $scope.filesUploaded = function (files) {
        if (files.length < 1) return;
        data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append("file", files[i]);
        }
        $http({
            method: 'POST',
            url: '/CMS_Categories/UpLoadDocument',
            data: data,
            headers: {
                "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                'Content-type': undefined
            }
        }).then(function successCallback(response) {
            var sfile = response.data;
            angular.forEach(sfile, function (value, key) {
                value.Text = value.Name;
                $scope.itemFiles.push(value);
            });


        }, function errorCallback(response) {

        });
    }
    $scope.UploadBanner = function () {
        var files = document.getElementById('file').files;
        if (files.length > 0) {
            data = new FormData();
            data.append("file", files[0]);
            $http({
                method: 'POST',
                url: '/CMS_Categories/UploadImage',
                data: data,
                headers: {
                    "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                    'Content-type': undefined
                }
            }).then(function successCallback(response) {
                $scope.item.Image = response.data;
            }, function errorCallback(response) {

            });
        }
        else
            alert('Vui lòng chọn hình ảnh để tải lên!')
    }
    $scope.DeleteBanner = function () {
        if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '') {
            $scope.item.Image = '../../../Uploads/Banners/banner-no-image.jpg';
        }
    }
    $scope.ShowDeleteButton = function () {
        if ($scope.item.Image != null && $scope.item.Image != '' && $scope.item.Image != '../../../Uploads/Banners/banner-no-image.jpg')
            return true;
        else return false;
    }

    $scope.SaveNews = function () {
        //$scope.item.SortContent = $('#summernote_Desc').summernote('code');
        $scope.item.Content = $('#summernote_Content').summernote('code');
        $scope.item.FStatus = 'APPROVED';
        if ($scope.item.IsLiveNews != true) $scope.item.Tags = JSON.stringify($scope.Tags);
        $scope.item.MainTag = $scope.Tags[0];
        var data = {
            News: $scope.item,
            Files: $scope.itemFiles
        };

        $http({
            method: 'POST',
            url: '/api/CMS_News',
            data: data,
        }).then(function successCallback(response) {
            $http({
                method: 'POST',
                url: '/api/CMS_News/SaveGroupTags',
                params: { news: $scope.item.FCode, CodeTags: JSON.stringify($scope.Tags) },
            }).then(function successCallback(response) {

            }, function errorCallback(response) {

            });
            $scope.MenuListNews();
            if ($scope.item != 0) {
                $scope.ListNewByMenu($scope.ChoiceMenu, false);
            } else
                $scope.ListNewByMenu($scope.ChoiceMenu, true);
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            if (!angular.isUndefined(response.data.ModelState.FName)) {
                var text = '';
                $scope.NewForm.FName.$touched = true;
                $scope.NewForm.FName.$untouched = false;
                $scope.NewForm.FName.$valid = false;
                $scope.NewForm.FName.$invalid = true;
                text += response.data.ModelState.FName[0] + "<br>";
                toastr.error(text, "Lỗi cập nhật dữ liệu");
            }
            if (!angular.isUndefined(response.data.ModelState.Menu)) {
                var text = '';
                $scope.NewForm.Menu.$touched = true;
                $scope.NewForm.Menu.$untouched = false;
                $scope.NewForm.Menu.$valid = false;
                $scope.NewForm.Menu.$invalid = true;
                text += response.data.ModelState.Menu[0] + "<br>";
                toastr.error(text, "Lỗi cập nhật dữ liệu");
            }
            if (!angular.isUndefined(response.data.ModelState.Image)) {
                var text = '';
                $scope.NewForm.Image.$touched = true;
                $scope.NewForm.Image.$untouched = false;
                $scope.NewForm.Image.$valid = false;
                $scope.NewForm.Image.$invalid = true;
                text += response.data.ModelState.Image[0] + "<br>";
                toastr.error(text, "Lỗi cập nhật dữ liệu");
            }
            if (!angular.isUndefined(response.data.ModelState.FStatus)) {
                var text = '';
                $scope.NewForm.FStatus.$touched = true;
                $scope.NewForm.FStatus.$untouched = false;
                $scope.NewForm.FStatus.$valid = false;
                $scope.NewForm.FStatus.$invalid = true;
                text += response.data.ModelState.FStatus[0];
                toastr.error(text, "Lỗi cập nhật dữ liệu");
            }
            else toastr.error(response.data, "Lỗi cập nhật dữ liệu");
        });

    }

    $scope.GetAllNews = function () {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: '/api/CMS_News/GetAllNews',
        }).then(function successCallback(response) {
            $scope.ListAllNews = response.data;
            def.resolve($scope.ListAllNews);
        }, function errorCallback(response) {
            def.reject(response.data);
        });
        return def.promise;
    }
    $scope.GetTags = function () {
        $scope.item.Tags = JSON.parse($scope.item.Tags);
    }
}]);