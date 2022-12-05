import { useEffect, useState } from "react";
import NewsArticle from "../../components/newsarticle/NewsArticle";
import "./Home.css";

const articlesEndpoint = `https://newsapi.org/v2/top-headlines?country=de&apiKey=${process.env.REACT_APP_API_KEY}`;

function Home() {
    const [articles, setArticles] = useState([]);
    const [timeOfTheDay, setTimeOfTheDay] = useState(Date.now());

    // Update das Datum alle 10 Sekunden
    useEffect(() => {
        setInterval(() => {
            setTimeOfTheDay(Date.now());
        }, 10000)
    }, []);

    // useEffect(callbackFunction, dependencyArray)
    // dependency array bleibt leer wenn wir nur beim ersten render etwas ausführen wollen

    // useEffect wird immer beim ersten render ausgeführt
    // steht eine variable im dependency array wird es ausgeführt sobald sich die variable verändert
    useEffect(() => {
        console.log("Getting new articles from the server");

        fetch(articlesEndpoint)
            .then((response) => {
                return response.json();
            })
            .then((articlesJson) => {
                setArticles(articlesJson.articles);
            })
        // Wenn sich timeOfTheDay ändert wird useEffect erneut ausgeführt
    }, [timeOfTheDay]);

    return (
        <section>
            {articles.map((article, index) => <NewsArticle key={index} imgUrl={article.urlToImage} title={article.title} description={article.description} publishedAt={article.publishedAt} linkToArticle={article.url} />)}
        </section>
    );
}

export default Home;