# EventHub Login Functionality — Test Plan

**Application URL:** https://eventhub.rahulshettyacademy.com/login  
**Date:** 2026-04-03  
**Prepared by:** QA Team  
**Version:** 1.0

---

## Overview

This test plan covers the login functionality of the EventHub application. The login page allows registered users to authenticate using their email and password credentials.

### Page Under Test

- **URL:** `/login`
- **Title:** EventHub — Discover & Book Events
- **Key Elements:**
  - Email input field (placeholder: `you@email.com`)
  - Password input field (masked)
  - Sign In button
  - "Don't have an account? Register" link

---

## Test Scenarios

---

### TC-001: Successful Login with Valid Credentials

**Type:** Happy Path  
**Priority:** Critical

**Preconditions:**
- User has a registered account on EventHub
- Browser is open on a fresh, blank state
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Verify the login page loads with heading "Sign in to EventHub"
2. Enter a valid registered email address in the Email field (e.g., `testuser@example.com`)
3. Enter the correct password (minimum 6 characters) in the Password field
4. Click the **Sign In** button

**Expected Result:**
- User is successfully authenticated
- User is redirected away from `/login` to the application dashboard/home page
- No error messages are displayed

---

### TC-002: Login with Empty Email and Empty Password

**Type:** Negative / Validation  
**Priority:** High

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`
- Both fields are empty

**Steps:**
1. Leave the Email field blank
2. Leave the Password field blank
3. Click the **Sign In** button

**Expected Result:**
- Form is not submitted
- Validation message **"Enter a valid email"** appears below the Email field
- Validation message **"Password must be at least 6 characters"** appears below the Password field
- User remains on the login page

---

### TC-005: Login with Invalid Email Format

**Type:** Negative / Validation  
**Priority:** High

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Enter each of the following invalid email formats in the Email field:
   - `invalidemail` (no @ symbol)
   - `user@` (missing domain)
   - `@domain.com` (missing local part)
   - `user@domain` (missing TLD)
2. Enter a valid password (e.g., `password123`) in the Password field
3. Click **Sign In** for each case

**Expected Result:**
- Validation message **"Enter a valid email"** appears for each invalid format
- User remains on the login page

---

### TC-006: Login with Password Shorter Than 6 Characters

**Type:** Negative / Validation  
**Priority:** High

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Enter a valid email address in the Email field
2. Enter a password with fewer than 6 characters (e.g., `12345`) in the Password field
3. Click the **Sign In** button

**Expected Result:**
- Validation message **"Password must be at least 6 characters"** appears below the Password field
- User remains on the login page

---
### TC-008: Login with Valid Email Format but Wrong Credentials

**Type:** Negative / Authentication  
**Priority:** Critical

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Enter a valid but incorrect/unregistered email (e.g., `wrong@email.com`) in the Email field
2. Enter any password of 6 or more characters (e.g., `wrongpassword`) in the Password field
3. Click the **Sign In** button

**Expected Result:**
- Form passes client-side validation and is submitted
- A toast notification appears with the message **"Invalid email or password"**
- A **Dismiss (×)** button is available on the notification
- User remains on the login page; no session is created

---

### TC-009: Dismiss the Invalid Credentials Error Notification

**Type:** Functional  
**Priority:** Medium

**Preconditions:**
- Failed login has been performed and the **"Invalid email or password"** toast is visible

**Steps:**
1. Click the **×** (Dismiss) button on the error notification

**Expected Result:**
- The notification closes and is no longer visible
- The login form remains intact and the user can attempt login again

---

### TC-010: Navigate to Register Page via Link

**Type:** Navigation  
**Priority:** Medium

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Locate the **"Don't have an account?"** text at the bottom of the login form
2. Click the **Register** link

**Expected Result:**
- User is redirected to `/register`
- The registration page loads successfully

---

### TC-011: Login Page UI Elements Verification

**Type:** UI / Functional  
**Priority:** Medium

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Verify the page title is **"EventHub — Discover & Book Events"**
2. Verify heading **"Sign in to EventHub"** is visible
3. Verify subheading **"Enter your credentials to continue"** is visible
4. Verify the **Email** label and input field are visible with placeholder `you@email.com`
5. Verify the **Password** label and input field are visible
6. Verify the **Sign In** button is visible and clickable
7. Verify the **"Don't have an account? Register"** link is visible
8. Verify the **API Documentation (Swagger)** link is present on the page

**Expected Result:**
- All elements are present and correctly labeled

---

### TC-012: Password Field Masking

**Type:** Security / Functional  
**Priority:** High

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Click on the Password field
2. Type any text (e.g., `testpassword`)
3. Observe the characters displayed in the field

**Expected Result:**
- Characters are masked (shown as bullet points)
- The plaintext password is not visible

---

### TC-014: Email Field Case Sensitivity

**Type:** Edge Case  
**Priority:** Medium

**Preconditions:**
- User has a registered account with email `testuser@example.com`
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Enter `TESTUSER@EXAMPLE.COM` in the Email field
2. Enter the correct password in the Password field
3. Click **Sign In**

**Expected Result:**
- Login succeeds (email comparison should be case-insensitive)
  — OR —
- Document actual behavior if the system is case-sensitive

---

### TC-015: Login with Leading/Trailing Whitespace in Email

**Type:** Edge Case  
**Priority:** Medium

**Preconditions:**
- Navigate to `https://eventhub.rahulshettyacademy.com/login`

**Steps:**
1. Enter `  testuser@example.com  ` (with surrounding spaces) in the Email field
2. Enter the correct password in the Password field
3. Click **Sign In**

**Expected Result:**
- Whitespace is trimmed and login succeeds
  — OR —
- A validation error is shown if whitespace is not trimmed

---



## Pass/Fail Criteria

**Pass:** The step produces exactly the expected result described.  
**Fail:** Any deviation — absent validation messages, unexpected navigation, unauthorized access, or script execution.

---
