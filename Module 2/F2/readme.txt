Datasets from ClimateSERV: NASA-IMERG-Early 1 Day.csv, NSIDC SMAP Sentinel 1Km.csv, Soil moisture profile - USDA SMAP, SPoRT Evaporative Stress Index (ESI-4WEEK), Sub surface soil moisture - USDA SMAP, Sub surface soil moisture anomaly - USDA SMAP, Surface soil moisture anomaly - USDA SMAP, UCSB CHIRPS Rainfall, USDA SMAP Soil Moisture

Kalimati Datasets: OpenDataNepal

All the imports from India and China were excluded to make the model. Additionally, we didn't considered factors like middleman price hikes as our data is from a single place rather than a complete set that includes all type of transportation.
Some locations' like Jhapa, Dang, Kailali, etc. data were excluded, since they constitutes very small portion of Kalimati vegetable market.

Train data contains datasets from_June_2013_to_May_2021
Test data contains datasets from-may-2021-to-september-2023

Cleaned dataset: Sentinal 1km (Contained a lot of null values)

All of the ClimateSERV data were merged with the Kalimati data.
While merging, we interpolated the nearest value for the null or NaN values in the ClimateSERV datasets.


To build the model, we gathered the 7 preceeding days data and averaged them for each price.

We used average price of vegetables not max or min...

### Remove the commodities like fish or any other if error is more than 20%
### Leave test data for now. Split train data for now into train and test.. or try to merge both of data according to same column of Commodity.


We removed 'Fish Fresh', 'Maize', 'Musk Melon' in train data and 'Amla', 'Avocado', 'Sarifa', 'Tree Tomato' in test data, for they were not cohorent with each other.

main3.py is the most accurate till now with 38.07% accuracy. This uses tuning of hyperparameters and vegetable grouping to predict price based on the Commodity values, which wasn't done in the main.py.

Usable: demandpred.py reached 44% accuracy, but predicts demand not price:)

Opt to remove Sentinel data??

### Website

