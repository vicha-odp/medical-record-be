import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const cookieParser = require('cookie-parser');

import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { smartcontractAbi } from './utils/blockchain-config';
import router from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const address = process.env.ADRESS_OR_NODE_ACCOUNT;
const contractAddress = process.env.ADDRESS_CONTRACT;
const contractABI = smartcontractAbi;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use(cookieParser());

export const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://34.128.75.179/bc'));

export const contract = new web3.eth.Contract(
  contractABI as AbiItem[],
  contractAddress
);

app.get('/', (req: Request, res: Response) => {
  res.send('Medical Record App');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

  // web3.eth.net
  //   .isListening()
  //   .then(() =>
  //     console.log(
  //       '⚡️[server]: Blockchain is connected at host: http://34.128.75.179/bc'
  //     )
  //   )
  //   .catch((e) => console.log('⚡️[server]: Wow. Something went wrong: ' + e));

  // console.log(contract);

  // contract.methods
  //   .getPatInfo('3403012604000001')
  //   .call()
  //   .then((res: any) => console.log(res));
});
