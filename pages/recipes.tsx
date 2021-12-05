import React, { useEffect, useState, useRef } from 'react';
import cx from 'clsx';
import { X } from 'react-feather';
import fetchRecipes from '../fetchers/fetchRecipes';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import Card from '../components/Card/Card';
import Search from '../components/Search/Search';
import classes from '../components/CardsContainer/CardsContainer.module.scss';

export default function Recipes({ hits }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState(hits);
  const [value, setValue] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const pageRef = useRef(null);

  async function refetch() {
    const newData = await fetchRecipes(0, value).then(response => response.json());
    if (value.length > 0) {
      const sorted = (newData?.hits || []).sort((a, b) => {
        if (a._highlightResult.title.matchLevel === 'full' && b._highlightResult.title.matchLevel === 'none') return -1;
        if ((a._highlightResult.title.matchLevel === 'full' && b._highlightResult.title.matchLevel === 'full') ||
          (a._highlightResult.title.matchLevel === 'none' && b._highlightResult.title.matchLevel === 'none')) return 0;
        if (a._highlightResult.title.matchLevel === 'none' && b._highlightResult.title.matchLevel === 'full') return 1;
      });
      setCurrentData(sorted);
    } else {
      setCurrentData(newData?.hits || []);
    }
  }

  async function uploadMore() {
    const newData = await fetchRecipes(currentPage + 1, value).then(response => response.json());
    setCurrentData([...currentData, ...(newData?.hits || [])]);
  }

  const onScroll = () => {
    if (pageRef.current && currentData.length > 0) {
      if (window.innerHeight - pageRef.current.getBoundingClientRect().height === pageRef.current.getBoundingClientRect().top) {
        uploadMore();
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [value]);

  useEffect(() => {
    if (document) {
      document.addEventListener('scroll', onScroll);
      return () => {
        document.removeEventListener('resize', onScroll);
      };
    }
  }, []);

  return (
    <div className={classes.recipesContainer} onScroll={onScroll} ref={pageRef}>
      <div className={cx(classes.filter, { [classes.showFilter]: showFilter })}>
        <button className={classes.closeFilter} onClick={() => setShowFilter(false)}>
          <X size={32} color="#43413f"/>
        </button>
      </div>
      <Search
        clear={() => {
          setValue('');
          setCurrentPage(0);
        }}
        onChange={setValue}
        value={value}
      />
      <div className={classes.recipes}>
        <CardsContainer>
          {
            currentData.map((hit, index) => (
              <Card
                className={classes.card}
                key={index}
                image={hit.image}
                title={hit.title}
                href={hit.url}
                studio={hit.studio}
                premium={hit.premium}
                _highlightResult={hit._highlightResult}
              />
            ))
          }
        </CardsContainer>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchRecipes(0, '').then(response => response.json());

  return {
    props: {
      hits: data?.hits || [],
    },
  };
}
