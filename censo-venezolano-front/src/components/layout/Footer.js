import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small default-primary-color text-primary-color">
        <div className="centrado">
          <div className="container">
            <div className="row py-4 d-flex align-items-center">
              <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0">
                  {' '}
                  Get connected with us on social networks!{' '}
                </h6>{' '}
              </div>

              <div className="col-md-6 col-lg-7 text-center text-md-right">
                <a className="fb-ic">
                  <i className="fab fa-facebook white-text mr-4"> </i>{' '}
                </a>{' '}
                <a className="tw-ic">
                  <i className="fab fa-twitter white-text mr-4"> </i>{' '}
                </a>{' '}
                <a className="gplus-ic">
                  <i className="fab fa-google-plus white-text mr-4"> </i>{' '}
                </a>{' '}
                <a className="li-ic">
                  <i className="fab fa-linkedin white-text mr-4"> </i>{' '}
                </a>{' '}
                <a className="ins-ic">
                  <i className="fab fa-instagram white-text"> </i>{' '}
                </a>
              </div>
            </div>{' '}
          </div>{' '}
        </div>
        <div className="container-fluid footer-copyright text-center py-3 text-primary-color dark-primary-color">
          Created by:
          <a
            className="text-primary-color"
            href="http://juanpgonzalez.com/"
            target="_blank"
          >
            {' '}
            Juan Pablo{' '}
          </a>{' '}
          &
          <a
            className="text-primary-color"
            href="http://rangel10.github.io/"
            target="_blank"
          >
            {' '}
            Ricardo Angel{' '}
          </a>{' '}
        </div>{' '}
      </footer>
    );
  }
}

export default Footer;
