function createGrafanaPanelObject(
    metric,
    datasource,
    graphType
) {
    // Create a panel object to be used within dashboards.
    const panel = {
        "datasource": datasource,
        "fieldConfig": {
            "defaults": {
                "color": {
                    "mode": "palette-classic"
                },
                "custom": {
                    "axisCenteredZero": false,
                    "axisColorMode": "text",
                    "axisLabel": "",
                    "axisPlacement": "auto",
                    "barAlignment": 0,
                    "drawStyle": "line",
                    "fillOpacity": 40,
                    "gradientMode": "opacity",
                    "hideFrom": {
                        "legend": false,
                        "tooltip": false,
                        "viz": false
                    },
                    "lineInterpolation": "smooth",
                    "lineWidth": 2,
                    "pointSize": 5,
                    "scaleDistribution": {
                        "type": "linear"
                    },
                    "showPoints": "auto",
                    "spanNulls": false,
                    "stacking": {
                        "group": "A",
                        "mode": "none"
                    },
                    "thresholdsStyle": {
                        "mode": "off"
                    }
                },
                "mappings": [],
                "thresholds": {
                    "mode": "absolute",
                    "steps": [
                        {
                            "color": "green",
                            "value": null
                        },
                        {
                            "color": "red",
                            "value": 80
                        }
                    ]
                },
                "min": 0
            },
            "overrides": []
        },
        "gridPos": {
            "h": 8,
            "w": 12,
            "x": 0,
            "y": 0
        },
        "options": {
            "legend": {
                "calcs": [],
                "displayMode": "list",
                "placement": "bottom",
                "showLegend": true
            },
            "tooltip": {
                "mode": "single",
                "sort": "none"
            },
            // "displayLabels": [
            //     "percent"
            // ]

        },
        "id": 1,
        "targets": [{
            "datasource": datasource,
            "editorMode": "builder",
            "expr": metric.metric.replace(/.*\/.*\//g, ''),
            "instant": false,
            "range": true,
            "refId": "A"
        }],
        "title": metric.metric.replace(/.*\/.*\//g, ''),
        "type": graphType,
        "interval": "2s"
    }
    return panel;
}

function updateGrafanaPanelObject(
    metric,
    datasource,
    graphType
) {
    // Create a panel object to be used within dashboards.
    const panel = {
        "datasource": datasource,
        "fieldConfig": {
            "defaults": {
                "color": {
                    "mode": "palette-classic"
                },
                "custom": {
                    "axisCenteredZero": false,
                    "axisColorMode": "text",
                    "axisLabel": "",
                    "axisPlacement": "auto",
                    "barAlignment": 0,
                    "drawStyle": "line",
                    "fillOpacity": 40,
                    "gradientMode": "opacity",
                    "hideFrom": {
                        "legend": false,
                        "tooltip": false,
                        "viz": false
                    },
                    "lineInterpolation": "smooth",
                    "lineWidth": 2,
                    "pointSize": 5,
                    "scaleDistribution": {
                        "type": "linear"
                    },
                    "showPoints": "auto",
                    "spanNulls": false,
                    "stacking": {
                        "group": "A",
                        "mode": "none"
                    },
                    "thresholdsStyle": {
                        "mode": "off"
                    }
                },
                "mappings": [],
                "thresholds": {
                    "mode": "absolute",
                    "steps": [
                        {
                            "color": "green",
                            "value": null
                        },
                        {
                            "color": "red",
                            "value": 80
                        }
                    ]
                },
                "min": 0
            },
            "overrides": []
        },
        "gridPos": {
            "h": 8,
            "w": 12,
            "x": 0,
            "y": 0
        },
        "options": {
            "legend": {
                "calcs": [],
                "displayMode": "list",
                "placement": "bottom",
                "showLegend": true
            },
            "tooltip": {
                "mode": "single",
                "sort": "none"
            },
            "displayLabels": [
                "percent"
            ]
        },
        "id": 1,
        "targets": [{
            "datasource": datasource,
            "editorMode": "builder",
            "expr": metric.replace(/.*\/.*\//g, ''),
            "instant": false,
            "range": true,
            "refId": "A"
        }],
        "title": metric.replace(/.*\/.*\//g, ''),
        "type": graphType,
        "interval": "2s"
    }
    return panel;
}

module.exports = { createGrafanaPanelObject, updateGrafanaPanelObject };