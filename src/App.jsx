import './App.css';
import SectionComponent from './sections/SectionComponent';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HOME = 'Home';

export default function App() {
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const location = useLocation();

  useEffect(() => {
    getPages().then((pageList) => {
      setPages(pageList.data.pages);
    });
  }, []);

  useEffect(() => {
    if (pages) {
      setCurrentPage(getPage(location.pathname.replace('/', ''), pages));
    }
  }, [location, pages]);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Selfcare
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {pages &&
                pages.map(
                  (page) =>
                    page.title !== HOME && (
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to={`/${page.title}`}
                        key={page.title}
                      >
                        {page.title}
                      </Link>
                    )
                )}
            </div>
          </div>
        </div>
      </nav>
      {currentPage &&
        currentPage.sections.map((section) => (
          <SectionComponent key={section.id} section={section} />
        ))}
    </div>
  );
}

async function getPages() {
  var query = `query MyQuery {
  pages {
    id
    title
    sections {
      ... on CallToAction {
        buttonText
        buttonUrl
        componentType
        description
        heading
        id
        photo {
          url(transformation: {image: {resize: {width: 100}}})
        }
      }
      ... on Offering {
        componentType
        externalReference
        id
      }
    }
  }
}`;

  const r = await fetch(
    'https://api-us-east-1.graphcms.com/v2/ckjlxpvg9epv701z0b07kfgqc/master',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    }
  );
  return await r.json();
}

function getPage(name, pages) {
  if (!name) {
    name = HOME;
  }
  return pages.find((x) => {
    return x.title === name;
  });
}
