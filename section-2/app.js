'use strict';
onload = () => {
  getUser();
  const authenticated = getPassword();

  if (!authenticated) {
    document.getElementById('results').innerHTML = `
      <h1 style="color: red;">Opps... We couldn't log you in, Please reload the page!</h1>
    `;
    return;
  }

  const month = getMonth();
  const year = getYear();

  displayHoroScope(getDay(month, year), month);
};

// Get User's Name
const getUser = () => {
  let person = prompt('Please enter your name...').trim();

  while (person === '') {
    person = prompt('Please enter your name...').trim();
  }

  return person;
};

// Get User's Password
const getPassword = () => {
  let password = parseInt(prompt('Please enter your password...').trim(), 10);
  let count = 0;

  while (isNaN(password) || password !== 123) {
    password = parseInt(prompt('Please enter your password...').trim(), 10);
    count++;

    if (count >= 2) {
      alert('you’ve entered wrong password 3 times');
      return false;
    }
  }
  return true;
};

// Get User's birth month
const getMonth = () => {
  let month = parseInt(prompt('Please enter your birth month...').trim(), 10);

  while (isNaN(month) || month < 1 || month > 12) {
    month = parseInt(
      prompt('Please enter a valid month (in numbers)...').trim(),
      10
    );
  }

  return month;
};

// Get User's birth year
const getYear = () => {
  let year = parseInt(prompt('Please enter your birth year...').trim(), 10);
  const currentYear = new Date();

  while (isNaN(year) || year > currentYear.getFullYear()) {
    year = parseInt(prompt('Please enter a valid birth year...').trim(), 10);
  }

  return year;
};

// Validate day is valid for the current year and month
const validateDay = (day, month, year) => {
  const daysInMonth = new Date(year, month, 0).getDate();

  if (day < 0 || day > daysInMonth) {
    return false;
  }

  return true;
};

// Get User's birth day
const getDay = (month, year) => {
  let day = parseInt(prompt('Please enter your birth day...').trim(), 10);

  while (!validateDay(day, month, year)) {
    day = parseInt(prompt('Please enter a valid birth day...').trim(), 10);
  }

  return day;
};

const getHoroScope = (day, month) => {
  // encode day and month to another relative value
  // encodedDate = month * 100 + day
  // encoded dates are from wikipedia,  https://en.wikipedia.org/wiki/Astrological_sign

  const encodedDate = month * 100 + day;

  if (encodedDate < 120) {
    // Jan 20 => 1 * 100 + 20 = 120
    return 'Capricorn';
  } else if (encodedDate < 219) {
    // Feb 19 => 2 * 100 + 19
    return 'Aquarius';
  } else if (encodedDate < 320) {
    // Mar 21 => 3 * 100 + 21
    return 'Pisces';
  } else if (encodedDate < 420) {
    // Apr 20 => 4 * 100 + 20
    return 'Aries';
  } else if (encodedDate < 521) {
    // May 21 => 5 * 100 + 21
    return 'Taurus';
  } else if (encodedDate < 622) {
    // Jun 22 => 6 * 100 + 22
    return 'Gemini';
  } else if (encodedDate < 723) {
    // Jul 23 => 7 * 100 + 23
    return 'Cancer';
  } else if (encodedDate < 823) {
    // Aug 23 => 8 * 100 + 23
    return 'Leo';
  } else if (encodedDate < 923) {
    // Sept 23 => 9 * 100 + 23
    return 'Virgo';
  } else if (encodedDate < 1023) {
    // Oct 23 => 10 * 100 + 23
    return 'Libra';
  } else if (encodedDate < 1123) {
    // Nov 23 => 11 * 100 + 23
    return 'Scorpio';
  } else if (encodedDate < 1222) {
    // Dec 22 => 12 * 100 + 22
    return 'Sagittarius';
  } else {
    return 'Capricorn';
  }
};

const displayHoroScope = (day, month) => {
  alert(`Your Horoscope is ${getHoroScope(day, month)}`);
};
