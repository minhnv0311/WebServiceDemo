angular.module('WebApiApp').controller('FAQController', ['$q', '$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($q, $rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
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
                if ($scope.ViewType == "EDIT_FAQ") {
                    if (confirm('Bạn có muốn lưu lại bài viết đang soạn thảo không ?')) {
                        //if ($scope.item.Id != 0)
                        $scope.SaveFAQ();
                    }
                } else
                    if ($scope.item == undefined) $scope.item = {}
                $scope.ChoiceStatus = undefined;
                $scope.ChoiceMenu = data.node.original.code;
                $scope.CurrentMenu = data.node.original.code;
                $scope.ListTitle = "Quản lý bài viết mục : '" + data.node.original.text + "'";
                $scope.ListNewByMenu(true);

                $scope.MenuListFAQ();
                $scope.$apply();

                ComponentsSelect2.init();

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
        $scope.GetAllFAQ();
        $scope.Paging = {
            PageSize: 30,
            PageNumber: 1,
            Total: 0,
            SearchKey: ''
        }
        //$scope.MenuLevel = [];
        //$scope.CoCode = "ALL";
        // initialize core components
        App.initAjax();
        ComponentsSelect2.init();
        $rootScope.$settings.layout.pageContentWhite = true;
        $rootScope.$settings.layout.pageBodySolid = false;
        $rootScope.$settings.layout.pageSidebarClosed = false;
        $scope.LoadMainMenus();
        // $scope.LoadMenus();
        //$scope.GetDropCMSCategories();
        //$rootScope.LoadTreeMenu();
        //$scope.GetMenusByLevel();
        $scope.$state.current.data.pageTitle = "Quản lý danh mục tin tức sự kiện";
        $scope.ViewType = "LIST_FAQ";
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
                url: '/api/CMS_FAQ/Delete',
                data: obj
            }).then(function successCallback(response) {
                $scope.ListNewByMenu(false);
                toastr.warning('Xóa tin bài thành công !', 'Thông báo');
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });

        }
    }
    $scope.EditFAQ = function (FAQ) {
        $scope.ViewType = "EDIT_FAQ";
        $scope.itemError = null;
        //document.getElementById('file').value = '';
        if (FAQ != null) {

            $http({
                method: 'GET',
                url: '/api/CMS_FAQ/GetById',
                params: { id: FAQ.Id },
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.IsTopFAQ) {
                    $('#CreateTime').datepicker("setDate", new Date(moment($scope.item.FCreateTime).toJSON()));
                }
                if ($scope.item.SortContent != null) {

                    $('#summernote_Desc').summernote('code', $scope.item.SortContent);

                } else {

                    $('#summernote_Desc').summernote('code', '');
                }

                if ($scope.item.Content != null) {
                    $('#summernote_Content').summernote('code', $scope.item.Content);

                }
                else {
                    $('#summernote_Content').summernote('code', '');
                }
                //$scope.GetFilesByNew($scope.item.Id);
            }, function errorCallback(response) {
            });

        }
        else {
            var menu = $scope.CurrentMenu;
            $scope.item = {
                Menu: menu,
                Id: 0,
                SortContent: null,
                Content: null,
                Image: null,
                DisplayCreateTime: null
            }
            //$scope.NewForm.$setPristine();
            //$scope.NewForm.$setUntouched();
        }

        if ($scope.item.SortContent != null) {

            $('#summernote_Desc').summernote('code', $scope.item.SortContent);

        } else {

            $('#summernote_Desc').summernote('code', '');
        }

        if ($scope.item.Content != null) {
            $('#summernote_Content').summernote('code', $scope.item.Content);

        }
        else {
            $('#summernote_Content').summernote('code', '');
        }

        //return def.promise;
    }
    $scope.DeleteFile = function (file) {
        if (confirm('Tệp đính kèm này sẽ bị xóa, bạn có muốn thực hiện thao tác này?')) {
            if (file.Id != 0 && file.Id != null) {
                $http({
                    method: 'POST',
                    url: '/api/CMS_FAQ/DeleteFile',
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
            url: '/api/CMS_FAQ/GetFilesByFAQ',
            params: { FAQId: id },
        }).then(function successCallback(response) {
            $scope.itemFiles = response.data;

        }, function errorCallback(response) {
        });
    }
    $scope.CheckTopFAQ = function (isTop) {
        if (isTop) {
            $('#CreateTime').datepicker("setDate", new Date(moment().toJSON()));
        }
        else
            $scope.item.DisplayCreateTime = null;
    }
    $scope.CountByStatus = function (stt) {
        if ($scope.ListAllFAQ != null) {
            var filteredArray = $scope.ListAllFAQ.filter(function (obj) {
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
        $scope.ListNewByMenu($scope.ChoiceMenu, false);
    };
    $scope.Search = function () {
        $scope.ListNewByMenu(true);
    }
    $scope.ListNewByMenu = function (refresh) {
        if (refresh) {
            $scope.Paging.PageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_FAQ/GetFAQ',
            params: { pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize, searchKey: $scope.Paging.SearchKey },
        }).then(function successCallback(response) {
            $scope.ListFAQ = response.data.list;
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
            url: '/api/CMS_FAQ/GetByStatus',
            params: { status: status, pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize, searchKey: $scope.Paging.SearchKey },
        }).then(function successCallback(response) {
            $scope.ListFAQ = response.data.list;
            $scope.Paging.Total = response.data.total;
        }, function errorCallback(response) {

        });
    }

    $scope.MenuListFAQ = function () {
        $scope.item = {};
        $scope.itemFiles = [];
        $scope.ViewType = "LIST_FAQ";

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

    $scope.SaveFAQ = function () {
        $scope.item.Content = $('#summernote_Content').summernote('code');
        var data = {
            FAQ: $scope.item,
            Files: $scope.itemFiles
        };
        $http({
            method: 'POST',
            url: '/api/CMS_FAQ',
            data: data,
        }).then(function successCallback(response) {
            $scope.MenuListFAQ();
            if ($scope.item != 0) {
                $scope.ListNewByMenu(false);
            } else
                $scope.ListNewByMenu(true);
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            var text = '';
            if (!angular.isUndefined(response.data.ModelState.FName)) {
                $scope.NewForm.FName.$touched = true;
                $scope.NewForm.FName.$untouched = false;
                $scope.NewForm.FName.$valid = false;
                $scope.NewForm.FName.$invalid = true;
                text += response.data.ModelState.FName[0] + "<br>";
            }

            if (!angular.isUndefined(response.data.ModelState.FIndex)) {
                $scope.NewForm.FIndex.$touched = true;
                $scope.NewForm.FIndex.$untouched = false;
                $scope.NewForm.FIndex.$valid = false;
                $scope.NewForm.FIndex.$invalid = true;
                text += response.data.ModelState.FIndex[0] + "<br>";
            }
            toastr.error(text, "Lỗi cập nhật dữ liệu");
        });

    }

    $scope.GetAllFAQ = function () {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: '/api/CMS_FAQ/GetAllFAQ',
        }).then(function successCallback(response) {
            $scope.ListAllFAQ = response.data;
            debugger;
            def.resolve($scope.ListAllFAQ);
        }, function errorCallback(response) {
            def.reject(response.data);
        });
        return def.promise;
    }
}]);