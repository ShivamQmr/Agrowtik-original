import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import joblib as jl
import sklearn as sk
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import RandomForestRegressor

train_kalimati = pd.read_csv("Datasets/Train_data/kalimati_tarkari_dataset_from_June_2013_to_May_2021.csv", index_col=False,)
train_imerge = pd.read_csv("Datasets/Train_data/NASA-IMERG-Early 1 Day.csv", index_col=False)
train_sentinel = pd.read_csv("Datasets/Train_data/Sentinel 1km - NSIDC SMAP.csv", index_col=False)
train_sport = pd.read_csv("Datasets/Train_data/SPoRT Evaporative Stress Index (ESI-4WEEK).csv", index_col=False)
train_rainfall = pd.read_csv("Datasets/Train_data/USCB CHIRPS Rainfall.csv", index_col=False)
train_smap = pd.read_csv("Datasets/Train_data/USDA SMAP - moisture data.csv", index_col=False)

test_kalimati = pd.read_csv("Datasets/Test_data/kalimati-tarkari-prices-from-may-2021-to-september-2023.csv", index_col=False)
test_imerge = pd.read_csv("Datasets/Test_data/NASA IMERG Early 1 Day.csv", index_col=False)
test_sentinel = pd.read_csv("Datasets/Test_data/Sentinel 1km - NSIDC SMAP.csv", index_col=False)
test_sport = pd.read_csv("Datasets/Test_data/SPoRT Evaporative Stress Index (ESI-4week).csv", index_col=False)
test_rainfall = pd.read_csv("Datasets/Test_data/UCSB CHIRPS Rainfall.csv", index_col=False)
test_smap = pd.read_csv("Datasets/Test_data/USDA SMAP - moisture data.csv", index_col=False)

pd.set_option('display.max_rows', None)


train_kalimati.drop('SN', axis=1, inplace=True)


train_dataframes = [train_kalimati, train_imerge, train_sentinel, train_sport, train_rainfall, train_smap]
merged_train = train_dataframes[0]
for df in train_dataframes[1:]:
    merged_train = pd.merge(merged_train, df, on='Date', how='outer')

test_dataframes = [test_kalimati, test_imerge, test_sentinel, test_sport, test_rainfall, test_smap]
merged_test = test_dataframes[0]
for df in test_dataframes[1:]:
    merged_test = pd.merge(merged_test, df, on='Date', how='outer')

merged_test = merged_test.sort_values(by='Date')
merged_train = merged_train.sort_values(by='Date')


merged_train = merged_train.groupby('Date', group_keys=False).apply(lambda group: group.sort_values('Date'))

merged_train.interpolate(method='nearest', inplace=True)
merged_train.fillna(method='ffill', inplace=True)
merged_train.fillna(method='bfill', inplace=True)


merged_test = merged_test.groupby('Date', group_keys=False).apply(lambda group: group.sort_values('Date'))

merged_test.interpolate(method='nearest', inplace=True)
merged_test.fillna(method='ffill', inplace=True)
merged_test.fillna(method='bfill', inplace=True)

keywords = r'\b(India|Indian|\(India\)|China|Chinese|\(China\))\b'
merged_train = merged_train[~merged_train['Commodity'].str.contains(keywords, case=False, regex=True)]
merged_test = merged_test[~merged_test['Commodity'].str.contains(keywords, case=False, regex=True)]


#Use the code below to fill the value when Pandas is updated... It throws error in new version

# merged_train = merged_train.infer_objects()
# merged_train.update(merged_train.select_dtypes(include=['float64', 'int64']).interpolate(method='nearest'))

# merged_train.ffill(inplace=True)
# merged_test.ffill(inplace=True)

commodities_train_drop = ['Fish Fresh', 'Maize', 'Musk Melon']
commodities_test_drop = ['Amla', 'Avocado', 'Sarifa', 'Tree Tomato']

merged_train = merged_train.loc[~merged_train['Commodity'].isin(commodities_train_drop)]
merged_test = merged_test.loc[~merged_test['Commodity'].isin(commodities_test_drop)]

# Remove "Rs." and convert to numeric
merged_test['Average'] = merged_test['Average'].str.replace('Rs ', '', regex=False).astype(float)

train_data_encoded = pd.get_dummies(merged_train, columns=['Commodity'], prefix='Veg')
test_data_encoded = pd.get_dummies(merged_test, columns=['Commodity'], prefix='Veg')


merged_train['imerge_avg'] = merged_train['NASA-IMERG-Early 1 Day: avg'].rolling(window=7, min_periods=1).mean()
merged_train['sentinel_avg'] = merged_train['NSIDC SMAP/Sentinel 1Km: avg'].rolling(window=7, min_periods=1).mean()
merged_train['sport_avg'] = merged_train['SPoRT Evaporative Stress Index (ESI-4WEEK): avg'].rolling(window=7, min_periods=1).mean()
merged_train['rainfall_avg'] = merged_train['UCSB CHIRPS Rainfall: avg'].rolling(window=7, min_periods=1).mean()
merged_train['smap1_avg'] = merged_train['Soil moisture profile - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_train['smap2_avg'] = merged_train['Sub surface soil moisture - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_train['smap3_avg'] = merged_train['Sub surface soil moisture anomaly - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_train['smap4_avg'] = merged_train['Surface soil moisture - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_train['smap5_avg'] = merged_train['Surface soil moisture anomaly  - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()

merged_test['imerge_avg'] = merged_test['NASA-IMERG-Early 1 Day: avg'].rolling(window=7, min_periods=1).mean()
merged_test['sentinel_avg'] = merged_test['NSIDC SMAP/Sentinel 1Km: avg'].rolling(window=7, min_periods=1).mean()
merged_test['sport_avg'] = merged_test['SPoRT Evaporative Stress Index (ESI-4WEEK): avg'].rolling(window=7, min_periods=1).mean()
merged_test['rainfall_avg'] = merged_test['UCSB CHIRPS Rainfall: avg'].rolling(window=7, min_periods=1).mean()
merged_test['smap1_avg'] = merged_test['Soil moisture profile - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_test['smap2_avg'] = merged_test['Sub surface soil moisture - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_test['smap3_avg'] = merged_test['Sub surface soil moisture anomaly - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_test['smap4_avg'] = merged_test['Surface soil moisture - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()
merged_test['smap5_avg'] = merged_test['Surface soil moisture anomaly  - USDA SMAP: avg'].rolling(window=7, min_periods=1).mean()

train_combined = pd.concat([merged_train, train_data_encoded], axis=1)
test_combined = pd.concat([merged_test, test_data_encoded], axis=1)


X_train = train_combined[
    ['imerge_avg', 'sentinel_avg', 'sport_avg', 'rainfall_avg', 'smap1_avg', 'smap2_avg', 'smap3_avg', 'smap4_avg', 'smap5_avg'] + 
    [col for col in train_combined.columns if col.startswith('Veg_')]
]

X_test = test_combined[
    ['imerge_avg', 'sentinel_avg', 'sport_avg', 'rainfall_avg', 'smap1_avg', 'smap2_avg', 'smap3_avg', 'smap4_avg', 'smap5_avg'] + 
    [col for col in test_combined.columns if col.startswith('Veg_')]
]


Y_train = train_combined['Average']
Y_train = Y_train.loc[:, ~Y_train.columns.duplicated(keep='first')]


y_test = test_combined['Average']
y_test = y_test.loc[:, ~y_test.columns.duplicated(keep='first')]
y_test.head()

rf_model = RandomForestRegressor(n_estimators=100, random_state=42).fit(X_train, Y_train)

y_pred = rf_model.predict(X_test)


y_pred_df = pd.DataFrame(y_pred, columns=['Predicted_Price'])


mse_test = mean_squared_error(y_test, y_pred)

average_price = np.mean(y_test)
percentage_error = (np.sqrt(mse_test) / average_price) * 100

print(f"Percentage Error: {percentage_error:.2f}%")

