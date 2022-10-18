enum BranchName {
  dev = "dev",
  dev1 = "dev1",
  release1 = "release1",
  hotfix = "hotfix",
}

const BRANCH_NAME = BranchName.release1;

export const BASE_URL = `https://api-${BRANCH_NAME}.**********/`;
export const PAY_OUT_POST_URL = `https://api-${BRANCH_NAME}.*********/api/transactions`;
export const CALLBACK_URL =
  "https://webhook.site/da3b15dc-baae-4ad5-9495-faa61fa51642";

export async function getApiPayOutUrl(id: string, token: string) {
  const getUrl = `https://api-${BRANCH_NAME}.*********/api/transactions?id=${id}&token=${token}`;
  return getUrl;
}

export const TEST_SERVER_CREDENTIALS = {
  username: "***********",
  password: "*********",
};
