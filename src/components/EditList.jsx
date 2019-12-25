import React, { Component } from "react";
import axios from "axios";

export default class EditExercise extends Component {
  state = {
    category: "",
    description: "",
    price: 0,
    date: "",
    users: []
  };

  async componentDidMount() {
    await axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          category: response.data.category,
          description: response.data.description,
          price: response.data.price,
          date: response.data.date
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get("http://localhost:5000/users/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.category)
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
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then(res => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>編集</h3>
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
              type="text"
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
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
