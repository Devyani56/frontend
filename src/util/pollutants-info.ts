const pollutantsInfo = [
    {
        "name": "PM10",
        "unit": "µg/m³",
        "safeLevel": 50,
        "moderateLevel": 100,
        "unhealthyLevel": 250,
    },

    {
        "name": "PM2.5",
        "unit": "µg/m³",
        "safeLevel": 25,
        "moderateLevel": 50,
        "unhealthyLevel": 125,
    },

    {
        "name": "NO2",
        "unit": "µg/m³",
        "safeLevel": 40,
        "moderateLevel": 80,
        "unhealthyLevel": 200,
    },

    {
        "name": "CO",
        "unit": "mg/m³",
        "safeLevel": 1,
        "moderateLevel": 2,
        "unhealthyLevel": 10,
    },

    {
        "name": "SO2",
        "unit": "µg/m³",
        "safeLevel": 40,
        "moderateLevel": 80,
        "unhealthyLevel": 380,
    },

    {
        "name": "O3",
        "unit": "µg/m³",
        "safeLevel": 50,
        "moderateLevel": 100,
        "unhealthyLevel": 168,
    },

    {
        "name": "NH3",
        "unit": "µg/m³",
        "safeLevel": 200,
        "moderateLevel": 400,
        "unhealthyLevel": 2000,
    },

    {
        "name": "AQI",
        "unit": "",
        "safeLevel": 50,
        "moderateLevel": 100,
        "unhealthyLevel": 200,
    },

    {
        "name": "AQI",
        "unit": "",
        "safeLevel": 50,
        "moderateLevel": 100,
        "unhealthyLevel": 200,
    },
]

const pollutantNames = ["PM10", "PM2.5", "NO2", "CO", "SO2", "O3", "NH3", "AQI"]


export { pollutantsInfo, pollutantNames}
