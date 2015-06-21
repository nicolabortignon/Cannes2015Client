(function() {
    'use strict';

    var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);

    app.config(function(ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#00b9d7', '#008490', '#ff8c00', '#ff604a', '#d70000', '#93003f', '#4D5360'],
            responsive: true
        });
        // Configure all doughnut charts
        ChartJsProvider.setOptions('Doughnut', {
            animateRotate: false,
            animateScale: false,
            percentageInnerCutout: 10,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%=segments[i].value%></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

        });
    });

    app.controller('MenuCtrl', function($scope) {
        $scope.isCollapsed = true;
        $scope.charts = ['Line', 'Bar', 'Doughnut', 'Pie', 'Polar Area', 'Radar', 'Base'];
    });

    app.controller('LineCtrl', ['$scope', '$timeout',
        function($scope, $timeout) {
            $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
            $scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $scope.onClick = function(points, evt) {
                console.log(points, evt);
            };
            $scope.onHover = function(points) {
                if (points.length > 0) {
                    console.log('Point', points[0].value);
                } else {
                    console.log('No point');
                }
            };

            $timeout(function() {
                $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.data = [
                    [28, 48, 40, 19, 86, 27, 90],
                    [65, 59, 80, 81, 56, 55, 40]
                ];
                $scope.series = ['Series C', 'Series D'];
            }, 3000);
        }
    ]);

    app.controller('BarCtrl', ['$scope', '$timeout',
        function($scope, $timeout) {
            $scope.options = {
                scaleShowVerticalLines: false
            };
            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $timeout(function() {
                $scope.options = {
                    scaleShowVerticalLines: true
                };
            }, 3000);
        }
    ]);

    app.controller('TopPerCities', ['$scope', '$timeout', '$interval', '$http',
        function($scope, $timeout, $interval, $http) {
            var secondsPerIteration = 1;
            var numberInTop = 3;
            $scope.cities = []
            $http.get('http://146.148.2.249:3000/artworks/cities').
            success(function(data, status, headers, config) {
                $scope.cities = data;

                $interval(function() {
                    for (var i = 0; i < $scope.cities.length; i++) {

                        getTopPerCity($scope.cities[i].id, i);

                    }

                }, secondsPerIteration * 1000);




            })

            function getTopPerCity(id, i) {
                $http.get('http://146.148.2.249:3000/artworks/topPerCity/' + numberInTop + "/" + id).
                success(function(data, status, headers, config) {

                    $scope.cities[i].top = data;


                })
            }


        }
    ]);

    app.controller('DoughnutCtrl', ['$scope', '$timeout', '$interval', '$http',

        function($scope, $timeout, $interval, $http) {

            var secondsPerIteration = 3;
            $scope.labels = [''];
            $scope.labelsShare = ['Twitter', 'Facebook', 'Google Plus'];




            $interval(function() {
                getExperienceByProfile();
                getExperienceByCity();
                getExperienceShare();
            }, secondsPerIteration * 1000);

            getExperienceShare();
            getExperienceByProfile();
            getExperienceByCity();

            function getExperienceShare() {
                $http.get('http://146.148.2.249:3000/artworks/social/countSocial/').
                success(function(data, status, headers, config) {

                    $scope.dataShares = [data[0].Twitter, data[0].Facebook, data[0].GooglePlus];

                })

            }

            function getExperienceByProfile() {
                $http.get('http://146.148.2.249:3000/artworks/experiences/byProfile/').
                success(function(data, status, headers, config) {
                    $scope.labels = [];
                    $scope.data = [];
                    for (var i = 0; i < data.count.length; i++) {
                        $scope.labels.push(data.rows[i].Profile.name)

                        $scope.data.push(data.count[i].count)
                    }
                })
            }

            function getExperienceByCity() {
                $http.get('http://146.148.2.249:3000/artworks/experiences/byCity/').
                success(function(data, status, headers, config) {
                    $scope.labelsCity = [];
                    $scope.dataCity = [];
                    for (var i = 0; i < data.count.length; i++) {
                        $scope.labelsCity.push(data.rows[i].City.name)

                        $scope.dataCity.push(data.count[i].count)
                    }
                })

            }


        }
    ]);

    app.controller('PieCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        $scope.data = [300, 500, 100];
    });

    app.controller('PolarAreaCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
    });

    app.controller('BaseCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
        $scope.type = 'PolarArea';

        $scope.toggle = function() {
            $scope.type = $scope.type === 'PolarArea' ? 'Pie' : 'PolarArea';
        };
    });

    app.controller('RadarCtrl', function($scope) {
        $scope.labels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };
    });

    app.controller('StackedBarCtrl', function($scope) {
        $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.type = 'StackedBar';

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];
    });

    app.controller('DataTablesCtrl', function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colours = [{ // grey
            fillColor: 'rgba(148,159,177,0.2)',
            strokeColor: 'rgba(148,159,177,1)',
            pointColor: 'rgba(148,159,177,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,177,0.8)'
        }, { // dark grey
            fillColor: 'rgba(77,83,96,0.2)',
            strokeColor: 'rgba(77,83,96,1)',
            pointColor: 'rgba(77,83,96,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(77,83,96,1)'
        }];
        $scope.randomize = function() {
            $scope.data = $scope.data.map(function(data) {
                return data.map(function(y) {
                    y = y + Math.random() * 10 - 5;
                    return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
                });
            });
        };
    });

    app.controller('TicksCtrl', ['$scope', '$interval', '$http',

        function($scope, $interval, $http) {
            var maximum = 60;
            var secondsPerIteration = 20;
            $scope.visits = [
                []
            ];
            $scope.likes = [
                []
            ];

            $scope.labels = [];
            $scope.labelsLike = [];
            $scope.options = {
                animation: false,
                showScale: true,
                showTooltips: false,
                pointDot: true,
                datasetStrokeWidth: 0.5
            };

            // Update the dataset at 25FPS for a smoothly-animating chart
            $interval(function() {
                getViewsLiveData();
                getLikesLiveData();
            }, secondsPerIteration * 1000);

            getLikesLiveData();
            getViewsLiveData();

            function getViewsLiveData() {
                $http.get('http://146.148.2.249:3000/artworks/visits/inTheLastSecond/' + secondsPerIteration).
                success(function(data, status, headers, config) {
                    if ($scope.visits[0].length) {
                        $scope.labels = $scope.labels.slice(1);
                        $scope.visits[0] = $scope.visits[0].slice(1);
                    }
                    while ($scope.visits[0].length < maximum) {
                        $scope.labels.push('');
                        $scope.visits[0].push(data.count);

                    }
                })
            }

            function getLikesLiveData() {
                $http.get('http://146.148.2.249:3000/artworks/likes/inTheLastSecond/' + secondsPerIteration).
                success(function(data, status, headers, config) {
                    if ($scope.likes[0].length) {
                        $scope.labelsLike = $scope.labelsLike.slice(1);
                        $scope.likes[0] = $scope.likes[0].slice(1);
                    }
                    while ($scope.likes[0].length < maximum) {
                        $scope.labelsLike.push('');
                        $scope.likes[0].push(data.count);
                    }
                })
            }
        }
    ]);


})();