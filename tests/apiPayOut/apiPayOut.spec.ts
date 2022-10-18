import { test } from "@playwright/test";
import { CALLBACK_URL } from "../../helpers/constants";
import {
  ErrorMessages,
  SECRET,
  StatusApiResponse,
  StatusForTests,
} from "../../pageObjects/apiPayOut/constants";
import { rejectedPayOutApiRequest } from "../../pageObjects/apiPayOut/createRejectedPayOut";
import { checkRejectedComment } from "../../pageObjects/apiPayOut/testRejectedComment";
import {
  checkRejectedCheckbox,
  getStatusApi,
  getTransactionId,
  transactionId,
} from "../../pageObjects/apiPayOut/helpers";

test.describe("Pay Out API Testing", () => {
  test("Get Transaction id in Zero, Success and Fail statuses", async ({
    page,
  }) => {
    await getTransactionId(page);
  });

  test("Get Pay Out operation in pending status", async ({ request }) => {
    await getStatusApi({
      id: transactionId[StatusForTests.Zero],
      merchantSecret: SECRET.x1CARD,
      status: StatusApiResponse.Pending,
      request,
    });
  });

  test("Get Pay Out operation in success status", async ({ request }) => {
    await getStatusApi({
      id: transactionId[StatusForTests.Success],
      merchantSecret: SECRET.x1CARD,
      status: StatusApiResponse.Success,
      request,
    });
  });

  test("Get Pay Out operation in fail status", async ({ request }) => {
    await getStatusApi({
      id: transactionId[StatusForTests.Fail],
      merchantSecret: SECRET.x1CARD,
      status: StatusApiResponse.Fail,
      request,
    });
  });

  test("Create Pay out rejected operations", async ({ page, request }) => {
    await rejectedPayOutApiRequest(SECRET.x1CARD, CALLBACK_URL, request);
  });
  test("Сheck that the checkbox for displaying rejected operations is installed", async ({
    page,
  }) => {
    await checkRejectedCheckbox(page);
  });
  test("Check message Amount should be greater than 0.", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.NegativeAmount, 0);
  });
  test("Check message Amount should be a valid number.", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.InvalidAmount, 1);
  });
  test("Check message Card number format is invalid", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.InvalidCardNumber, 2);
  });
  test("Check message Date does not match the format Y-m-d H:i:s.", async ({
    page,
  }) => {
    await checkRejectedComment(page, ErrorMessages.InvalidDateFormat, 3);
  });
  test("Check message Bank is required.", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.WithoutBankKrw, 4);
  });
  test("Check message Holder is required.", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.WithoutHolderKrw, 5);
  });
  test("Check message The string must be a valid url", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.InvalidCallBackUrl, 6);
  });
  test("Check message Card number is not provided.", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.WithoutCardNumber, 7);
  });
  test("Check message Amount is not provided.", async ({ page }) => {
    await checkRejectedComment(page, ErrorMessages.WithoutAmount, 8);
  });
});
