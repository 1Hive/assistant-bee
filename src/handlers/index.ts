// const getHoneyFlow from './getHoneyFlow')
import address from "./address";
import help from "./help";
import brightid from "./brightid";
import price from "./price";
import metrics from "./getMetrics";
//const { verifyDiscourse, checkDiscourse } from './discourse')
//const { verifyGithub, checkGithub } from './github')
import official from "./getOfficialAccounts";
import xDai from "./getxDai";
import saveWallet from "./saveWallet";
import ayuda from "./ayuda";
import sites from "./sites";

const handlers = new Map([
  ["address", address],
  ["help", help],
  ["brightid", brightid],
  ["price", price],
  ["metrics", metrics],
  //['verify-discourse', verifyDiscourse],
  //['check-discourse', checkDiscourse],
  //['verify-github', verifyGithub],
  //['check-github', checkGithub],
  ["sites", sites],
  ["save-wallet", saveWallet],
  ["official", official],
  ["network", xDai],
  ["ayuda", ayuda],
]);

export default handlers;
