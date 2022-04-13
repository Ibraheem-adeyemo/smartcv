# App Chart
Contains the chart components used by the ***PAAS UI***. All charts leverage on chart,js library from npm. The components used in here too are re-usable for the application. Charts Components used by the application are:
- barchart

    Creates a barchart representation of values. Its component properties are:
    - labels: string[],

        array of the labels
    - data: StatsC[],

        Based on the dimension of array sent it provides different levels of barcharts
- canvas

    Used by barchart and donut. it's a canvas element created by chakra as as to enable to still use chakra properties.
- donut

    Create a donut chart representation of values. Its component properties are:
    - data: number[];
    
        array of values in numbers
    - labels: string[];

        Label for each value
    - backgroundColor: string[];
        
        Background Color to use for set the color for section of the donut
    - chartTitle: string;

        The title of the chart