<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>CHApp | Home</title>
    <link rel="icon" href="https://project-chai.org/images/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Anaheim%7cQuattrocento&#43;Sans:400,700&amp;display=swap">
    <style>
    html {
        /* Verdana, Trebuchet MS, Arial, Helvetica, Tahoma */
        font-family: "quattrocento sans", sans-serif;
        background-color: #252b31;
    	color: #afbac4
    }

    body {
        margin: 0;
    }

    header {
        height: 100px;
        background-color: #1d2024;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    header img {
        vertical-align: center;
    }

    header h1 {
        text-align: center;
        font-size: 2.8rem;
        color: #ffffff;
        font-weight: 700;
    }

    h2 {
        font-size: 1.6rem;
        color: #57cbcc;
    }

    h1, h2 {
        font-weight: 400;
    }

    footer {
        height: 100px;
        text-align: center;
        font-size: 0.8rem;
    }

    section {
        display: flex;
        flex-flow: row wrap;
        font-size: 1.0rem;
        margin: 10px;
    }

    article {
        background: #353b43;
        flex: 1400px;
        padding: 25px;
        margin: 10px;
    }

    .chart-container {
        height: 300px;
        flex: 0 0 auto;
        width: 95%;
    }

    .status {
        height: 10px;
        width: 10px;
        background-color: #afbac4;
        border-radius: 50%;
        display: inline-block;
    }

    .status.online {
        background-color: #00ff00;
    }

    .status.offline {
        background-color: #ff0000;
    }
    </style>
</head>
<body>
    <header>
        <h1>CHApp</h1>
        <img src="https://project-chai.org/images/logo.png" alt="CHAI Project" height="42"/>
    </header>

    <section>
        <article>
            <h2>Electricity Prices</h2>

            <div class="chart-container">
                <canvas id="priceChart"></canvas>
            </div>

            <p id="priceConsole"></p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus ipsum viverra ante imperdiet, non venenatis erat egestas. Phasellus sed consectetur nibh. Fusce eu laoreet velit, non molestie justo. Maecenas non est fermentum, consequat magna vel, tincidunt libero. Curabitur venenatis lorem ultrices lorem malesuada commodo. Pellentesque vel nisi vel arcu efficitur venenatis. Sed finibus, mauris ac congue pellentesque, ligula leo faucibus elit, quis convallis odio massa nec purus. Cras vestibulum, tellus sit amet ultricies accumsan, augue sapien cursus tellus, sed posuere quam nisi sed elit. Aliquam sed lacinia nisl. In maximus consectetur tempor. Curabitur sed felis at mi pulvinar dapibus vitae quis mi. Sed justo nulla, tempor sit amet rutrum ac, consectetur ac quam.</p>
        </article>

        <article>
            <h2>Electricity Consumption</h2>

            <div class="chart-container">
                <canvas id="consumptionChart"></canvas>
            </div>

            <p id="consumptionConsole"></p>

            <p>In lorem nunc, dapibus ac euismod sit amet, bibendum id augue. Donec sed libero non metus facilisis tincidunt. Donec vel elit vel ante suscipit scelerisque. Proin eu consectetur leo. Duis porta tempor lectus, nec sagittis sapien vestibulum et. Phasellus cursus volutpat orci. Sed blandit euismod elementum. Morbi quis nunc nisi. Vestibulum quis varius nunc. Praesent leo quam, bibendum vitae nisi non, finibus posuere erat. Ut malesuada purus ligula, vitae mattis risus accumsan id. Donec nec velit ut sem feugiat vestibulum. Nulla sagittis tortor in diam interdum varius. Sed aliquet accumsan tempus. Sed sed metus nec ipsum eleifend consectetur in et libero. Integer tellus ipsum, semper a tincidunt vitae, maximus et ante.</p>
        </article>

        <article>
            <h2>Battery Charge</h2>

            <div class="chart-container">
                <canvas id="batteryChart"></canvas>
            </div>

            <p id="batteryConsole"></p>

            <p>Vestibulum facilisis dolor et quam luctus, et scelerisque dui maximus. Aenean in venenatis lacus. Sed libero mauris, consectetur vestibulum varius a, efficitur id diam. Maecenas at dui sit amet eros convallis volutpat. Donec a eleifend tellus. Sed convallis sapien non vestibulum feugiat. Donec ac velit magna. Vivamus vestibulum euismod nisl, imperdiet gravida mi. Morbi quis sollicitudin risus, quis feugiat urna. Pellentesque eget consectetur ipsum. Ut ut aliquam elit, et eleifend lacus. Sed semper ipsum a massa hendrerit, non luctus arcu semper.</p>
        </article>

        <article>
            <h2>Electricity Costs</h2>

            <div class="chart-container">
                <canvas id="costChart"></canvas>
            </div>

            <p id="costConsole"></p>

            <p>Sed dignissim ultricies nisi, quis tincidunt augue faucibus non. Proin tristique sapien vitae purus porta viverra. Nam ut cursus ex, vel lobortis neque. Phasellus ultrices felis et consequat tempus. Nunc non tincidunt eros. Quisque in magna tortor. Integer convallis ut lacus id mollis. Nulla et magna aliquam, posuere mi eu, lobortis odio. Pellentesque egestas lorem ac tellus luctus volutpat. Maecenas in turpis in nisi maximus efficitur id sed enim. Mauris tristique nunc non eros feugiat, sed imperdiet tellus malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam luctus velit eu accumsan maximus. Aliquam porttitor a ante sit amet rutrum. Sed luctus ipsum quam, at consectetur est congue sed. In bibendum egestas neque suscipit rhoncus.</p>
        </article>
    </section>

    <footer>
        <p>
        <?php
            $output = shell_exec("pgrep -a 'python'");

            function status($name) {
            	global $output;
                echo "$name <span class=";
            	if (strpos($output, $name) !== false) {
            		echo "'status online'";
            	} else {
            		echo "'status offline'";
            	}
            	echo "></span>";
            }

            status("chapp-battery");
            echo "&nbsp;&nbsp";
            status("chapp-api");
            echo "&nbsp;&nbsp";
            status("chapp-plug/service");
            echo "&nbsp;&nbsp";
            status("chapp-plug/api");
        ?>
        </p>
        <p id="footerConsole"></p>
        <p>Copyright © 2021 CHAI Project</p>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@0.1.1"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
    <script>
    const api_host = "http://" + window.location.hostname + ":8080"
    // const api_host = "http://192.168.0.44:8080"
    // const api_host = "http://0.0.0.0:8080"

    Chart.defaults.font.family = "quattrocento sans";
    Chart.defaults.font.size = 12;
    Chart.defaults.borderColor = "#1d2024";
    Chart.defaults.color = "#afbac4";

    // red: 255, 99, 132
    // aqua: 75, 192, 192
    // blue: 54, 162, 235
    // purple: 153, 102, 255
    // orange: 255, 159, 64
    // yellow: 255, 205, 86
    // grey: 201, 203, 207

    let priceChart = new Chart(
        document.getElementById("priceChart").getContext("2d"),
        {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Import (Actual)",
                        yAxisID: "A",
                        data: [],
                        // fill: true,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    },
                    {
                        label: "Import (Forecast)",
                        yAxisID: "A",
                        data: [],
                        // fill: true,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    },
                    {
                        label: "Export (Actual)",
                        yAxisID: "A",
                        data: [],
                        fill: true,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    },
                    {
                        label: "Export (Forecast)",
                        yAxisID: "A",
                        data: [],
                        fill: true,
                        backgroundColor: "rgba(153, 102, 255, 0.2)",
                        borderColor: "rgba(153, 102, 255)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                            stepSize: 1,
                            tooltipFormat: "HH:mm, ddd D MMM YYYY",
                            displayFormats: {
                                "day": "ddd D MMM"
                            }
                        }
                    },
                    A: {
                        type: "linear",
                        position: "left",
                        title: {
                            text: "p/kWh",
                            display: true
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || "";

                                if (label) {
                                    label += ": ";
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2) + "p/kWh";
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        }
    );

    let consumptionChart = new Chart(
        document.getElementById("consumptionChart").getContext("2d"),
        {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Actual",
                        yAxisID: "A",
                        data: [],
                        fill: true,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    },
                    {
                        label: "Forecast",
                        yAxisID: "A",
                        data: [],
                        fill: true,
                        backgroundColor: "rgba(201, 203, 207, 0.2)",
                        borderColor: "rgba(201, 203, 207)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                            stepSize: 1,
                            tooltipFormat: "HH:mm, ddd D MMM YYYY",
                            displayFormats: {
                                "day": "ddd D MMM"
                            }
                        }
                    },
                    A: {
                        type: "linear",
                        position: "left",
                        title: {
                            text: "kWh",
                            display: true
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || "";

                                if (label) {
                                    label += ": ";
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(5) + " kWh";
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        }
    );

    let batteryChart = new Chart(
        document.getElementById("batteryChart").getContext("2d"),
        {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Actual",
                        yAxisID: "A",
                        data: [],
                        fill: true,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    },
                    {
                        label: "Planned",
                        yAxisID: "A",
                        data: [],
                        fill: true,
                        backgroundColor: "rgba(255, 159, 64, 0.2)",
                        borderColor: "rgba(255, 159, 64)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                            stepSize: 1,
                            tooltipFormat: "HH:mm, ddd D MMM YYYY",
                            displayFormats: {
                                "day": "ddd D MMM"
                            }
                        }
                    },
                    A: {
                        type: "linear",
                        position: "left",
                        title: {
                            text: "kWh",
                            display: true
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || "";

                                if (label) {
                                    label += ": ";
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2) + " kWh";
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        }
    );

    let costChart = new Chart(
        document.getElementById("costChart").getContext("2d"),
        {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Standard",
                        yAxisID: "A",
                        data: [],
                        // fill: true,
                        backgroundColor: "rgba(153, 102, 255, 0.2)",
                        borderColor: "rgba(153, 102, 255)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    },
                    {
                        label: "Optimised",
                        yAxisID: "A",
                        data: [],
                        // fill: true,
                        backgroundColor: "rgba(255, 205, 86, 0.2)",
                        borderColor: "rgba(255, 205, 86)",
                        borderWidth: 0.5,
                        stepped: "middle",
                        pointRadius: 1,
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                            stepSize: 1,
                            tooltipFormat: "HH:mm, ddd D MMM YYYY",
                            displayFormats: {
                                "day": "ddd D MMM"
                            }
                        }
                    },
                    A: {
                        type: "linear",
                        position: "left",
                        title: {
                            text: "p",
                            display: true
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label.split(" ")[0] || "";

                                if (label) {
                                    label += ": ";
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2) + "p";
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        }
    );

    function updatePriceChart() {
        fetch(api_host + "/price").then(
            function(response) {
                if (response.status == 200) {
                    response.json().then(
                        function(data) {
                            var actual_import_prices = [];
                            var forecast_import_prices = [];
                            var actual_export_prices = [];
                            var forecast_export_prices = [];
                            for (let i = 0; i < data.length; i++) {
                                var timestamp = data[i]["timestamp"];
                                var import_price = data[i]["import_price"];
                                if (import_price != null && import_price["value"] != null) {
                                    if (import_price["type"] == "actual") {
                                        actual_import_prices.push({
                                            x: timestamp,
                                            y: import_price["value"]
                                        });
                                    } else if (import_price["type"] == "forecast") {
                                        forecast_import_prices.push({
                                            x: timestamp,
                                            y: import_price["value"]
                                        });
                                    }
                                }
                                var export_price = data[i]["export_price"];
                                if (export_price != null && export_price["value"] != null) {
                                    if (export_price["type"] == "actual") {
                                        actual_export_prices.push({
                                            x: timestamp,
                                            y: export_price["value"]
                                        });
                                    } else if (export_price["type"] == "forecast") {
                                        forecast_export_prices.push({
                                            x: timestamp,
                                            y: export_price["value"]
                                        });
                                    }
                                }
                            }
                            priceChart.data.datasets[0].data = actual_import_prices;
                            priceChart.data.datasets[1].data = forecast_import_prices;
                            priceChart.data.datasets[2].data = actual_export_prices;
                            priceChart.data.datasets[3].data = forecast_export_prices;
                            priceChart.update();
                        }
                    );
                }
            }
        ).catch(
            function(err) {
                document.getElementById("priceConsole").innerHTML = "Error = " + err;
            }
        )
    }

    function updateConsumptionChart() {
        fetch(api_host + "/consumption").then(
            function(response) {
                if (response.status == 200) {
                    response.json().then(
                        function(data) {
                            var actual_consumptions = [];
                            var forecast_consumptions = [];
                            for (let i = 0; i < data.length; i++) {
                                var timestamp = data[i]["timestamp"];
                                var consumption = data[i]["consumption"];
                                if (consumption != null && consumption["value"] != null) {
                                    if (consumption["type"] == "actual") {
                                        actual_consumptions.push({
                                            x: timestamp,
                                            y: consumption["value"]
                                        });
                                    } else if (consumption["type"] == "forecast") {
                                        forecast_consumptions.push({
                                            x: timestamp,
                                            y: consumption["value"]
                                        });
                                    }
                                }
                            }
                            consumptionChart.data.datasets[0].data = actual_consumptions;
                            consumptionChart.data.datasets[1].data = forecast_consumptions;
                            consumptionChart.update();
                        }
                    );
                }
            }
        ).catch(
            function(err) {
                document.getElementById("consumptionConsole").innerHTML = "Error = " + err;
            }
        )
    }

    function toPounds(pence) {
        return +(Math.round((pence / 100) + "e+2")  + "e-2");
    }

    function updatePlanningCharts() {
        fetch(api_host + "/planning").then(
            function(response) {
                if (response.status == 200) {
                    response.json().then(
                        function(data) {
                            var actual_battery_level = [];
                            var planned_battery_level = [];
                            var standard_cost = [];
                            var optimised_cost = [];
                            var standard_cost_total = 0;
                            var optimised_cost_total = 0;
                            for (let i = 0; i < data.length; i++) {
                                var timestamp = data[i]["timestamp"];
                                var type = data[i]["type"];
                                var battery_level = data[i]["battery_level"]["start"];
                                if (type == "actual") {
                                    actual_battery_level.push({
                                        x: timestamp,
                                        y: battery_level
                                    });
                                } else if (type == "planned") {
                                    planned_battery_level.push({
                                        x: timestamp,
                                        y: battery_level
                                    });
                                }
                                var cost = data[i]["cost"];
                                standard_cost.push({
                                    x: timestamp,
                                    y: cost["standard"]
                                });
                                optimised_cost.push({
                                    x: timestamp,
                                    y: cost["optimised"]
                                });
                                standard_cost_total += cost["standard"];
                                optimised_cost_total += cost["optimised"];
                            }
                            batteryChart.data.datasets[0].data = actual_battery_level;
                            batteryChart.data.datasets[1].data = planned_battery_level;
                            batteryChart.update();
                            costChart.data.datasets[0].data = standard_cost;
                            costChart.data.datasets[1].data = optimised_cost;
                            costChart.data.datasets[0].label = "Standard (£" + toPounds(standard_cost_total) + ")";
                            costChart.data.datasets[1].label = "Optimised (£" + toPounds(optimised_cost_total) + ")";
                            costChart.update();
                        }
                    );
                }
            }
        ).catch(
            function(err) {
                document.getElementById("batteryConsole").innerHTML = "Error = " + err;
                document.getElementById("costConsole").innerHTML = "Error = " + err;
            }
        )
    }

    updatePriceChart();
    updateConsumptionChart();
    updatePlanningCharts();

    setInterval(updatePriceChart, 1800000); // 1000*60*30
    setInterval(updateConsumptionChart, 300000); // 1000*60*5
    setInterval(updatePlanningCharts, 300000); // 1000*60*5
    </script>
</body>
</html>
