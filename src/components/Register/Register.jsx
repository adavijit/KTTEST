import React, { Component } from "react";
import { withRouter } from "react-router";

import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dob: "",
      email: "",
      valid: {
        name: true,
        dob: true,
        email: true,
      },
      touched: {
        name: false,
        dob: false,
        email: false,
      },
    };

    this.rexExpMap = {
      name: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,

      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,

      dob: /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.checkOnSubmit = this.checkOnSubmit.bind(this);
  }

  handleChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.checkData(
        this.rexExpMap[name],
        this.state[name],
        this.state.valid[name],
        name
      );
    });
  };
  checkData(regExp, stateName, name) {
    this.setState({
      touched: { ...this.state.touched, [name]: true },
    });
    if (regExp.test(stateName)) {
      this.setState({
        valid: { ...this.state.valid, [name]: true },
      });
    } else {
      this.setState({
        valid: { ...this.state.valid, [name]: false },
      });
    }
  }
  validate(name, dob, email) {
    return {
      name: name.length === 0,
      email: email.length === 0,
      dob: dob.length === 0,
    };
  }
  requiredStyle(name) {
    const show =
      (this.state[name] === "" || !this.state.valid[name]) &&
      this.state.touched[name];
    return { display: show ? "block" : "none" };
  }
  errorMessages(name) {
    const requiredStr = "This field is required.";
    const invalidStr = "Enter valid " + name + ".";
    return !this.state.valid[name] && this.state[name] !== ""
      ? invalidStr
      : requiredStr;
  }
  checkOnSubmit() {
    const { name, dob, email } = this.state;
    const formFilled = !(name === "" || dob === "" || email === "");

    const formInvalid = Object.keys(this.state.valid).some(
      (x) => this.state.valid[x]
    );

    const formHasErrors = formFilled && formInvalid;

    if (formHasErrors) {
      sessionStorage.setItem("u_email", email);
      this.props.history.push("/start");
    }
    this.setState({
      touched: {
        name: true,
        dob: true,
        email: true,
      },
    });
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.dob,
      this.state.email
    );
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const { name, dob, email } = this.state;

    let formHasErrors = name === "" || dob === "" || email === "";

    return (
      <div className="container">
        <div className="register-form">
          <div className="form">
            <div>
              <label>
                Name
                <input
                  type="text"
                  value={this.state.name}
                  name="name"
                  id="name"
                  className={shouldMarkError("name") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "name")}
                />
              </label>
              <span
                className="required-field"
                style={this.requiredStyle("name")}
              >
                {this.errorMessages("name")}
              </span>
            </div>
            <div>
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  className={shouldMarkError("email") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "email")}
                />
              </label>

              <span
                className="required-field"
                style={this.requiredStyle("email")}
              >
                {this.errorMessages("email")}
              </span>
            </div>
            <div>
              <label>
                Date of birth
                <input
                  type="date"
                  value={this.state.dob}
                  name="dob"
                  className={shouldMarkError("dob") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "dob")}
                />
              </label>
              <span
                className="required-field"
                style={this.requiredStyle("dob")}
              >
                {this.errorMessages("dob")}
              </span>
            </div>

            <button
              className={
                formHasErrors ? "sb-btn btn-disabled" : "sb-btn btn-enabled"
              }
              type="button"
              onClick={this.checkOnSubmit}
            >
              Begin test
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
