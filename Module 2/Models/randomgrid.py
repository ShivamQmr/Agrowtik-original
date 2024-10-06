import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import RandomizedSearchCV, KFold
from sklearn.metrics import mean_squared_error
from scipy.stats import randint, uniform

# Load your datasets
train_kalimati = pd.read_csv("Datasets/Train_data/kalimati_tarkari_dataset_from_June_2013_to_May_2021.csv", index_col=False)
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

# Preprocessing steps
train_kalimati.drop('SN', axis=1, inplace=True)

train_dfs = [train_kalimati, train_imerge, train_sentinel, train_sport, train_rainfall, train_smap]
merged_train = pd.merge(train_kalimati, train_imerge, on='Date', how='outer')
for df in train_dfs[2:]:
    merged_train = pd.merge(merged_train, df, on='Date', how='outer')

test_dfs = [test_kalimati, test_imerge, test_sentinel, test_sport, test_rainfall, test_smap]
merged_test = pd.merge(test_kalimati, test_imerge, on='Date', how='outer')
for df in test_dfs[2:]:
    merged_test = pd.merge(merged_test, df, on='Date', how='outer')

# Sort and interpolate missing values
merged_train.sort_values(by='Date', inplace=True)
merged_test.sort_values(by='Date', inplace=True)

merged_train.interpolate(method='nearest', inplace=True)
merged_train.fillna(method='ffill', inplace=True)
merged_train.fillna(method='bfill', inplace=True)

merged_test.interpolate(method='nearest', inplace=True)
merged_test.fillna(method='ffill', inplace=True)
merged_test.fillna(method='bfill', inplace=True)

# Filtering keywords and commodities
keywords = r'\b(?:India|Indian|\(India\)|China|Chinese|\(China\)|Fish)\b'
merged_train = merged_train[~merged_train['Commodity'].str.contains(keywords, case=False, regex=True)]
merged_test = merged_test[~merged_test['Commodity'].str.contains(keywords, case=False, regex=True)]

commodities_train_drop = ['Fish Fresh', 'Maize', 'Musk Melon']
commodities_test_drop = ['Amla', 'Avocado', 'Sarifa', 'Tree Tomato']
merged_train = merged_train.loc[~merged_train['Commodity'].isin(commodities_train_drop)]
merged_test = merged_test.loc[~merged_test['Commodity'].isin(commodities_test_drop)]

# Preprocessing: Replace 'Rs ' in 'Average' column
merged_test['Average'] = merged_test['Average'].str.replace('Rs ', '', regex=False).astype(float)

# One-hot encoding for 'Commodity'
train_data_encoded = pd.get_dummies(merged_train, columns=['Commodity'], prefix='Veg')
test_data_encoded = pd.get_dummies(merged_test, columns=['Commodity'], prefix='Veg')

# Rolling averages for features
for col in ['NASA-IMERG-Early 1 Day: avg', 'NSIDC SMAP/Sentinel 1Km: avg', 'SPoRT Evaporative Stress Index (ESI-4WEEK): avg', 
            'UCSB CHIRPS Rainfall: avg', 'Soil moisture profile - USDA SMAP: avg', 'Sub surface soil moisture - USDA SMAP: avg', 
            'Sub surface soil moisture anomaly - USDA SMAP: avg', 'Surface soil moisture - USDA SMAP: avg', 
            'Surface soil moisture anomaly  - USDA SMAP: avg']:
    merged_train[f'{col.split(":")[0]}_avg'] = merged_train[col].rolling(window=7, min_periods=1).mean()
    merged_test[f'{col.split(":")[0]}_avg'] = merged_test[col].rolling(window=7, min_periods=1).mean()

# Combine and remove duplicate columns
train_combined = pd.concat([merged_train, train_data_encoded], axis=1)
test_combined = pd.concat([merged_test, test_data_encoded], axis=1)

train_combined = train_combined.loc[:, ~train_combined.columns.duplicated(keep='first')]
test_combined = test_combined.loc[:, ~test_combined.columns.duplicated(keep='first')]

# Group data by vegetable
vegetable_groups = train_combined.groupby('Commodity')

predictions = {}

# Define the hyperparameter search space for RandomizedSearchCV
param_dist = {
    'n_estimators': randint(40, 250),
    'max_depth': [5, 10, 15, 25],
    'min_samples_split': randint(2, 11),
    'min_samples_leaf': randint(1, 6),
    'max_features': ['sqrt'],
    'bootstrap': [True, False]
}

# Loop over vegetables
for veg, group in vegetable_groups:
    if group.shape[0] < 5:
        print(f"Skipping {veg} as it has less than 5 samples for cross-validation.")
        continue
    
    X_train = group[
        ['NASA-IMERG-Early 1 Day_avg', 'NSIDC SMAP/Sentinel 1Km_avg', 'SPoRT Evaporative Stress Index (ESI-4WEEK)_avg', 
         'UCSB CHIRPS Rainfall_avg', 'Soil moisture profile - USDA SMAP_avg', 'Sub surface soil moisture - USDA SMAP_avg', 
         'Sub surface soil moisture anomaly - USDA SMAP_avg', 'Surface soil moisture - USDA SMAP_avg', 
         'Surface soil moisture anomaly  - USDA SMAP_avg'] + 
        [col for col in group.columns if col.startswith('Veg_')]
    ]
    Y_train = group['Average']
    
    # Use RandomizedSearchCV instead of GridSearchCV
    random_search = RandomizedSearchCV(
        RandomForestRegressor(),
        param_distributions=param_dist,
        cv=KFold(n_splits=5, shuffle=True, random_state=42), 
        scoring='neg_mean_squared_error',
        n_jobs=-1,  # Use all CPU cores
        random_state=42
    )
    random_search.fit(X_train, Y_train)

    best_model = random_search.best_estimator_

    X_test = test_combined[test_combined['Commodity'] == veg][
        ['NASA-IMERG-Early 1 Day_avg', 'NSIDC SMAP/Sentinel 1Km_avg', 'SPoRT Evaporative Stress Index (ESI-4WEEK)_avg', 
         'UCSB CHIRPS Rainfall_avg', 'Soil moisture profile - USDA SMAP_avg', 'Sub surface soil moisture - USDA SMAP_avg', 
         'Sub surface soil moisture anomaly - USDA SMAP_avg', 'Surface soil moisture - USDA SMAP_avg', 
         'Surface soil moisture anomaly  - USDA SMAP_avg'] + 
        [col for col in test_combined.columns if col.startswith('Veg_')]
    ]

    if not X_test.empty:
        y_pred = best_model.predict(X_test)
        predictions[veg] = pd.Series(y_pred, index=X_test.index)

# Convert predictions to DataFrame
predictions_df = pd.DataFrame(predictions)

# Compute error
y_test = test_combined.loc[predictions_df.index, 'Average']
mse_test = mean_squared_error(y_test, predictions_df.mean(axis=1))
average_price = np.mean(y_test)
print(f"Test MSE: {mse_test}")
print(f"Average price: {average_price}")
percentage_error = (np.sqrt(mse_test) / average_price) * 100

print(f"Percentage Error: {percentage_error:.2f}%")
