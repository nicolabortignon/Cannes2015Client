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

    app.controller('BarCtrl', ['$scope', '$timeout', '$interval', '$http',
        function($scope, $timeout, $interval, $http) {
            var secondsPerIteration = 10;
            $scope.options = {
                scaleShowVerticalLines: false
            };
            $scope.labels = ['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'];
            $scope.series = ['Visits', 'Likes'];
            $scope.data = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];



            $interval(function() {
                getViewsLiveData();
                getLikesLiveData();
            }, secondsPerIteration * 1000);

            getLikesLiveData();
            getViewsLiveData();

            function getViewsLiveData() {
                $http.get('http://146.148.2.249:3000/artworks/last24Visits').
                success(function(data, status, headers, config) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.data[0][data[i].h] = data[i].count;
                    }

                })
            }

            function getLikesLiveData() {
                $http.get('http://146.148.2.249:3000/artworks/last24Likes').
                success(function(data, status, headers, config) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.data[1][data[i].h] = data[i].count;
                    }

                })
            }
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


                    //var colorRGBArray = colorThief.getColor(document.getElementById("colorImage"));

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

    app.controller('MostPredominantColor', function($scope, $interval, $http) {


        var secondsPerIteration = 5;
        var numberInTop = 1;
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


                // ROUTINE FOR CHECKING THE IMAGES PATTERN!!!
                // 
                var colorThief = new ColorThief();
                $scope.cities[i].top[0].imageURL;

                $('#imageHolder').append($('<img>', {
                    src: "http://146.148.2.249/" + data[0].imageURL,
                    id: "colorImage" + i,
                    alt: "Test Image",
                    title: "Test Image"
                }));

                $('#colorImage' + i).load(function() {

                    var colorThief = new ColorThief();
                    var colorPallet = colorThief.getPalette(document.getElementById("colorImage" + i), 5);
                    $("#colorImage" + i).remove()
                    $scope.cities[i].colors = []

                    for (var k = 0; k < colorPallet.length; k++) {
                        $scope.cities[i].colors.push(increase_brightness(rgbToHex(colorPallet[k][0], colorPallet[k][1], colorPallet[k][2]), 20))
                    }



                    // document.getElementById("invitation2").style.webkitFilter = "hue-rotate(" + adjustValueForDCLK + "deg)";
                    // document.getElementById("lb_anim2").style.webkitFilter = "hue-rotate(-" + adjustValueForDCLK + "deg)";

                });


            })
        }
    });


    app.controller('CannesWinningColor', function($scope, $interval, $http) {


        var secondsPerIteration = 5;
        var numberInTop = 1;
        $scope.cities = []

        getTopColor();

        function getTopColor(id) {
            var secondsPerIteration = 5;

            $interval(function() {


                $http.get('http://146.148.2.249:3000/artworks/topOverAll/1').
                success(function(data, status, headers, config) {
                    $scope.topColor = " NAN"
                    $scope.top = data;


                    // ROUTINE FOR CHECKING THE IMAGES PATTERN!!!
                    // 
                    var colorThief = new ColorThief();


                    $('#imageHolder').append($('<img>', {
                        src: "http://146.148.2.249/" + data[0].imageURL,
                        id: "topImage",
                        alt: "Test Image",
                        title: "Test Image"
                    }));

                    $('#topImage').load(function() {

                        var colorThief = new ColorThief();
                        var color = colorThief.getColor(document.getElementById("topImage"), 10);
                        $scope.topColor = rgbToHex(color[0], color[1], color[2])
                        $scope.topBrighter = increase_brightness($scope.topColor, 20)
                        $("#topImage").remove()

                    });


                })

            }, secondsPerIteration * 1000);
        }
    });


    app.controller('RadarCtrl', function($scope, $interval, $http) {
        $scope.labels = ['New York', 'West Coast', 'Europe', 'Africa', 'India', 'East Asia', ["test"]];

        var secondsPerIteration = 5;

        $interval(function() {
            getCityPerProfile();
        }, secondsPerIteration * 1000);

        getCityPerProfile();

        function getCityPerProfile() {
            $http.get('http://146.148.2.249:3000/artworks/CityPreferencePerProfile/').
            success(function(data, status, headers, config) {
                $scope.data = [
                    data[0].city,
                    data[1].city,
                    data[2].city,
                    data[3].city,
                    data[4].city,
                    data[5].city
                ]
            })
        }



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


    app.controller('generalStats', ['$scope', '$interval', '$http',

        function($scope, $interval, $http) {

            var secondsPerIteration = 1;
            $scope.totalVisits = 0;
            $scope.totalShares = 0;
            $scope.totalExperiences = 0;

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
                getTotalVisits();
                getTotalLikes();
                getTotalExperiences()
            }, secondsPerIteration * 1000);

            getTotalVisits();
            getTotalLikes();
            getTotalExperiences()

            function getTotalVisits() {
                $http.get('http://146.148.2.249:3000/artworks/totalVisits').
                success(function(data, status, headers, config) {
                    $scope.totalVisits = data.count;
                })
            }

            function getTotalLikes() {
                $http.get('http://146.148.2.249:3000/artworks/totalLikes').
                success(function(data, status, headers, config) {

                    $scope.totalShares = data[0].twitter + data[0].facebook + data[0].googlePlus + data[0].likes;
                })
            }


            function getTotalExperiences() {
                $http.get('http://146.148.2.249:3000/artworks/totalExperiences').
                success(function(data, status, headers, config) {
                    console.log(data)
                    $scope.totalExperiences = data.count;
                })
            }
        }
    ]);
    app.controller('randomPicture', ['$scope', '$interval', '$http',

        function($scope, $interval, $http) {
            $scope.picture
            var secondsPerIteration = 70;




            // Update the dataset at 25FPS for a smoothly-animating chart
            $interval(function() {
                randomPicture();

            }, secondsPerIteration * 1000);

            randomPicture()

            function randomPicture() {
                $http.get('http://146.148.2.249:3000/artworks/randomPicture').
                success(function(data, status, headers, config) {
                    $scope.picture = data;
                })
            }

        }
    ]);

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