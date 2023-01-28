import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { smartcontractAbi } from './utils/blockchain-config';
import router from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

export const contractAddress = '0xdb10253ad5253017878ec71add2f0d045a451afb';
export const addressAccount = '0xf6be359e980e540c7f3cb67a8bd2085419d65429';
const contractABI = smartcontractAbi;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use(cookieParser());

export const web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:8545')
);

export const contract = new web3.eth.Contract(
  contractABI as AbiItem[],
  contractAddress
);

app.get('/', (req: Request, res: Response) => {
  res.send('Medical Record App');
});

app.post('/bc/getPatient', async (req: Request, res: Response) => {
  const { govId } = req.body;

  const data = await contract.methods
    .getPatInfo(govId)
    .call({ from: contractAddress });

  res.send(data);
});

app.post('/bc/addPatient', async (req: Request, res: Response) => {
  const { govId, name, patientAddress, mothersName, fathersName } = req.body;

  const data = await contract.methods
    .addPatient(govId, name, patientAddress, mothersName, fathersName)
    .send({
      from: addressAccount,
      gas: 4712388,
      gasPrice: 100000000000,
    });

  res.send(data);
});

app.post('/bc/getDoctor', async (req: Request, res: Response) => {
  const { govId } = req.body;

  const data = await contract.methods
    .getDrInfo(govId)
    .call({ from: contractAddress });

  res.send(data);
});

app.post('/bc/addDoctor', async (req: Request, res: Response) => {
  const { govId, name, specialist } = req.body;

  const data = await contract.methods.addDoctor(govId, name, specialist).send({
    from: addressAccount,
    gas: 4712388,
    gasPrice: 100000000000,
  });

  res.send(data);
});

app.post('/bc/getMedicalRecord', async (req: Request, res: Response) => {
  const { govId } = req.body;

  const data = await contract.methods
    .getRecord(govId)
    .call({ from: contractAddress });

  res.send(JSON.parse(JSON.stringify(`{"data": ${data}}`)));
});

app.post('/bc/addMedicalRecord', async (req: Request, res: Response) => {
  const { govId, medicalRecord } = req.body;

  const data = await contract.methods.addRecord(govId, medicalRecord).send({
    from: addressAccount,
    gas: 4712388,
    gasPrice: 100000000000,
  });

  res.send(data);
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
});
