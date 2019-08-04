import React from 'react';
import Input from './Components/Input/Input';
import Button from './Components/Button/Button';
import City from './Screens/City';
import WebServices from './WebServices/WebServices';
import styles from './App.module.scss';
import Tabla from './Components/Table/Table';
import SimpleBarChart from './Components/Chart/Chart';
import cabecera from './Resources/cabeceras.json'

import produce from 'immer/dist/immer';

export default class App extends React.PureComponent {

  state = {
    url:"",
    datos:[],
    city:{name:"",temp:"",humedad:"",presion:""},
    headers:[]
  }
  onChange =(event)=> {
    const nextState = produce(this.state, (draft) => {
      draft.url = event.target.value;
      console.log("TCL: App -> nextState -> event.target.value", event.target.value)
    });
    this.setState(nextState);
  }

  getUrl = async () => {

    if( this.state.url ==="")
      return false;

    try {
      const response = await WebServices.getUrl({
        url:this.state.url
      });
      console.log('TCL: Home -> fetchData -> response', response);
      
      const nextState = produce(this.state, (draft) => {
        draft.city.name = response.name;
        draft.city.temp = response.main.temp;
        draft.city.humedad = response.main.humidity;
        draft.city.presion = response.main.pressure;
        
      });
      this.setState(nextState);
    } catch (e) {
      window.alert("El URL es incorrecto o hubo un error al consultar la URL");
      console.log('TCL: Home -> fetchData -> e', e);
    }

  }
  agregarDatos = ()=> {
    const nextState = produce(this.state, (draft) => {
      draft.datos = draft.datos.concat(draft.city);

    });
    this.setState(nextState);
  }
    render() {
      return (
        <div>
          <div className={styles.cabecera}>
            <Input onChange={(event)=>this.onChange(event)} className={styles.input} />
            <Button label={"Agregar"} onClick={()=> this.agregarDatos()} />
          </div>
          <div className={styles.opciones}>
            <ul className={styles.lista_opciones}>
              <li onClick={()=>this.getUrl()}  >By City Name</li>
              <li onClick={() => this.getUrl()}>By City Id</li>
              <li onClick={() => this.getUrl()}>By Coordinates</li>
            </ul>
            <div className={styles.ejemplos}>
              Ejemplos por ID de Ciudad:<br/>
              <strong>
                http://api.openweathermap.org/data/2.5/weather?id=3522509&appid=d0b76fd83718eef1932b224506cfb48f<br/>
                </strong>

              Ejemplos por Coordenadas de Ciudad:<br/>
              <strong>

              http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d0b76fd83718eef1932b224506cfb48f<br/>
              </strong>
              
              Ejemplos por Nombre de Ciudad:<br/>
              <strong>
              http://api.openweathermap.org/data/2.5/weather?q=tijuana&appid=d0b76fd83718eef1932b224506cfb48f<br/>

              </strong>
            </div>
          </div>
          <div className ={styles.resultado}>
            <City data ={this.state.city}/>
          </div>


          <div>
            <Tabla headers={cabecera} data={this.state.datos} caption={"seleccionadas"}></Tabla>
          </div>
          <div>
            <div>
              <SimpleBarChart newData={this.state.datos}
                label={"name"} llaves={["temp", "humedad","presion"]}
                fill={["rgba(200,0,0,.3)", "rgba(0, 200, 0, .3)"]}
                alto={200} ancho={600} />
            </div>
          </div>

        </div>
      );
    }
  }


