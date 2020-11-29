export function accountTypeFormatter(code) {

  if (code === '01') {
    return 'Current Account'
  } else if (code === '02') {
    return 'Saving Account'
  } else if (code === '03') {
    return 'Salary Account'
  } else if (code === '06') {
    return 'Domiciliary Account'
  }
}
