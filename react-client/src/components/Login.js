import React from "react";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {  }
      }

    componentDidMount() {

    }

    render() {
        return (
            
            fetch('http://localhost:8080/login', {
                method: 'GET', redirect: 'follow', headers: {
                    'Accept': 'application/json; charset=UTF-8',
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
                .then(response => {
                    response.text()
                })
                .catch(function (err) {
                    // eslint-disable-next-line
                    console.info(err + " url: " + 'http://localhost:8080/login');
                })
        )
    }
};

export default Login