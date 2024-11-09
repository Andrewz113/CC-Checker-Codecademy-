// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

//ADDED "Not found" Company:
const mystery6 = [8, 1, 1, 0, 0, 1, 6, 7, 3, 6, 7, 8, 1, 0, 4, 4];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, mystery6];


// Validates that cards are valid or invalid:
const validateCred = arr => {
  let sum = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    let num = arr[i];
    if ((arr.length - 1 - i) % 2 === 1) {
      num *= 2;
      if (num > 9) num -= 9;
    }
    sum += num;
  }
  return sum % 10 === 0;
};

//Verify function above works ^ :
console.log(validateCred(valid1));
console.log(validateCred(invalid1));

//Finds the invalid card numbers from batch array:
const findInvalidCards = (cards) => {
  return cards.filter(card => !validateCred(card));
};

//Verify above function works ^ :
console.log(findInvalidCards(batch));

//Identify senders of sent invalid cards:
const idInvalidCardCompanies = (invalidCards) => {
  const companies = {
    3: 'Amex (American Express)',
    4: 'Visa',
    5: 'Mastercard',
    6: 'Discover'
  };

  const invalidCompanies = [];

  invalidCards.forEach(card => {
    const company = companies[card[0]];
    if (company) {
      if (!invalidCompanies.includes(company)) {
        invalidCompanies.push(company);
      }
    } else {
      if (!invalidCompanies.includes('Company not found')) {
        invalidCompanies.push('Company not found');
      }
    }
  });
  return invalidCompanies;
};

//Verify function above ^ :
console.log(idInvalidCardCompanies(batch));

// ==== BELOW ARE TASK 7s EXTRA CHALLENGES ====

//Change a string of nums to array:
const stringToArray = (str) => {
  const charArray = str.split('');
  const numArray = charArray.map(char => parseInt(char, 10));
  return numArray;
};

const cardNumber = '31110000132659';
const cardArray = stringToArray(cardNumber);

//Verify above function ^:
console.log(validateCred(cardArray));

// Convert invalid numbers into valid numbers:
const makeValidCard = (arr) => {
  let sum = 0;
  let checkDigit = arr[arr.length - 1];

  for (let i = arr.legth - 2; i >= 0; i--) {
    let num = arr[i];
    if ((arr.legth - 1 -i) % 2 === 1) {
      num *= 2;
      if (num > 9) num -= 9;
    }
    sum += num;
  }
  sum =+ checkDigit;

  let remainder = sum % 10;
  let adjustment = (10 - remainder) % 10;

  arr[arr.length - 1] = (checkDigit + adjustment) % 10;
  
  return arr;
};

//Verify above function ^:
const validCard = makeValidCard(invalid1.slice());
console.log(validateCred(validCard));
