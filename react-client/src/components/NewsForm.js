import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class NewsForm extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            author: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postNews = this.postNews.bind(this);
    }

    postNews() {
        console.log("Se hizo click");
        fetch('http://localhost:8080/news', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                author: '5ded74875bc2161bd81a2b19'
            })
        })
            .then(function (response) {
                console.log(response.json()); //response.json() is resolving its promise. It waits for the body to load
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <form noValidate autoComplete="off">
                    <TextField id="standard-title" type="text" label="Titulo" name="title" onChange={this.handleInputChange} />
                    <br />
                    <TextField id="standard-description" type="text" label="Descripción" name="description" onChange={this.handleInputChange} />
                    <br /><br />
                    <Button variant="outlined" type="submit" value="Submit" onClick={() => {this.postNews()}} >Publicar</Button>
                </form>
            </div>
        )
    }
}

export default NewsForm