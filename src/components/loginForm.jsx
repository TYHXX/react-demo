import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import From from "./common/form";
import authService, { login } from "../services/authService";

class LoginForm extends From {
  username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus();
  // }

  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // validate = () => {
  //   const errors = {};

  //   const { data } = this.state;
  //   if (data.username.trim() === "")
  //     errors.username = "Username is required.";
  //   if (data.password.trim() === "")
  //     errors.password = "Password is required.";

  //   return Object.keys(errors).length === 0 ? null : errors;
  // };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    // Call the server
    console.log("Submitted");
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      // this.props.history.push("/");
      // window.location = "/";
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
