#!/bin/bash
# to run: sh bin/payout.sh

# run test
npx playwright test tests/apiPayOut/apiPayOut.spec.ts --config=playwright.config.ts --project=chromium
