import { useState, useEffect } from "react";

const COVID_STAT_API_URL =
  "https://covid.ourworldindata.org/data/owid-covid-data.json";

const mapDataToCountryList = (data) =>
  Object.keys(data)
    .map((region) => {
      if (!region.startsWith("OWID_") && data[region].location) {
        return {
          label: data[region].location,
          countryCode: region,
        };
      }
    })
    .filter((item) => item !== undefined);

const useFetchData = () => {
  const [response, setResponse] = useState(undefined);
  const [countryList, setCountryList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(COVID_STAT_API_URL);
        const json = await res.json();

        setCountryList(mapDataToCountryList(json));
        setResponse(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { response, countryList, error, loading };
};

export default useFetchData;
