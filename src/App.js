import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      descriptionOTPFunc: ""
    };
  }
  componentDidMount() {
    if ("OTPCredential" in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otpnya) => {
          this.setState({ descriptionOTPFunc: "OTP founded" })
          this.setState({ otp: otpnya.code });
          this.setState({ descriptionOTPFunc: otpnya })
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.log(err);
          this.setState({ descriptionOTPFunc: "OTP not found. Catch block" })
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
            value={this.state.otp}
            onChange={event => this.setState({ otp: event.target.value })}
          />
          <input type="submit" />
        </form>
        <b>Process that are going on in the system:</b>
        <p>{this.state.descriptionOTPFunc}</p>
        <p>ini otpnya: {this.state.otp}</p>
      </section>
    )
  }
}