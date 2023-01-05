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

const contractAddress = '0xddfed606bde1a4e1f68790a8d07f312bb3ffbbdb';
const addressAccount = '0xe54cf29b1fe252fcac158af61a69308e00235902';
const contractABI = smartcontractAbi;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use(cookieParser());

export const web3 = new Web3(
  new Web3.providers.HttpProvider('http://34.128.75.179/bc')
);
// web3.setProvider(new Web3.providers.HttpProvider('http://34.128.75.179/bc'));

export const contract = new web3.eth.Contract(
  contractABI as AbiItem[],
  contractAddress
);

app.get('/', (req: Request, res: Response) => {
  res.send('Medical Record App');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

  web3.eth.net
    .isListening()
    .then(() =>
      console.log(
        '⚡️[server]: Blockchain is connected at host: http://34.128.75.179/bc'
      )
    )
    .catch((e) => console.log('⚡️[server]: Wow. Something went wrong: ' + e));

  web3.eth.getAccounts().then((res: any) => {
    web3.eth.defaultAccount = res[0];
  });

  contract.methods
    .addPatient(
      '12345678',
      'Cek cek',
      'Cek cek cek',
      'Cek cek cek cek',
      'Cek cek cek cek cek'
    )
    .send({
      from: addressAccount,
      gas: 4712388,
      gasPrice: 100000000000,
    })
    .then((res: any) => console.log('⚡️[Setter]:  ', res));

  contract.methods
    .getPatInfo('12345678')
    .call({ from: addressAccount, gas: 4712388, gasPrice: 100000000000 })
    .then((res: any) => console.log('⚡️[Getter]:  ', res))
    .catch((e: any) =>
      console.log('⚡️[Getter]: Wow. Something went wrong: ' + e)
    );
});
