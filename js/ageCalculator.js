// conversion values
const MILLISECONDS_IN_SECOND = 1000
const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR
const HOURS_IN_DAY = 24
const SECONDS_IN_DAY = SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY
const DAYS_IN_WEEK = 7
const DAYS_IN_YEAR = 365 + 1 / 4
const MONTHS_IN_YEAR = 12
const DAYS_IN_MONTH = DAYS_IN_YEAR / MONTHS_IN_YEAR

// functions

// utility
function isLeapYear(year) {
  return (0 == year % 4 && 0 != year % 100) || 0 == year % 400
}

function convertTwoDigit(number) {
  n = number.toString()
  if (n.length === 1) return "0" + n
  else return n
}

const NUMBER_FORMATTER = new Intl.NumberFormat(undefined)
function formatNumber(number) {
  return NUMBER_FORMATTER.format(number)
}

// main functions
function submitAgeCalculatorForm(e) {
  if (e) e.preventDefault()

  // Animation
  ageResultWraper.classList.add("transparent")
  setTimeout(() => {
    ageResultWraper.classList.remove("transparent")
  }, 300)

  setTimeout(() => {
    let age = calculateAge(
      new Date(birthDateInput.value),
      new Date(currentDateInput.value)
    )
    paintAge(age)
  }, 200)
}

function paintAge(age) {
  Object.entries(age).forEach(([key, val]) => {
    document.querySelector(`[data-age-result="${key}"]`).textContent = val
  })
}

function calculateMainAge(birthDate, currentDate) {
  let age = {}
  const dob = {
    y: birthDate.getFullYear(),
    m: birthDate.getMonth() + 1,
    d: birthDate.getDate(),
  }
  const today = {
    y: currentDate.getFullYear(),
    m: currentDate.getMonth() + 1,
    d: currentDate.getDate(),
  }
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (isLeapYear(parseInt(today.y))) months[1] = 29
  else months[1] = 28

  if (dob.d > today.d) {
    today.d = today.d + months[today.m - 2]
    today.m = today.m - 1
  }
  if (dob.m > today.m) {
    today.m = today.m + 12
    today.y = today.y - 1
  }
  age = {
    y: today.y - dob.y,
    m: today.m - dob.m,
    d: today.d - dob.d,
  }

  return {
    main: `${age.y} Years, ${age.m} Months, ${Math.floor(age.d / 7)} Weeks, ${
      age.d % 7
    } Days`,
    years: `${age.y} years`,
    months: `${age.y * 12 + age.m} Months and ${age.d} Days`,
  }
}

function calculateAge(birthDate, currentDate) {
  const seconds = (currentDate - birthDate) / MILLISECONDS_IN_SECOND
  let days = Math.floor(seconds / SECONDS_IN_DAY)
  let mainAge = calculateMainAge(birthDate, currentDate)
  return {
    main: mainAge.main,
    years: mainAge.years,
    months: mainAge.months,
    weeks: `${Math.floor(days / DAYS_IN_WEEK)} and ${days % DAYS_IN_WEEK} Days`,
    days: `${formatNumber(days)} Days`,
    hours: `${formatNumber(Math.floor(seconds / SECONDS_IN_HOUR))} Hours`,
    seconds: `${formatNumber(Math.floor(seconds))} Seconds`,
    minutes: `${formatNumber(Math.floor(seconds / SECONDS_IN_MINUTE))} Minutes`,
  }
}

function setCurrentDate() {
  const d = new Date()
  let todayDate = `${d.getFullYear()}-${convertTwoDigit(
    d.getMonth() + 1
  )}-${convertTwoDigit(d.getDate())}`
  currentDateInput.value = todayDate
}

// selectors
const ageCalculatorForm = document.querySelector("[data-age-calculator-form]")
const ageResultWraper = document.querySelector("[data-age-result-wraper]")
const currentDateInput = document.getElementById("currentDateInput")
const birthDateInput = document.getElementById("birthDateInput")

setCurrentDate()
ageCalculatorForm.addEventListener("submit", submitAgeCalculatorForm)
submitAgeCalculatorForm()
