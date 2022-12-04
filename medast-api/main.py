import numpy as np
import pandas as pd

import pickle

from fastapi import FastAPI, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles



def read_model(file_path):
    with open(file_path, 'rb') as f:
        loaded_model = pickle.load(f)
    return loaded_model


def load_models(models_dir):
    knn_models = []
    lr_models = []
    rf_models = []
    svm_models = []

    for fold in range(1, 11):
        knn_models.append(read_model(f'{models_dir}/knn_fold_{fold}.pkl'))
        lr_models.append(read_model(
            f'{models_dir}/logistic_regression_fold_{fold}.pkl'))
        rf_models.append(read_model(
            f'{models_dir}/random_forest_fold_{fold}.pkl'))
        svm_models.append(read_model(f'{models_dir}/svm_fold_{fold}.pkl'))
    stacking_model = read_model(
        f'{models_dir}/stacking_logistic_regression.pkl')
    encoder = read_model(f'{models_dir}/encoder.pkl')
    return [knn_models, lr_models, rf_models, svm_models, encoder, stacking_model]


def get_prediction(features_dict, models, encoder, stacking_model):
    knn_models, lr_models, rf_models, svm_models = models
    df_dict = {key: [value] for key, value in features_dict.items()}
    X = pd.DataFrame.from_dict(df_dict)
    X_gd = encoder.transform(X)

    knn_predictions = []
    svm_predictions = []
    lr_predictions = []
    rf_predictions = []

    for index in range(10):
        knn_predictions.append(knn_models[index].predict_proba(X_gd)[:, 1])
        svm_predictions.append(svm_models[index].predict_proba(X_gd)[:, 1])
        lr_predictions.append(lr_models[index].predict_proba(X_gd)[:, 1])
        rf_predictions.append(rf_models[index].predict_proba(X)[:, 1])

    knn_prediction = np.mean(knn_predictions)
    svm_prediction = np.mean(svm_predictions)
    lr_prediction = np.mean(lr_predictions)
    rf_prediction = np.mean(rf_predictions)

    predictions = np.array(
        [knn_prediction, svm_prediction, lr_prediction, rf_prediction]).reshape((1, -1))
    pred_df = pd.DataFrame(predictions, columns=[
                           'knn', 'svm', 'logistic_regression', 'random_forest'])
    pred_df.head()

    prediction_proba = stacking_model.predict_proba(pred_df)[0, 1]
    return prediction_proba


knn_models, lr_models, rf_models, svm_models, encoder, stacking_model = load_models(
    'models')
models = [knn_models, lr_models, rf_models, svm_models]


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return FileResponse('index.html')

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/predict_CIHD")
async def create_upload_file(
    age: str = Form(),
        sex: str = Form(),
        cp: str = Form(),
        trestbps: str = Form(),
        chol: str = Form(),
        fbs: str = Form(),
        restecg: str = Form(),
        thalach: str = Form(),
        exang: str = Form(),
        oldpeak: str = Form(),
        slope: str = Form(),
        ca: str = Form(),
        thal: str = Form()

):


    features_dict = {
        "age": float(age),
        "sex": float(sex),
        "cp": float(cp),
        "trestbps": float(trestbps),
        "chol": float(chol),
        "fbs": float(fbs),
        "restecg": float(restecg),
        "thalach": float(thalach),
        "exang": float(exang),
        "oldpeak": float(oldpeak),
        "slope": float(slope),
        "ca": float(ca),
        "thal": float(thal)
    }

    prediction = get_prediction(features_dict, models, encoder, stacking_model)

    return HTMLResponse(f'<div style=" margin: auto;width: 50%;border: 3px solid green;padding: 10px;" ><h1 > diagnosis of Ischemic Heart Diseases. : {prediction*100:.2f}%</h1><div>', status_code=200)
