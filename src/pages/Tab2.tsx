import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Main.css';
import WeatherService from '../services/WeatherService';

const Tab2: React.FC = () => {
  const [hiddenButton, setHiddenButton] = useState(false);
  const [forecasts, setForecasts]: [any, any] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const service = new WeatherService();

  const onClickButton = () => {
    setIsLoading(true);

    if (localStorage.getItem('forecasts') != null) {
      setForecasts(JSON.parse(localStorage.getItem('forecasts') || ''));
      setHiddenButton(true);
    } else {
      service.getForecast().then(res => {
        localStorage.setItem('forecasts', JSON.stringify(res.list));
        setForecasts(res.list);
        setHiddenButton(true);
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prediction</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        {!hiddenButton &&
          <div className="container">
            <IonButton expand="block" onClick={onClickButton}>{isLoading ? 'Loading' : 'Lihat Perkiraan'}</IonButton>
          </div>
        }
        <IonList>
          {
            forecasts.map((forecast:any, index:number) => (
              <IonItem key={index}>
                <IonGrid>
                  <IonRow>
                    <IonCol size="1">
                      <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.main.temp} />
                    </IonCol>
                    <IonCol size="3">
                      <b>Waktu:</b> {forecast.dt_txt}<br />
                      <b>Suhu:</b> {forecast.main.temp}<br />
                      <b>Cuaca:</b> {forecast.weather[0].main}<br />
                      <b>Keterangan:</b> {forecast.weather[0].description}<br />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
