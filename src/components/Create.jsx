import React, { Component } from "react";
import axios from "axios";

export default class CreateExercise extends Component {
  state = {
    category: "",
    description: "",
    price: 0,
    date: "",
    users: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.category),
            category: response.data[0].category
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeCategory = e => {
    this.setState({ category: e.target.value });
  };

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangePrice = e => {
    this.setState({ price: e.target.value });
  };

  onChangeDate = date => {
    this.setState({ date: date.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      category: this.state.category,
      description: this.state.description,
      price: this.state.price,
      date: this.state.date
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(res => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>新しい出費の入力</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>カテゴリー: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.category}
              onChange={this.onChangeCategory}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>内容: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>金額: </label>
            <input
              required
              type="number"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          <div className="form-group">
            <label>日付: </label>
            <div>
              <input
                required
                type="date"
                className="form-control"
                value={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
