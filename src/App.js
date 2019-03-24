import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';

class App extends Component {

  state = {
    error: '',
    consulta: {},
    resultado: {}
  }

  componentDidUpdate(prevProps, prevState) {
   
    if (prevState.consulta !== this.state.consulta) {
      this.consultaApi();
    }
    
  }

  componentDidMount() {
    this.setState({
      error: false
    })
  }

  consultaApi = () => {
    const {ciudad, pais} = this.state.consulta;
    if(!ciudad || !pais) return null;
    // console.log(ciudad);

    // Leer la url y agregar el API key
    const appId = `14e4f76f7d94ea88cc958b4fceee3320`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    // console.log(url);
    
    // Query con fetch api
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        // console.log(datos);
        this.setState({
          resultado: datos
        })
      })
      .catch(error => {
        console.log(error);
      })
    
  }

  datosConsulta = respuesta => {
    if (respuesta.ciudad === '' || respuesta.pais === '') {
      // console.log('Hay Errores');
      // console.log(respuesta);
      this.setState({
        error: true
      })

    } else {
      // console.log('Correcto');
      // console.log(respuesta);
      this.setState({
        consulta: respuesta,
        error: false
      })
    }
    
  }

  render() {

    const error = this.state.error;
    // console.log(error);

    let resultado;

    if (error) {
      resultado = <Error mensaje="Ambos campos son obligatorios" />
    } else {
      resultado = <Clima resultado={this.state.resultado}/>
    }
    

    return (
      <div className="App">
        <Header 
          titulo="Clima React"
        />

        <Formulario datosConsulta={this.datosConsulta} />

        {resultado}
      </div>
    );
  }
}

export default App;