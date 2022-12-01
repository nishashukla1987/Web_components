class NewsArticle extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'open' });
    }
    
    set article(article) {
      this.root.innerHTML = `
            <style>
            .div-box {
              margin: 10px;
            }

            h2 {
                font-family: Georgia, 'Times New Roman', Times, serif;
            }

            a,
            a:visited {
                text-decoration: none;
                color: inherit;
            }

            img {
                width: 100%;
            }
            </style>

            <div class="div-box">
                  <a href="${article.url}">
                      <h2>${article.title}</h2>
                      <img src="${article.urlToImage ? article.urlToImage : ''}">
                      <p>${article.description ? article.description : '' }</p>
                  </a>
            </div>
            `;
    }
  }
  window.addEventListener('load', () => {
    getNews();
   // registerSW();
  });
  
  async function getNews() {
      const apiKey = 'f933701ef7054d0786f9f4d668168558';
      const topHeadlinesUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;
      const res = await fetch(topHeadlinesUrl);
      console.log("res##",res);
      const json = await res.json();
      console.log("json##",json);
      const main = document.querySelector('main');
      console.log("main##",main);
      json.articles.forEach(article => {
      const el = document.createElement('news-article');
      console.log("earticlel##",article);
      el.article = article;
        main.appendChild(el);
      });
  }
  
  async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
  }

  customElements.define('news-article', NewsArticle);