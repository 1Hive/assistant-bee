// const getHoneyFlow from './getHoneyFlow')
import address from "./address";
import help from "./help";
import brightid from "./brightid";
import price from "./price";
import metrics from "./getMetrics";
import official from "./getOfficialAccounts";
import xDai from "./getxDai";
import ayuda from "./ayuda";
import sites from "./sites";

const handlers = new Map([
  ["address", address],
  ["help", help],
  ["brightid", brightid],
  ["price", price],
  ["metrics", metrics],
  ["sites", sites],
  ["official", official],
  ["network", xDai],
  ["ayuda", ayuda],
]);

export default handlers;
