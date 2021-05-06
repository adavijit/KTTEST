import React, { Component } from "react";

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
      classNames: ["", "", "", ""],
      clicked: null,
      option: null,
    };

    this.checkAnswer = this.checkAnswer.bind(this);
  }
  componentDidMount() {
    console.log(this.props.isAnswered, "COU");
    this.props.markVisited(this.props.count);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.count !== prevProps.count) {
      this.setState({
        ...this.state,
        clicked: null,
      });
      console.log(this.props.isAnswered, "COU");
      this.checkAttemptedAns(this.props.count);
      this.props.markVisited(this.props.count);
    }
  }
  checkAttemptedAns = (count) => {
    let ans = null;
    this.props.isAnswered.map((attempt) => {
      if (attempt.count === count) {
        ans = attempt.count;
        console.log(ans, "ANS");
      }
    });
    this.setState({
      ...this.state,
      clicked: ans,
    });
    return ans;
  };
  checkAnswer(e) {
    // let { isAnswered } = this.props;

    // if (!isAnswered) {
    //   this.props.showButton();
    // }

    this.setState({
      ...this.state,
      clicked: e,
    });

    if (this.props.correct === e) {
      console.log("COrrect");
      this.props.increaseScore();
    } else {
      this.props.decreaseScore();
    }
    this.props.markAttempted(this.props.count, e);
  }

  render() {
    let { answers } = this.props;
    let { classNames } = this.state;

    return (
      <div id="answers">
        <ul>
          <li
            onClick={() => this.checkAnswer(0)}
            className={this.state.clicked === 0 ? "clicked" : ""}
          >
            <span>A</span>
            <p>{answers[0]}</p>
          </li>

          <li
            onClick={() => this.checkAnswer(1)}
            className={this.state.clicked === 1 ? "clicked" : ""}
          >
            <span>B</span>
            <p>{answers[1]}</p>
          </li>

          <li
            onClick={() => this.checkAnswer(2)}
            className={this.state.clicked === 2 ? "clicked" : ""}
          >
            <span>C</span>
            <p>{answers[2]}</p>
          </li>

          <li
            onClick={() => this.checkAnswer(3)}
            className={this.state.clicked === 3 ? "clicked" : ""}
          >
            <span>D</span>
            <p>{answers[3]}</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default Answers;
