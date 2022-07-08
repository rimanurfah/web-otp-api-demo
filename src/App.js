import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedOtp: "",
      descriptionOTPFunc: ""
    };
  }
  componentDidMount() {
    if ("OTPCredential" in window) {
      window.addEventListener("DOMContentLoaded", (e) => {
        this.setState({ descriptionOTPFunc: "waiting formatted SMS" })
        const input = document.querySelector(
          'input[autocomplete="one-time-code"]'
        );
        if (!input) return;
        const ac = new AbortController();

        navigator.credentials
          .get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
          })
          .then((otp) => {
            this.setState({ descriptionOTPFunc: "OTP founded" })
            // this.setState({ receivedOtp: otp.code });
            input.value = otp.code
            this.setState({ descriptionOTPFunc: otp })
            ac.abort();
          })
          .catch((err) => {
            ac.abort();
            console.log(err);
            this.setState({ descriptionOTPFunc: "OTP not found. Catch block" })
          });
      });
    } else {
      this.setState({ descriptionOTPFunc: "WEB OTP API not supported" })
    }
  }

  render() {
    return (
      <section style={{ marginLeft: "1rem" }} >
        <h1>WEB OTP API Demo</h1>
        <form style={{ marginBottom: "1rem" }}>
          <input
            required
            autoComplete="one-time-code"
            value={this.state.receivedOtp}
            onChange={event => this.setState({ receivedOtp: event.target.value })}
          />
          <input type="submit" />
        </form>
        <b>Process that are going on in the system:</b>
        <p>{this.state.descriptionOTPFunc}</p>
        <p>ini otpnya: {this.state.receivedOtp}</p>
      </section>
    )
  }
}