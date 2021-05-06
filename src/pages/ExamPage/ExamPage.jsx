import React, { Component } from "react";
import data from "../../assets/data";
import Answers from "../../components/Answers/Answers.jsx";
import "./ExamPage.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
let score = 0;
class ExamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      total: data.length,
      showButton: false,
      questionAnswered: false,
      score: 0,
      displayPopup: "none",
      attempted: [],
      visited: [],
      openModal: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleShowButton = this.handleShowButton.bind(this);
    this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    this.handleDecreaseScore = this.handleDecreaseScore.bind(this);
  }

  componentWillMount() {
    let { count } = this.state;
    this.insertData(count);
  }

  insertData(count) {
    this.setState({
      question: data[count].question,
      answers: [
        data[count].answers[0],
        data[count].answers[1],
        data[count].answers[2],
        data[count].answers[3],
      ],
      correct: data[count].correct,
    });
  }

  handleShowButton() {
    this.setState({
      showButton: true,
      questionAnswered: true,
    });
  }

  nextQuestion() {
    let { count, total } = this.state;

    if (count === total) {
      this.setState({
        displayPopup: "flex",
      });
    } else {
      this.setState(
        {
          showButton: false,
          questionAnswered: false,
          count: this.state.count + 1,
        },
        () => {
          this.insertData(count + 1);
        }
      );
    }
  }

  handleIncreaseScore() {
    console.log("COrrect score");

    score = score + 1;
  }
  handleDecreaseScore() {
    score = score - 1;
  }
  getScore = () => {
    this.setState({
      displayPopup: "flex",
      openModal: true,
    });
  };
  checkAttempted = (count) => {
    let check = false;
    this.state.attempted.map((attempt) => {
      if (attempt.count === count) {
        check = true;
      }
    });
    return check;
  };
  checkVisited = (count) => {
    if (this.state.visited.includes(count)) {
      return true;
    }
    return false;
  };
  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { count, total, question, answers, correct } = this.state;
    console.log(this.state.score);

    return (
      <div className="container">
        <Modal
          open={this.state.openModal}
          onClose={this.onCloseModal}
          center={true}
          closeOnOverlayClick={false}
          showCloseIcon={false}
        >
          You have scored {score} / {total}
        </Modal>

        <div className="row">
          <div className="col-lg-12 col-md-10">
            <div id="question">
              <div className={"pallete-div"}>
                {data.map((d, i) => {
                  return (
                    <div
                      className={
                        this.checkAttempted(i)
                          ? "attempted pallete-main"
                          : this.checkVisited(i)
                          ? "visited pallete-main"
                          : "pallete-main"
                      }
                      onClick={() => {
                        this.setState(
                          {
                            ...this.state,
                            count: i,
                          },
                          () => {
                            this.insertData(i);
                          }
                        );
                      }}
                    >
                      <a>{i + 1}</a>
                    </div>
                  );
                })}
              </div>

              <br />

              <p>{question}</p>
            </div>

            <Answers
              count={this.state.count}
              answers={answers}
              correct={correct - 1}
              showButton={this.handleShowButton}
              isAnswered={this.state.attempted}
              increaseScore={this.handleIncreaseScore}
              markAttempted={(count, ans) => {
                let arr = [...this.state.attempted];

                const i = arr.findIndex((_item) => _item.count === count);
                if (i > -1) arr[i] = { count: count, ans: ans };
                // (2)
                else arr.push({ count: count, ans: ans });

                this.setState(
                  {
                    ...this.state,
                    attempted: arr,
                  },
                  () => {
                    console.log(this.state.attempted, "aTT");
                  }
                );
              }}
              markVisited={(count) => {
                const arr = [...this.state.visited];
                arr.push(count);
                this.setState(
                  {
                    ...this.state,
                    visited: arr,
                  },
                  () => {
                    console.log(this.state.visited, "VTT");
                  }
                );
              }}
              decreaseScore={this.handleDecreaseScore}
            />

            <div id="submit">
              <button
                className="fancy-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (count + 1 !== total) {
                    this.nextQuestion();
                  } else {
                    this.getScore();
                  }
                }}
              >
                {count + 1 === total ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ExamPage;
