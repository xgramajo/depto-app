import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NewsCard extends React.Component {

    constructor() {
        super();
        this.state = {
          news: []
        }
      }

    componentDidMount() {

        fetch("http://localhost:8080/news")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    news: data
                });
                console.log(data)
            })
            .catch(console.log)

    }

    deleteNews(id) {
        fetch('http://localhost:8080/news/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => console.log(res.json()))
    };

    render() {
        return (
            <div>
                <Typography variant="subtitle1">List of news</Typography>
                {this.state.news.map((newsItem) => (
                    <Card className='card' key={newsItem._id}>
                        <CardContent>
                            <Typography type="text" className='card-title' color="textSecondary" gutterBottom>
                                {newsItem.title}
                            </Typography>
                            <Typography type="text" variant="body2" component="p">
                                {newsItem.description}
                            </Typography>
                            <Typography variant="inherit" component="p">
                                {newsItem.date}
                            </Typography>
                            <CardActions>
                                <Button size="small" type="submit" value="Submit" onClick={() => { this.deleteNews(newsItem._id) }}>Borrar</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

};

export default NewsCard