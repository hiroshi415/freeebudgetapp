import React, { Component } from "react";
import axios from "axios";

const Total = props => {
  let sum = 0;
  for (let i = 0; i < props.list.length; i++) {
    sum += props.list[i].price;
  }
  return (
    <div>
      合計額:
      {sum}円
    </div>
  );
};

export class totalpermonth extends Component {
  state = {
    total: []
  };

  async componentDidMount() {
    await axios
      .get("http://localhost:5000/exercises/")
      .then(response => {
        this.setState({ total: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <Total list={this.state.total} />
      </>
    );
  }
}

export default totalpermonth;
