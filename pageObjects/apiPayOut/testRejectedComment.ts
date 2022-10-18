import { expect, Page } from "@playwright/test";
import {
  SEARCH_BUTTON,
  SEARCH_FIELD,
  StatusPayOut,
  TRANSACTION_LOG_COMMENT,
  TRANSACTION_LOG_STATUS,
} from "./constants";
import { authorization, clearDateFrom } from "./helpers";
import { transactionIdArray } from "./createRejectedPayOut";

// Create Pay out operations in rejected status
export async function checkRejectedComment(
  page: Page,
  errorMessage: string,
  id: number
) {
  await authorization(page);
  await clearDateFrom(page);

  // Check the display of rejected operations
  await page.locator(SEARCH_FIELD).fill(transactionIdArray[id]);
  await page.locator(SEARCH_BUTTON).click();
  await page.waitForTimeout(2000);
  const statusLog = await page.locator(TRANSACTION_LOG_STATUS).innerText();
  const comment = await page.locator(TRANSACTION_LOG_COMMENT).innerText();

  await expect(statusLog).toBe(StatusPayOut.Rejected);
  await expect(comment).toBe(errorMessage);
}
