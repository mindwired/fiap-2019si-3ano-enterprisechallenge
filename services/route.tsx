import axios from "axios";

export const getBestRoute = (from, to) => {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;
  const headers = {
      Authorization: process.env.NEXT_PUBLIC_ORS_KEY,
  };
  const body = {
      coordinates: [[from.lng, from.lat], [to.lng, to.lat]]
  };
  return axios.post(url, body, { headers }).then((res) => res.data);
};
