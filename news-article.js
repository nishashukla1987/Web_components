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

  customElements.define('news-article', NewsArticle);