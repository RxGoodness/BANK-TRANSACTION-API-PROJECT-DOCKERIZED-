/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import fs from 'fs';
// import {transactionInterface, balanceInterface} from './interface'
//import { v4 as uuidv4 } from 'uuid';

import fs from 'fs';
import { Request, Response } from 'express';
// import path from 'path'
// import { balance } from './validation';
import {v4 as uuidv4} from 'uuid'

uuidv4();

console.log('CONTROLLER.TS, YESSSSSSSSSSSSS')

export interface transactionInterface {
  references : string,
  senderAccountNumber: number,
  amount: number,
  receiverAccountNumber: number,
  transferDescription: string,
  createdAt:string
}

export interface balancesInterface {
  accountNo: number,
  balance: number,
  createdAt:string
}

const balanceDatabaseExist = fs.existsSync("./balanceDatabase.json");

if(balanceDatabaseExist === false) {
  fs.writeFileSync("./balanceDatabase.json", '[]')
}

const balanceDatabase = JSON.parse(fs.readFileSync("./balanceDatabase.json", "utf8"));

// const accountNumber = Math.floor(Math.random() * 10000000000);
// console.log(accountNumber)
const transactionDatabaseExist = fs.existsSync("./transactionDatabase.json")
if(transactionDatabaseExist === false) {
  fs.writeFileSync("./transactionDatabase.json", '[]')
}


export const createAccount = (req: Request, res: Response) => {
  // const {id} = req.params;
  const accountNumber = Math.floor(Math.random() * 10000000000);
  console.log('CONTROLLER.TS, YESSSSSSSSSSSSS CREATE')

  const body = req.body;
  //const id = uuidv4()
  console.log("body", req.body)
  const userWithAcc = { accountNo: accountNumber, balance: body.balance, createdAt:new Date().toISOString()};
  fs.readFile('./balanceDatabase.json', 'utf8', function(err, data){
    const readData = JSON.parse(data);
    readData.push(userWithAcc);
    fs.writeFile('./balanceDatabase.json', JSON.stringify(readData, null, 2), "utf8", err => console.log(err));
  });

  res.send(userWithAcc);
}


export const getUserAccount = (req: Request, res: Response) => {
  const accountNum  = parseInt(req.params.account);
//console.log(accountNum)
  //const data={}
  const data = balanceDatabase.find((item: balancesInterface) => {item.accountNo === accountNum});
  if(data) {
    res.send(data);
  } else {
    res.send('This account does not exist in the database');
  }
}

  // if(!data) res.status(404).send("Account not found")
  // res.send(data)

//   if (data){
//   return res.status(200).json({
//     message: "success",
//     data
//   })
// }
// else res.send('Account does not exist')




export const getAllAccounts = (req: Request, res: Response) => {
  //const {id} = req.params;
  if(balanceDatabaseExist == true) {
    fs.readFile('./balanceDatabase.json', 'utf8', (err, content) => {
      res.send(content);
    });
  } else {
    res.send('Database is empty');
  }
}


export const transfer =  (req: Request, res: Response) => {
  const body =  req.body;

  const senderAcc = body.from;
  const receiverAcc = body.to;
  const amountRecieved = body.amount;
  const description = body.transferDescription;



  const find1 = balanceDatabase.findIndex((item: { accountNo: number; }) => item.accountNo === senderAcc);
  const find2 = balanceDatabase.findIndex((item: { accountNo: number; }) => item.accountNo === receiverAcc);

  if (amountRecieved < balanceDatabase[find1].balance){
  console.log(balanceDatabase[find1].balance)
  const transaction1 = {
    ...balanceDatabase[find1],
    balance: balanceDatabase[find1].balance - amountRecieved,
    createdAt: balanceDatabase[find1].createdAt
  }

  balanceDatabase[find1] = transaction1;

  const transaction2 = {
    ...balanceDatabase[find2],
    balance: balanceDatabase[find2].balance + amountRecieved,
    createdAt: balanceDatabase[find2].createdAt
  }

  balanceDatabase[find2] = transaction2;

  fs.writeFile("./balanceDatabase.json", JSON.stringify(balanceDatabase, null, 2), (err) => {
    console.log(err);
  })
  }
  else {
    return res.status(404).send({ message: "Insufficient fund"})
  }
  const transactionData = {
    reference: uuidv4(),
    senderAccount: senderAcc,
    amount: amountRecieved,
    receiverAccount: receiverAcc,
    transferDescription: description,
    createdAt: new Date().toISOString(),
  }

  fs.readFile("./transactionDatabase", 'utf8', function(err, data){
    const readData = JSON.parse(data);
    readData.push(transactionData);
    fs.writeFile("/week-7-node-010-RxGoodness/transactionDatabase.json", JSON.stringify(readData, null, 2), "utf8", err => console.log(err));
  });

  res.send(JSON.stringify(transactionData, null, 2));
}


// module.exports = {
//   createAccount, getUserAccount, getAllAccounts, transfer
// }
