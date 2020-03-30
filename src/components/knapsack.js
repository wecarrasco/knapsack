import React, { Component } from 'react';
import swal from 'sweetalert2';
import { Container, Grid, Button } from '@material-ui/core';
import Package from './package';

export default class Knapsack extends Component {
  state = {
    item: '',
    startTime: 0.0,
    endTime: 0.0,
    weight: 1,
    productList: []
  };

  componentDidMount() {
    swal
      .fire({
        title: 'Knapsack',
        html: `Knapsack es un problema de complejidad computacional, 
        donde se tiene un arreglo del peso de los objetos y su respectivo valor monetario. <br><br>
        Para ello ocupamos primero que nos de la capacidad de la mochila. <br><br>
        La capacidad de la mochila definida por usted es:`,
        input: 'number',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      .then((value) => {
        this.setState({ weight: parseInt(value.value) || 1 });
        swal
          .fire({
            title: 'Knapsack',
            icon: 'info',
            html: `A continuación agregaremos productos con su respectivo nombre, valor y cantidad.`,
            allowOutsideClick: false,
            allowEscapeKey: false
          })
          .then(() => {
            this.generateProducts();
          });
      });
  }

  generateProducts = () => {
    const productList = [
      { name: 'tomates' },
      { name: 'papas' },
      { name: 'pepinos' },
      { name: 'aguacate' },
      { name: 'platano' },
      { name: 'manzanas' },
      { name: 'zanahoria' },
      { name: 'pataste' },
      { name: 'cebolla' },
      { name: 'chile' },
      { name: 'brocoli' },
      { name: 'coliflor' },
      { name: 'apio' },
      { name: 'rabano' },
      { name: 'maiz' },
      { name: 'espinaca' },
      { name: 'lechuga' },
      { name: 'esparragos' },
      { name: 'alcachofa' },
      { name: 'berenjena' },
      { name: 'calabaza' },
      { name: 'remolacha' },
      { name: 'repollo' }
    ].map((product) => {
      product.valor = Math.floor(Math.random() * 50) + 1;
      product.cantidad = Math.floor(Math.random() * 10) + 1;
      return product;
    });
    const numberOfProducts = Math.floor(Math.random() * 15) + 1;
    const generatedProducts = [];
    for (let index = 0; index < numberOfProducts; index++) {
      generatedProducts.push(
        productList
          .splice(Math.floor(Math.random() * productList.length), 1)
          .pop()
      );
    }
    // this.setState({ productList: generatedProducts });
    this.setState({
      productList: [
        { name: 'tomates', valor: 10, cantidad: 5 },
        { name: 'lechuga', valor: 5, cantidad: 10 },
        { name: 'zanahoria', valor: 15, cantidad: 1 },
        { name: 'papa', valor: 6, cantidad: 4 }
      ]
    });
  };

  renderProducts = () => {
    const { productList } = this.state;
    return productList.map((product, index) => {
      const { name, valor, cantidad } = product;
      return (
        <Package key={index} nombre={name} valor={valor} cantidad={cantidad} />
      );
    });
  };

  calcularKnapsack = async (metodo) => {
    const resultado =
      metodo === 'iterativo' ? await this.knapsackIterativo() : this.max(1, 2);
    swal.fire({
      icon: 'success',
      title: 'Resultados',
      html: `<div>
        El tiempo requerido para calcular las ganancias maximas es de: ${this
          .state.endTime - this.state.startTime} milisegundos. <br><br>
        La ganancia maxima es de ${resultado} <br><br>
        Los productos ingresados a la mochila son: ${this.state.item}
      </div>`
    });
  };

  max = (a, b) => (a > b ? a : b);

  knapsackIterativo = () => {
    var k = [];
    for (var y = 0; y < this.state.productList.length + 1; y++) {
      k[y] = [];
      for (var x = 0; x < this.state.weight + 1; x++) {
        k[y][x] = 0;
      }
    }
    this.setState({ startTime: performance.now() });
    for (var i = 0; i <= this.state.productList.length; i++) {
      for (var j = 0; j <= this.state.weight; j++) {
        if (i === 0 || j === 0) {
          k[i][j] = 0;
        } else if (this.state.productList[i - 1].cantidad <= j) {
          k[i][j] = this.max(
            parseInt(this.state.productList[i - 1].valor) +
              parseInt(k[i - 1][j - this.state.productList[i - 1].cantidad]),
            k[i - 1][j]
          );
        } else {
          k[i][j] = k[i - 1][j];
        }
      }
    }
    this.setState({ endTime: performance.now() });
    i = this.state.productList.length;
    var w = this.state.weight;
    var item = '';
    while (i && w > 0) {
      if (k[i][w] !== k[i - 1][w]) {
        item += this.state.productList[i - 1].name + ', ';
        w = w - parseInt(this.state.productList[i - 1].cantidad);
        i = i - 1;
      } else {
        i = i - 1;
      }
    }
    this.setState({ item: item.substring(0, item.length - 2) });
    return k[this.state.productList.length][this.state.weight];
  };

  render() {
    return (
      <Container fixed>
        <Grid container justify="space-around">
          <Grid container>{this.renderProducts()}</Grid>
          <Grid item>
            <div className="backpack">
              <div className="backpackpouch"></div>
              <div className="minipouch"></div>
              <div className="toppouch">
                <div className="buckle one"></div>
                <div className="buckle two"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="toppouchflipped"></div>
          </Grid>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            console.log(this.calcularKnapsack('iterativo'));
          }}
        >
          Correr Algoritmo
        </Button>
      </Container>
    );
  }
}
