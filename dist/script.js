class Jogo extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "game" },
      React.createElement("div", { className: "game-board" },
      React.createElement(Tabuleiro, null)),


      React.createElement("div", { className: "game-info" },
      React.createElement("span", null, "Movimentos"),
      React.createElement("ol", null))));





  }}



class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true };

  }

  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    const status = vencedor ? 'Vencedor: ' + vencedor : 'Jogador: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      React.createElement("div", null,
      React.createElement("span", null, status),
      React.createElement("div", { className: "board-row" },
      this.rendenizarQuadrado(0),
      this.rendenizarQuadrado(1),
      this.rendenizarQuadrado(2)),

      React.createElement("div", { className: "board-row" },
      this.rendenizarQuadrado(3),
      this.rendenizarQuadrado(4),
      this.rendenizarQuadrado(5)),

      React.createElement("div", { className: "board-row" },
      this.rendenizarQuadrado(6),
      this.rendenizarQuadrado(7),
      this.rendenizarQuadrado(8)),

      React.createElement("div", { className: "buttonDiv" },
      React.createElement("button", { className: "button", onClick: () => this.randomPlay() }, "Jogada Aleat\xF3ria"),
      React.createElement("button", { className: "button", onClick: () => this.restartGame() }, "Reiniciar Jogo"))));



  }

  rendenizarQuadrado(i) {
    return (
      React.createElement(Quadrado, {
        value: this.state.quadrados[i],
        onClick: () => this.handleClick(i) }));


  }

  handleClick(i) {
    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)) {
      alert('Jogo já acabou');
      return;
    }

    if (quadrados[i]) {
      alert('Quadrado ocupado!');
      return;
    }

    quadrados[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }

  randomPlay() {
    let quadradosVazios = this.state.quadrados.map((v, i) => {if (!v) return i;});
    var validSquare = [];
    var cont = 0;
    for (let i = 0; i < quadradosVazios.length; ++i) {
      if (quadradosVazios[i] != null) {
        validSquare[cont] = quadradosVazios[i];
        cont++;
      }
    }
    var randomNumber = validSquare[Math.floor(Math.random() * validSquare.length)];
    this.handleClick(randomNumber);
  }

  restartGame() {
    this.setState({ quadrados: Array(9).fill(null), xIsNext: true });
  }}


class Quadrado extends React.Component {

  /* constructor(props) {
                                          super(props);
                                          this.state = {
                                            value: null,
                                          };
                                        } */

  render() {
    return (
      React.createElement("button", { className: "square", onClick: () => {this.props.onClick(this.props.value);} },
      this.props.value));


  }}


/*function Quadrado(props) {
       return (
         <button className="square" onClick={props.onClick}>
                 {props.value}
         </button>
       );
     } */


function calculateWinner(quadrados) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c])
    return quadrados[a];
  }
  return null;
}

ReactDOM.render(React.createElement(Jogo, null), document.getElementById('root'));

//ReactDOM.render(<Tabuleiro quadrados={Array(9).fill().map((v, pos) => pos)}/>, document.getElementById('root'));

//ReactDOM.render (<Quadrado onClick={() => alert('Clicou!')} value={2+2}/>, document.getElementById('root'));