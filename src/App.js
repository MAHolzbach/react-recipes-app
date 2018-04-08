import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import uuidV4 from "uuid/v4";

import { compose, graphql } from "react-apollo";
import ListRecipes from "./queries/ListRecipes";
import CreateRecipe from "./mutations/CreateRecipe";

class App extends Component {
  state = {
    name: "",
    ingredient: "",
    direction: "",
    ingredients: [],
    directions: []
  };

  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  addIngredient = () => {
    if ((this.state.ingredient = "")) return;

    const ingredients = this.state.ingredients;

    ingredients.push(this.state.ingredient);

    this.setState({
      ingredient: ""
    });
  };

  addDirection = () => {
    if ((this.state.direction = "")) return;

    const directions = this.state.directions;

    directions.push(this.state.direction);

    this.setState({
      direction: ""
    });
  };

  addRecipe = () => {
    const { name, ingredients, directions } = this.state;
    this.props.onAdd({
      name,
      ingredients,
      directions,
      id: uuidV4()
    });
    this.setState({
      name: "",
      ingredient: "",
      direction: ""
    });
  };

  render() {
    console.log("props: ", this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.props.recipes.map((recipe, index) => (
          <div key={index}>
            <p>{recipe.name}</p>
          </div>
        ))}
      </div>
    );
  }
}

const syles = {};

export default compose(
  graphql(ListRecipes, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: props => ({
      recipes: props.data.listRecipes ? props.data.listRecipes.items : []
    })
  }),
  graphql(CreateRecipe, {
    props: props => ({
      onAdd: recipe =>
        props.mutate({
          variable: recipe
        })
    })
  })
)(App);
