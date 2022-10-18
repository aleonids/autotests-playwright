import { expect } from "@playwright/test";
import { PAY_OUT_POST_URL } from "../../helpers/constants";
import { getRandomBetween, getRandomName } from "../../helpers/helpers";
import { md5Function } from "../../helpers/md5";
import {
  CardNumber,
  Currency,
  ErrorMessages,
  InvalidDateFormat,
  INVALID_VALUE,
  STATUS_ERROR,
  TEST,
} from "./constants";

export let transactionIdArray: string[] = [];

// Create Pay out operations in rejected status
export async function rejectedPayOutApiRequest(
  merchantSecret: string,
  callBackUrl: string,
  request
) {
  const randomAmount = getRandomBetween(1000, 10000);
  let transactionId;
  let tokenMerchant;
  const allRequests = [
    // Negative amount
    {
      requestData: {
        amount: -randomAmount,
        card_number: CardNumber.SberBank,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Rub,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.NegativeAmount,
      },
    },
    // Invalid amount
    {
      requestData: {
        amount: INVALID_VALUE,
        card_number: CardNumber.SberBank,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Rub,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.InvalidAmount,
      },
    },
    // Invalid card number
    {
      requestData: {
        amount: randomAmount,
        card_number: INVALID_VALUE,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Rub,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.InvalidCardNumber,
      },
    },
    // Invalid date format
    {
      requestData: {
        amount: randomAmount,
        card_number: CardNumber.SberBank,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Rub,
        date: InvalidDateFormat,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.InvalidDateFormat,
      },
    },
    // Without bank (KRW)
    {
      requestData: {
        amount: randomAmount,
        card_number: CardNumber.SberBank,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Krw,
        holder: TEST,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.WithoutBankKrw,
      },
    },
    // Without holder (KRW)
    {
      requestData: {
        amount: randomAmount,
        card_number: CardNumber.SberBank,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Krw,
        bank: TEST,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.WithoutHolderKrw,
      },
    },
    // Invalid Callback URL
    {
      requestData: {
        amount: randomAmount,
        card_number: CardNumber.SberBank,
        id: transactionId,
        callback_url: INVALID_VALUE,
        currency: Currency.Rub,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.InvalidCallBackUrl,
      },
    },
    // Without Card number
    {
      requestData: {
        amount: randomAmount,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Rub,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.WithoutCardNumber,
      },
    },
    // Without amount
    {
      requestData: {
        card_number: CardNumber.SberBank,
        id: transactionId,
        callback_url: callBackUrl,
        currency: Currency.Rub,
        token: tokenMerchant,
      },
      message: {
        errorMessage: ErrorMessages.WithoutAmount,
      },
    },
  ];
  const requestCount = await allRequests.length;

  // Send requests
  for (let i = 0; i < requestCount; i++) {
    transactionId = `test-${getRandomName()}`;
    tokenMerchant = await md5Function(transactionId, merchantSecret);

    allRequests[i].requestData.id = transactionId;
    allRequests[i].requestData.token = tokenMerchant;
    const response = await request.post(PAY_OUT_POST_URL, {
      data: allRequests[i].requestData,
    });
    const responseBody = JSON.parse(await response.text());

    console.log(responseBody);
    expect(response.status()).toBe(400);
    expect(responseBody.status).toBe(STATUS_ERROR);
    expect(responseBody.message).toBe(allRequests[i].message.errorMessage);
    transactionIdArray[i] = transactionId;
  }
  return transactionIdArray;
}
