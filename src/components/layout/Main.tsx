import React, { useContext, useState } from 'react';
import { createStyles, Style } from '../../utils/styles';

import searchIcon from '../../assets/svg/searchbar_icon.svg'

import aToZFilterIcon from '../../assets/svg/filter_buttons/a_to_z_alphabetical_filter_icon.svg';
import zToAFilterIcon from '../../assets/svg/filter_buttons/z_to_a_alphabetical_filter_icon.svg';
import ascendingCasesFilterIcon from '../../assets/svg/filter_buttons/ascending_cases_filter_icon.svg';
import descendingCasesFilterIcon from '../../assets/svg/filter_buttons/descending_cases_filter_icon.svg';

import "./Main.styles.css";
import useData from '../../hooks/useData';
import Api from '../../utils/api';
import { BasicCountryData } from '../../utils/api.interfaces';
import CountryContext from '../../contexts/CountryContext';

const styles: Style = createStyles({
  main: [
    "bg-white",
    "text-watermelon",
    "flex-grow",
    "flex",
    "flex-col",
    "gap-4",
    "p-4",
    "sm:p-6",
    "box-border",
    "overflow-auto"
  ],
  header: [
    "flex",
    "justify-between",
    "items-center",
    "text-4xl",
    "font-light",
  ],
  headerRight: [
    "flex",
    "gap-3"
  ],
  filterIcon: [
    "w-9",
    "h-9",
    "sm:w-10",
    "sm:h-10",
    "cursor-pointer",
    "hover:scale-105",
    "transition-all",
    "active:scale-95"
  ],
  searchContainer: [
    "flex",
    "gap-2",
    "items-center"
  ],
  searchIcon: [
    "w-9",
    "h-9"
  ],
  searchBar: [
    "font-light",
    "h-9",
    "w-full",
    "bg-watermelon",
    "placeholder-watermelon-fg",
    "text-white",
    "rounded-lg",
    "text-2xl",
    "border-collapse",
    "outline-none",
    "box-border",
    "px-[10px]",
    "py-[5px]",
    "pt-[8px]"
  ],
  countriesResults: [
    "w-full",
    "h-full",
    "bg-watermelon-fg",
    "rounded-lg",
    "flex",
    "flex-col",
    "p-4",
    "gap-2",
    "overflow-y-scroll"
  ],
  countryResult: [
    "flex",
    "justify-between",
    "bg-watermelon",
    "text-white",
    "p-2",
    "px-4",
    "rounded-lg",
    "text-lg",
    "font-light",
    "cursor-pointer",
    "hover:scale-[1.01]",
    "transition-all",
    "active:opacity-75",
    "active:duration-100"
  ],
  countryResultName: [
    "relative",
    "top-1"
  ],
  countryResultCases: [
    "relative",
    "top-[0.15rem]"
  ],
  loading: [
    "text-black"
  ],
  noResultsText: [
    "text-black"
  ]
});

enum SortType {
  aToZ = "aToZ",
  zToA = "zToA",
  ascendingCases = "ascendingCases",
  descendingCases = "descendingCases"
}

const Main: React.FC = () => {
  const { setCountry } = useContext(CountryContext);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState<SortType>(SortType.aToZ);

  const countries: BasicCountryData[] = useData(Api.getCountries);
  const displayedCountries: BasicCountryData[] = countries ? countries.filter((country: BasicCountryData) => {
    return country.name.toLowerCase().includes(search.toLowerCase());
  }).sort((a: BasicCountryData, b: BasicCountryData) => {
    switch (sortType) {
      case SortType.aToZ:
        return a.name.localeCompare(b.name);
      case SortType.zToA:
        return b.name.localeCompare(a.name);
      case SortType.ascendingCases:
        return a.totalCases - b.totalCases;
      case SortType.descendingCases:
        return b.totalCases - a.totalCases;
    }
  }) : [];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          {/* Left */}
          <h2>Countries</h2>
        </div>
        <div className={styles.headerRight}>
          {/* Right */}
          <img onClick={() => setSortType(SortType.ascendingCases)} className={styles.filterIcon} src={ascendingCasesFilterIcon} alt="Ascending Cases Filter Icon" />
          <img onClick={() => setSortType(SortType.descendingCases)} className={styles.filterIcon} src={descendingCasesFilterIcon} alt="Descending Cases Filter Icon" />
          <img onClick={() => setSortType(SortType.aToZ)} className={styles.filterIcon} src={aToZFilterIcon} alt="A to Z Alphabetical Filter Icon" />
          <img onClick={() => setSortType(SortType.zToA)} className={styles.filterIcon} src={zToAFilterIcon} alt="Z to A Alphabetical Filter Icon" />
        </div>
      </header>
      <div className={styles.searchContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt="Search Icon" />
        <input
          className={styles.searchBar}
          type="text"
          name="search"
          id="searchbar"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div id='countriesResults' className={styles.countriesResults}>
        {
          countries === null
          ? <div className={styles.loading}>Loading...</div>
          : displayedCountries.length > 0
          ? displayedCountries.map((country: BasicCountryData) =>
            <div onClick={() => setCountry(country)} className={styles.countryResult} key={country.name}>
              <span className={styles.countryResultName}>{country.name}</span>
              <span className={styles.countryResultCases}>{country.totalCases.toLocaleString("en")} cases</span>
            </div>
          )
          : <div className={styles.noResultsText}>No countries found</div>
        }
      </div>
    </main>
  );
};

export default Main;