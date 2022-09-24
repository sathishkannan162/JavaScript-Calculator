//Importing modules
const { Provider, connect } = ReactRedux;
const {
  applyMiddleware,
  createStore,
  combineReducers,
  bindActionCreators } =
Redux;

const projectName = "JavaScript Calculator";
//data for project
const keyNames = [
"one",
"two",
"three",
"four",
"five",
"six",
"seven",
"eight",
"nine",
"zero",
"add",
"subtract",
"multiply",
"divide",
"decimal",
"equals",
"clear"];


const keySymbols = [
"1",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"0",
"+",
"-",
"X",
"/",
".",
"=",
"AC"];

const keyDisplay = [
1,
2,
3,
4,
5,
6,
7,
8,
9,
0,
"+",
"-",
"·",
"/",
".",
"=",
"AC"];

const keyExpression = [
"1",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"0",
"+",
"-",
"*",
"/",
".",
"=",
"AC"];

const numberStrings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operatorStrings = ["+", "-", "X", "/"];

//action types
const INPUT = "input";

// default state
const defaultState = {
  input: "0",
  previousInput: "0",
  subDisplay: "0",
  mainDisplay: "",
  expression: "" };


//input action creator

let inputClick = data => {
  return {
    type: INPUT,
    payload: data };

};

let inputReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INPUT:
      if (["/", "+"].includes(action.payload) && state.expression === "") {
        return defaultState;
      }
      //number logics
      else if (numberStrings.includes(action.payload)) {
          if (numberStrings.includes(state.input) | ".".includes(state.input)) {
            if (state.subDisplay == "0") {
              return {
                input: action.payload,
                previousInput: state.input,
                subDisplay: action.payload,
                mainDisplay: state.mainDisplay + action.payload,
                expression:
                state.expression +
                keyExpression[keySymbols.indexOf(action.payload)] };

            }
            return {
              input: action.payload,
              previousInput: state.input,
              subDisplay: state.subDisplay + action.payload,
              mainDisplay: state.mainDisplay + action.payload,
              expression:
              state.expression +
              keyExpression[keySymbols.indexOf(action.payload)] };

          } else {
            return {
              input: action.payload,
              previousInput: state.input,
              subDisplay: action.payload,
              mainDisplay: state.mainDisplay + action.payload,
              expression:
              state.expression +
              keyExpression[keySymbols.indexOf(action.payload)] };

          }
        }

        //operator logic
        else if (operatorStrings.includes(action.payload)) {
            if (operatorStrings.includes(state.input)) {
              if (!(action.payload == "-")) {
                if (!(state.input == "-")) {
                  return {
                    input: action.payload,
                    previousInput: state.input,
                    subDisplay: action.payload,
                    mainDisplay:
                    state.mainDisplay.slice(0, state.mainDisplay.length - 1) +
                    keyDisplay[keySymbols.indexOf(action.payload)],
                    expression:
                    state.expression.slice(0, state.expression.length - 2) +
                    " " +
                    keyExpression[keySymbols.indexOf(action.payload)] };

                } else {
                  return {
                    input: action.payload,
                    previousInput: state.input,
                    subDisplay: action.payload,
                    mainDisplay:
                    state.mainDisplay.slice(0, state.mainDisplay.length - 2) +
                    keyDisplay[keySymbols.indexOf(action.payload)],
                    expression:
                    state.expression.slice(0, state.expression.length - 4) +
                    " " +
                    keyExpression[keySymbols.indexOf(action.payload)] };

                }
              }
            }
            return {
              input: action.payload,
              previousInput: state.input,
              subDisplay: action.payload,
              mainDisplay:
              state.mainDisplay + keyDisplay[keySymbols.indexOf(action.payload)],
              expression:
              state.expression +
              " " +
              keyExpression[keySymbols.indexOf(action.payload)] };

          }
          // decimal logic
          else if (action.payload == ".") {
              if (state.subDisplay.includes(".")) {
                return {
                  input: action.payload,
                  previousInput: state.input,
                  subDisplay: state.subDisplay,
                  mainDisplay: state.mainDisplay + action.payload,
                  expression:
                  state.expression +
                  keyExpression[keySymbols.indexOf(action.payload)] };

              }
              return {
                input: action.payload,
                previousInput: state.input,
                subDisplay: state.subDisplay + action.payload,
                mainDisplay: state.mainDisplay + action.payload,
                expression:
                state.expression + keyExpression[keySymbols.indexOf(action.payload)] };

            }

            //equals
            else if (action.payload == "=") {
                var result = eval(state.expression);

                return {
                  input: action.payload,
                  previousInput: "0",
                  subDisplay: result,
                  mainDisplay: result,
                  expression: result };

              }
              // clear all
              else if (action.payload == "AC") {
                  return defaultState;
                } else {
                  return {
                    input: action.payload,
                    subDisplay: "error",
                    mainDisplay: "",
                    expression: "" };

                }

    default:
      return state;}

};

const rootReducer = combineReducers({
  inputReduce: inputReducer });


let store = createStore(rootReducer);

//React Components

class SubDisplay extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", { id: "display" }, this.props.stateInput.subDisplay);
  }}


class MainDisplay extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", { id: "main-display" }, this.props.stateInput.mainDisplay);
  }}


class InputButton extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("button", {
        id: this.props.idValue,
        key: this.props.idValue,
        value: this.props.textValue,
        onClick: this.props.click },

      this.props.textValue));


  }}


class Calculator extends React.Component {
  click(e) {
    this.props.submitInput(e.target.value);
  }
  render() {
    let allKeys = keySymbols.map(item => {
      return /*#__PURE__*/(
        React.createElement(InputButton, {
          idValue: keyNames[keySymbols.indexOf(item)],
          textValue: item,
          click: this.click.bind(this) }));


    });

    return /*#__PURE__*/(
      React.createElement("div", { id: "calculator" }, /*#__PURE__*/
      React.createElement(MainDisplayContainer, null), /*#__PURE__*/
      React.createElement(SubDisplayContainer, null),
      allKeys));


  }}


//map state to props
let mapStateToProps = state => {
  return {
    stateInput: state.inputReduce };

};

//map dispatch to props
let mapDispatchToProps = dispatch => {
  return {
    submitInput: message => {
      return dispatch(inputClick(message));
    } };

};

const SubDisplayContainer = connect(mapStateToProps, null)(SubDisplay);
const MainDisplayContainer = connect(mapStateToProps, null)(MainDisplay);
const CalculatorContainer = connect(null, mapDispatchToProps)(Calculator);

class Developer extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("p", { id: "developer" }, "Coded by Sathish ")));


  }}


const ProjectName = () => {
  return /*#__PURE__*/React.createElement("h1", { id: "project-name" }, "JavaScript Calculator");
};

const Attribution = () => {
  return /*#__PURE__*/(
    React.createElement("footer", { id: "attribution" }, /*#__PURE__*/
    React.createElement("strong", null, "Attribution"), ": This project is an exact replica of 'A JavaScript Calculator' at Freecodecamp at URL:  ", /*#__PURE__*/
    React.createElement("a", { href: "https://codepen.io/freeCodeCamp/full/wgGVVX" }, "https://codepen.io/freeCodeCamp/full/wgGVVX"), ". This project was done as a part of course work of Front End development libraries course on Freecodecamp."));



};

class App extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement("div", { id: "app-background" }, /*#__PURE__*/
      React.createElement(ProjectName, null), /*#__PURE__*/
      React.createElement(CalculatorContainer, null), /*#__PURE__*/
      React.createElement(Developer, null), /*#__PURE__*/
      React.createElement(Attribution, null))));



  }}


//Render to Dom
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));