import React from 'react';
import { Category, Article } from './types';

/*Material UI*/
import Button from '@material-ui/core/button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import PrimarySearchAppBar from './Header/Header';
import CircularProgressWithLabel from './Loader/Loader';

/*Components*/
import TemporaryDrawer from './LeftNavBar/Sidebar';
import Footer from './Footer/Footer';
import './ProductList.css';
import ErrorBoundary from './CatchComponent/ErrorHandling';

/*Currency Formatting */ 
var intlNumberFormatValues = ['de-DE', 'currency', 'EUR'];

export var formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
    style: intlNumberFormatValues[1],
    currency: intlNumberFormatValues[2],
});

/*State variables */
type State = {
    categories: Category[];
};

/*Card display of items using Material UI*/
export var ArticleCard = ({ article }: { article: Article }) => {
    return (
        <Card sx={{ maxWidth: 400, lineHeight:1 }}>
          <Fab size="small" color="default"  aria-label="like" sx={{ float: "right", marginRight: 1 }}>
                <FavoriteIcon />
          </Fab>
          <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Compare" sx={{ float: "left", margin:1 }} />                
          </FormGroup>
          <Tooltip title={article.name}>
                <CardMedia component="img" sx={{ position: "inherit" }}
                            image={article.images[0].path} alt={article.name}/>
          </Tooltip>
          <CardContent>
                <Typography noWrap gutterBottom variant="subtitle1" component="div">
                    {article.name}
                </Typography>                  
                <Typography variant="h6" fontStyle="oblique" color=" text.chocolate">
                    {formatter.format(article.prices.regular.value / 100)}
                </Typography>
                <Typography variant="h6" fontStyle="oblique" color=" text.chocolate">
                    <p><LocalShipping></LocalShipping>Nov 23 - Nov 26</p>
                </Typography>
          </CardContent>
            <CardActions>
                <Button variant="contained" color="primary">Add to cart</Button>
            </CardActions>
        </Card>
    )
};

class ArticleList extends React.Component {
    state: State = {
        categories: [],
    };

/*componentDidMount() is invoked immediately after a component is mounted*/
/*Setstate call inside this will trigger an extra rendering,
 * but it will happen before the browser updates the screen
 **/

/*
 * An async function is a function that knows how to expect the possibility of the await keyword 
 * being used to invoke asynchronous code.
 * always returns a promise.
 * Other values are wrapped in a resolved promise automatically.
 * 
 * */

    async componentDidMount()
    {
        try
        {
            const categories = await this.getcategories();
            this.setState({ categories: categories.data.categories })
        }
        catch(error)
        {
            console.log(error);
        }
    }

    getcategories = async () => {
        const itemsQueryBody = this.getItemsByTitleQuery();
        const response = await this.performQuery(itemsQueryBody);
        return await response.json();
    };

    getItemsByTitleQuery = () => {
        return JSON.stringify({
            query: `{
        categories(ids: "156126", locale: de_DE) {
          name
          articleCount
          childrenCategories {
            name
            urlPath
          }
          categoryArticles(first: 50) {
            articles {
              name
              variantName
              prices {
                currency
                regular {
                  value
                }
              }
              images(
                format: WEBP
                maxWidth: 200
                maxHeight: 200
                limit: 1
              ) {
                path
              }
            }
          }
        }
      }`});

    };
/*
 * The POST method requests that a web server accept the data enclosed in the body of the request message
 * 
 **/
    performQuery = async (query: any) =>
    { 
        const res = fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
             body:query
        });
        return res;
}
/*
 * to display the specified HTML code inside the specified HTML element
 * */

    render() {
        var articles = this.state.categories.map((category) => {
            return category.categoryArticles.articles.map((article) => {
                return (<ArticleCard article={article} />);
            });
        });
        const searchBarProps = { // make sure all required component's inputs/Props keys&types match
            categories: this.state.categories
        }
        return (
            <div key="page" className={'page'}>
                <div key="headerlayout" className={'headerlayout'}> 
                    <PrimarySearchAppBar />
                </div> 
                <div key="sidebar" className={'sidebar'}> 
                    <TemporaryDrawer categories={this.state.categories} />    
                </div>
                <div key="content" className={'content'}> 
                    <div key="contentheader" className={'contentheader'}>
                        {this.state.categories.length ? (
                            <h1>
                                {this.state.categories[0].name}
                                    <small> ({this.state.categories[0].articleCount})</small>
                                    <TextField id="outlined-basic" label="Find your favorite..." variant="outlined" sx={{ float: "right"}} />      
                                </h1>
                        ) : (
                                < CircularProgressWithLabel />    
                             )}
                    </div>
                    <Divider />
                    <div key="articles" className={'articles'}>{articles}
                    </div>
                </div>
               <Footer/>
            </div>
        );
    }
}

//var PLP = () => {
//    return <ArticleList />;
//};

export default ArticleList;
 
