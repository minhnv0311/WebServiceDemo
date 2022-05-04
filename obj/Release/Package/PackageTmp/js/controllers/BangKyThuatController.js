angular.module('WebApiApp').controller('BangKyThuatController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {

    $scope.getPriceHistory = function (machungkhoan) {
        $scope.openSearch = "";
        $http({
            method: 'GET',
            url: '/Stock/GetPriceHistory?machungkhoan=' + machungkhoan,
        }).then(function successCallback(response) {
            $scope.BuildChart(response.data);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {

        });
    }

    $scope.barcodeKeyup = function (event) {
        if (event.keyCode == 13) {
            $http({
                method: 'GET',
                url: '/Stock/MaChungKhoan?strSearch=' + $scope.searchBarcode,
            }).then(function successCallback(response) {
                $scope.listCK = response.data;

            }, function errorCallback(response) {

            });
        }
        else {
            if ($scope.searchBarcode != "" && $scope.searchBarcode != undefined) {
                $scope.openSearch = "open";
                $http({
                    method: 'GET',
                    url: '/Stock/MaChungKhoan?strSearch=' + $scope.searchBarcode,

                }).then(function successCallback(response) {
                    $scope.listCK = response.data;
                    
                }, function errorCallback(response) {

                });
            }
            else {
                $scope.openSearch = "";
            }
        }
    };


    $scope.$on('$viewContentLoaded', function () {
        //$scope.getPriceHistory();

    });

    $scope.BuildChart = function (dataPrice) {
        am4core.ready(function () {

            am4core.useTheme(am4themes_animated);

            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.paddingRight = 20;
            chart.leftAxesContainer.layout = "vertical";

            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.skipEmptyPeriods = true;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;

            var series = chart.series.push(new am4charts.CandlestickSeries());
            series.dataFields.dateX = "Date";
            series.dataFields.valueY = "close";
            series.dataFields.openValueY = "open";
            series.dataFields.lowValueY = "low";
            series.dataFields.highValueY = "high";
            series.tooltipText = "Open: {openValueY.value}\nLow: {lowValueY.value}\nHigh: {highValueY.value}\nClose: {valueY.value}";
            series.riseFromPreviousState.properties.fillOpacity = 1;
            series.dropFromPreviousState.properties.fillOpacity = 0;

            //var seriesLine = chart.series.push(new am4charts.LineSeries());
            //seriesLine.dataFields.valueY = "close_trungbinh";
            //seriesLine.dataFields.dateX = "Date";
            ////seriesLine.strokeWidth = 2;
            ////seriesLine.minBulletDistance = 10;
            //seriesLine.tooltipText = "{valueY}";
            //seriesLine.tooltip.pointerOrientation = "vertical";
            //seriesLine.tooltip.background.cornerRadius = 20;
            //seriesLine.tooltip.background.fillOpacity = 0.2;
            //seriesLine.tooltip.label.padding(12, 12, 12, 12)

            // important!
            // candlestick series colors are set in states. 
            // series.riseFromOpenState.properties.fill = am4core.color("#00ff00");
            // series.dropFromOpenState.properties.fill = am4core.color("#FF0000");
            // series.riseFromOpenState.properties.stroke = am4core.color("#00ff00");
            // series.dropFromOpenState.properties.stroke = am4core.color("#FF0000");

            

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panX";

            // a separate series for scrollbar
            var lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.dataFields.dateX = "Date";
            lineSeries.dataFields.valueY = "close";
            // need to set on default state, as initially series is "show"
            lineSeries.defaultState.properties.visible = false;

            // hide from legend too (in case there is one)
            lineSeries.hiddenInLegend = true;
            lineSeries.fillOpacity = 0.5;
            lineSeries.strokeOpacity = 0.5;

            var scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(lineSeries);
            chart.scrollbarX = scrollbarX;



            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis2.tooltip.disabled = true;
            // height of axis
            valueAxis2.height = am4core.percent(35);
            valueAxis2.zIndex = 3
            // this makes gap between panels
            valueAxis2.marginTop = 50;
            valueAxis2.renderer.baseGrid.disabled = true;
            valueAxis2.renderer.inside = true;
            valueAxis2.renderer.labels.template.verticalCenter = "bottom";
            valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
            //valueAxis.renderer.maxLabelPosition = 0.95;
            valueAxis2.renderer.fontSize = "0.8em"

            valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
            valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

            var series2 = chart.series.push(new am4charts.ColumnSeries());
            series2.dataFields.dateX = "Date";
            series2.dataFields.valueY = "volumn";
            series2.yAxis = valueAxis2;
            series2.tooltipText = "{valueY.value}";
            series2.name = "MSFT: Volume";
            // volume should be summed
            //series2.groupFields.valueY = "sum";
            series2.defaultState.transitionDuration = 0;


            chart.data = dataPrice;

        }); // end am4core.ready()
    }

}]);