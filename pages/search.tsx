import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBestRoute } from "../services/route";

const SearchBestRoutesPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routes, setRoutes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getBestRoute(from, to).then((data) => {
      setRoutes(data.routes);
    });
  }, [from, to]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/routes/${from}/${to}`,
    });
  };

  return (
    <div className="container">
      <h1>Search Best Routes</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            className="form-control"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            type="text"
            className="form-control"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <ul className="list-unstyled">
        {routes.map((route) => (
          <li key={route.id}>
            {route.from} to {route.to}
            <ul className="list-unstyled">
              {route.steps.map((step) => (
                <li key={step.id}>
                  {step.distance} km, {step.duration} min
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBestRoutesPage;