import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <div className="overlay">
          <div className="row">
            <div className="col-sm-6">
              <div className="about">
                <h4>About</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum rutrum molestie tortor, ut dictum ipsum. Nam
                  venenatis ligula non lectus blandit venenatis. Suspendisse
                  justo magna, suscipit ac blandit et, condimentum eu leo. Ut
                  sed nunc nec massa venenatis pretium quis a turpis. Morbi
                  malesuada odio sem, eu iaculis nibh porttitor vel. Praesent
                  pretium tortor in nibh dapibus, vitae semper erat semper.
                </p>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="links">
                <h4>Links</h4>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about/About">About</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="connect">
                <h4>Connect With Us</h4>
                <ul>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/yakov-haiilo-797944194/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin"></i> linkedin
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100001264699821"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-facebook-square"></i> Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yakovhaiilo"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-github-square"></i> Github
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom-footer text-center">
          &copy; 2020 Gaming Nation. All Rights Reserved.
        </div>
        </div>
       
      </div>
    );
  }
}

export default Footer;
