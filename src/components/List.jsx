import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Total from "./totalpermonth";

const Exercise = props => (
  <tr>
    <td>{props.exercise.category}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.price}</td>
    <td>{props.exercise.date}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="/"
        onClick={() => {
          props.deleteList(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  state = {
    exercises: [],
    orderedList: []
  };

  async componentDidMount() {
    await axios
      .get("http://localhost:5000/exercises/")
      .then(response => {
        this.setState({ exercises: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async deleteList(id) {
    await axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteList={this.deleteList}
          key={currentexercise._id}
          price={currentexercise.price}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>出費</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>カテゴリー</th>
              <th>内容</th>
              <th>金額</th>
              <th>日付</th>
              <th>編集</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
        <Total />
      </div>
    );
  }
}
