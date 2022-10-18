export const LOGIN = "#email";
export const PASSWORD = "input[name='password']";
export const LOGIN_BUTTON = "button[type='submit']";
export const STATUS_OK = "ok";
export const TEST = "test";
export const STATUS_ERROR = "error";
export const DATE_RANGE = ".daterange-block";
export const INPUT_FORM = ".form-control";
export const SEARCH_BUTTON = ".action-btn";
export const SEARCH_FIELD = ".form-control-sm";
export const FILTER_STATUS = "select[data-name='status']";
export const FILTER_MERCHANT = "select[data-name='merchant']";
export const TRANSACTION_ID =
  "td[data-pytest='transactionsLogTbodyThExternalIdRow0']";
export const INVALID_VALUE = "qwerty@#$%&*()";
export const InvalidDateFormat = "01-01-2022 08:00:00";
export const SECRET = {
  x1CARD: "3b11ea0c639e69b65b0fb5e8",
};
export const TRANSACTION_LOG_STATUS =
  "td[data-pytest='transactionsLogTbodyThStatusRow0']";
export const TRANSACTION_LOG_COMMENT =
  "td[data-pytest='transactionsLogTbodyThDescriptionRow0']";
export const VIEW_CONFIGURATION_BUTTON = ".show-hide-columns";
export const SHOW_REJECTED_CHECKBOX = "input[name='show_pay_out_rejected']";
export const SHOW_IN_WORK_CHECKBOX = "input[name='show_pay_out_in_work']";
export const CONFIGURATION_SUBMIT_BUTTON =
  "button[data-pytest='showHideColumnModalControlSubmit']";

export enum DateRange {
  From,
  To,
}

export enum Merchant {
  All,
  x1Cards,
  SpayzIoP2p,
  SpayzIoOct,
  Next,
  TestMerchant,
  PinUp,
  MostBet,
  Rox,
}

export enum StatusPayOutFilter {
  All,
  Zero,
  Success,
  Fail,
  SsApi,
  Waiting,
  SsManual,
  PartialyFail,
  PayError,
  Rejected,
}

export enum StatusPayOut {
  All = "All",
  Zero = "Zero",
  Success = "Success",
  Fail = "Fail",
  SsApi = "Ss api",
  Waiting = "Waiting",
  SsManual = "Ss manual",
  PartialyFail = "Partialy fail",
  PayError = "Pay error",
  Rejected = "Rejected",
}

export enum StatusApiResponse {
  Zero = "zero",
  Success = "success",
  Fail = "fail",
  Pending = "pending",
}

export enum StatusForTests {
  Zero,
  Success,
  Fail,
}

export enum Currency {
  Rub = "RUB",
  Usd = "USD",
  Krw = "KRW",
  Inr = "INR",
  Bdt = "BDT",
  Byn = "BYN",
}

export enum CardNumber {
  SberBank = "5228600519395653",
  TinkofBank = "5536913837767793",
}

export const ErrorMessages = {
  NegativeAmount: "Amount should be greater than 0.",
  InvalidAmount: "Amount should be a valid number.",
  InvalidCardNumber: "Card number format is invalid",
  InvalidDateFormat: "Date does not match the format Y-m-d H:i:s.",
  WithoutBankKrw: "Bank is required.",
  WithoutHolderKrw: "Holder is required.",
  InvalidCallBackUrl: "The string must be a valid url",
  WithoutCardNumber: "Card number is not provided.",
  WithoutAmount: "Amount is not provided.",
};
