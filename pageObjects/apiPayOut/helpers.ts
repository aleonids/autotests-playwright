import { expect, Page } from "@playwright/test";
import {
  BASE_URL,
  getApiPayOutUrl,
  TEST_SERVER_CREDENTIALS,
} from "../../helpers/constants";
import { md5Function } from "../../helpers/md5";
import {
  CONFIGURATION_SUBMIT_BUTTON,
  DateRange,
  DATE_RANGE,
  FILTER_MERCHANT,
  FILTER_STATUS,
  INPUT_FORM,
  LOGIN,
  LOGIN_BUTTON,
  Merchant,
  PASSWORD,
  SEARCH_BUTTON,
  SHOW_IN_WORK_CHECKBOX,
  SHOW_REJECTED_CHECKBOX,
  StatusPayOutFilter,
  STATUS_OK,
  TRANSACTION_ID,
  VIEW_CONFIGURATION_BUTTON,
} from "./constants";
import { TypeGetPayOut } from "./types";

// Login to the website
export async function authorization(page: Page) {
  await page.goto(BASE_URL);
  await page.locator(LOGIN).fill(TEST_SERVER_CREDENTIALS.username);
  await page.locator(PASSWORD).fill(TEST_SERVER_CREDENTIALS.password);
  await page.locator(LOGIN_BUTTON).click();
}

// Show all operations
export async function clearDateFrom(page: Page) {
  await page.waitForSelector(DATE_RANGE);
  const dateFrom = page
    .locator(DATE_RANGE)
    .locator(INPUT_FORM)
    .nth(DateRange.From);
  await dateFrom.fill("");
  await page.locator(SEARCH_BUTTON).click();
}

export let transactionId: string[] = [];

// Get Transaction id from Transaction Log
export async function getTransactionId(page: Page) {
  await authorization(page);
  await clearDateFrom(page);

  // const date = new Date();
  // date.setMonth(date.getMonth() - 1);
  // const lastMonth =
  //   ("0" + date.getDate()).slice(-2) +
  //   "." +
  //   ("0" + (date.getMonth() + 1)).slice(-2) +
  //   "." +
  //   date.getFullYear();

  await page.locator(FILTER_MERCHANT).click();
  await page.selectOption(FILTER_MERCHANT, String(Merchant.x1Cards));
  const status = [
    StatusPayOutFilter.All,
    StatusPayOutFilter.Zero,
    StatusPayOutFilter.Success,
    StatusPayOutFilter.Fail,
  ];

  // Get transaction Id in Zero, Success, Fail statuses
  for (let i = 1; i < status.length; i++) {
    await page.locator(FILTER_STATUS).click();
    await page.selectOption(FILTER_STATUS, String(status[i]));
    await page.waitForTimeout(2000);
    transactionId[i] = await page.locator(TRANSACTION_ID).innerText();
  }
  return transactionId.shift();
}

// Receive get response and check data
export async function getStatusApi({
  id,
  merchantSecret,
  status,
  request,
}: TypeGetPayOut): Promise<void> {
  const token = await md5Function(id, merchantSecret);
  const response = await request.get(await getApiPayOutUrl(id, token));
  const responseBody = JSON.parse(await response.text());

  console.log(responseBody);
  expect(response.status()).toBe(200);
  expect(responseBody.status).toBe(STATUS_OK);
  expect(responseBody.data[0].status).toBe(status);
  expect(responseBody.data[0].id).toBe(id);
  expect(responseBody.data[0].comment).toBe("");
}

// Check rejected checkbox
export async function checkRejectedCheckbox(page: Page) {
  await authorization(page);
  await page.locator(VIEW_CONFIGURATION_BUTTON).click();
  if (
    (await page.isChecked(SHOW_REJECTED_CHECKBOX)) === false &&
    (await page.isChecked(SHOW_IN_WORK_CHECKBOX)) === true
  ) {
    await page.check(SHOW_REJECTED_CHECKBOX);
  }
  await page.locator(CONFIGURATION_SUBMIT_BUTTON).click();
}
