import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      error: "",
      descriptionOTPFunc: ""
    };
  }
  componentDidMount() {
    this.autofillOTP();
  }

  async autofillOTP() {
    this.setState({ descriptionOTPFunc: "mulai autofillOTP function" });
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      try {
        if (navigator.credentials) {
          try {
            this.setState({ descriptionOTPFunc: "try block 2" });
            navigator.credentials
              .get({
                otp: { transport: ['SMS'] },
                signal: ac.signal
              }).then(otp => {
                if (otp && otp.code) {
                  this.setState({ otp: otp.code });
                  this.setState({ descriptionOTPFunc: "navigator.credential -> there is otp" });
                  ac.abort();
                }
              }).catch(error => {
                this.setState({ descriptionOTPFunc: "catch block navigator.credentials 1" });
                console.log(error);
                ac.abort();
              });
          } catch (error) {
            console.log(error);
            this.setState({ error: "catch block navigator.credentials 2" });
          }
        } else {
          this.setState({ error: "!navigator.credential" });
          ac.abort();
        }
      } catch (error) {
        console.log(error);
        this.setState({ error: 'OTPCredential' });
        ac.abort();
      }
    } else {
      this.setState({ error: 'WEBOTP API not supported' });
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
        {/* <p>{this.state.error}</p> */}
      </section>
    )
  }
}