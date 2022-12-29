export interface IssuingTranTypes {
  status: string;
  message: string;
  data: Data;
  code: string;
  date: string;
}
export interface Data {
  response: Response;
}
export interface Response {
  balanceEnquiryAmount: number;
  cashWithdrawalAmount: number;
  quicktellerAirtimeAmount: number;
  quickTellerFundsTransferAmount: number;
  quickTellerBillsPaymentAmount: number;
  pinChangeAmount: number;
  balanceEnquiryCount: number;
  cashWithdrawalCount: number;
  quicktellerAirtimeCount: number;
  quickTellerFundsTransferCount: number;
  quickTellerBillsPaymentCount: number;
  pinChangeCount: number;
}

export interface IssuingTranTypesAdmin {
  status: string;
  message: string;
  data: DataAdmin;
  code: string;
  date: string;
}
export interface DataAdmin {
  payload: Payload[];
}

type Payload = {
  tenantCode: string;
  transactionChannelResponses: TransactionChannelResponses;
};
export interface TransactionChannelResponses {
  balanceEnquiryAmount: number;
  cashWithdrawalAmount: number;
  quicktellerAirtimeAmount: number;
  quickTellerFundsTransferAmount: number;
  quickTellerBillsPaymentAmount: number;
  pinChangeAmount: number;
  balanceEnquiryCount: number;
  cashWithdrawalCount: number;
  quicktellerAirtimeCount: number;
  quickTellerFundsTransferCount: number;
  quickTellerBillsPaymentCount: number;
  pinChangeCount: number;
}

export interface IssuingResponseCodes {
  status: string;
  message: string;
  data: ResponseCodes[];
  code: string;
  date: string;
}

export interface ResponseCodes {
  response: {
    responseCode: string;
    responseMessage: string;
    count: number;
  };
}
