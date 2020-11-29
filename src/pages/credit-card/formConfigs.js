export const accountNumberVerificationResponse = [
  {
    type: "text",
    name: "account-name",
    label: "Account Name",
    defaultValue: "Adebisi Oluwabukunmi",
  },
  {
    type: "number",
    name: "mobile-no",
    label: "Mobile No",
    defaultValue: "2348160601644",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    defaultValue: "bukunmiadebisi@gmail.com",
  },
  {
    type: "text",
    name: "sex",
    label: "Sex",
    defaultValue: "Male",
  },
  {
    type: "date",
    name: "date-of-birth",
    label: "Date of Birth",
    defaultValue: "1995-05-27",
  },
  {
    type: "number",
    name: "bvn",
    label: "BVN",
    defaultValue: "12040232302",
  },
  {
    type: "text",
    name: "residential-address",
    label: "Residential Address",
    defaultValue: "56 balogun street shomolu lagos",
    size: 12,
  },
];

export const prepaidAccountNumberVerificationResponse = [
  {
    type: "text",
    name: "FirstName",
    label: "First Name",
    defaultValue: "Oluwabukunmi",
    size: 2,
    placeholder: "Enter your first name",
  },
  {
    type: "text",
    name: "LastName",
    label: "Last Name",
    defaultValue: "Adebisi",
    size: 2,
    placeholder: "Enter your last name",
  },
  {
    type: "text",
    name: "MiddleName",
    label: "Middle Name",
    defaultValue: "Joseph",
    size: 2,
    placeholder: "Enter your middle name",
  },
  {
    type: "number",
    name: "MobileNumber",
    label: "Mobile Number",
    defaultValue: "2348160601644",
    size: 2,
    placeholder: "xxx xxxxx xxxxx",
  },
  {
    type: "email",
    name: "Email",
    label: "Email",
    defaultValue: "bukunmiadebisi@gmail.com",
    size: 2,
    placeholder: "customer@wemabank.com",
  },
  {
    type: "text",
    name: "Nationality",
    label: "Nationality",
    defaultValue: "Nigerian",
    size: 2,
    placeholder: "Enter your Nationality",
  },
  {
    type: "text",
    name: "Country",
    label: "Country",
    defaultValue: "Nigeria",
    size: 2,
    placeholder: "Nigeria",
  },
  {
    type: "text",
    name: "State",
    label: "State",
    defaultValue: "Lagos",
    size: 2,
    placeholder: "Enter your state",
  },
  {
    type: "text",
    name: "City",
    label: "City",
    defaultValue: "Lagos",
    size: 2,
    placeholder: "Enter your city",
  },
  {
    type: "text",
    name: "StreetName",
    label: "Street Name",
    defaultValue: "Balogun",
    size: 2,
    placeholder: "e.g First Opp",
  },
  {
    type: "number",
    name: "HouseNumber",
    label: "House Number",
    defaultValue: "56",
    size: 2,
    placeholder: "Enter your House Number",
  },
  {
    type: "text",
    name: "Gender",
    label: "Gender",
    defaultValue: "Male",
    size: 2,
    placeholder: "Enter your gender",
  },
  {
    type: "date",
    name: "DOB",
    label: "Date of Birth",
    defaultValue: "1995-05-27",
    size: 2,
    placeholder: "Enter your date of birth",
  },
  {
    type: "text",
    name: "Occupation",
    label: "Occupation",
    defaultValue: "Software developer",
    size: 2,
    placeholder: "e.g Accountant",
  },
  {
    type: "text",
    name: "MaritalStatus",
    label: "Marital Status",
    defaultValue: "Single",
    size: 2,
    placeholder: "e.g single",
  },
  {
    type: "number",
    name: "BVN",
    label: "BVN",
    defaultValue: 23020202020,
    size: 2,
    placeholder: "Enter your BVN",
  },
];

const salaryBank = [
  { value: "gtb", text: "GTB" },
  { value: "uba", text: "UBA" },
];

export const accountDetails = [
  {
    type: "email",
    name: "work-email-address",
    label: "Work Email Address",
    size: 4,
  },
  {
    type: "file",
    name: "work-id",
    label: "Work ID",
    size: 4,
  },
  {
    type: "number",
    name: "salaryAccount",
    label: "Salary Account",
  },
  {
    type: "dropdown",
    name: "salary-bank",
    label: "Select Salary Bank",
    defaultOption: "WEMA",
    options: salaryBank,
  },
  {
    type: "text",
    name: "id-card-type",
    label: "Valid ID Card Type",
  },
  {
    type: "number",
    name: "id-number",
    label: "ID Number",
  },
  {
    type: "date",
    name: "issuance-date",
    label: "Issuance Date",
  },
  {
    type: "date",
    name: "expiry-date",
    label: "Expiry Date",
  },
];

const employmentType = [
  { value: "Self Employed", text: "Self Employed" },
  { value: "Salary Based Individual", text: "Salary Based Individual" },
];

export const customerType = {
  retail: [
    {
      type: "dropdown",
      defaultOption: "Self Employed",
      name: "employment-type",
      label: "Select employment type",
      options: employmentType,
    },
    {
      type: "text",
      name: "company-name",
      label: "Company Name/Employer",
    },
    {
      type: "number",
      name: "salary",
      label: "Monthly Income",
    },
    {
      type: "file",
      name: "bank-statement",
      label: "Six(6) months Bank Statement",
      multiple: true,
    },
    // {
    //   type: "email",
    //   name: "work-email",
    //   label: "Work Email",
    // },
    // {
    //   type: "file",
    //   name: "work-id",
    //   label: "Work ID",
    // },
  ],
  corporate: [
    {
      type: "number",
      name: "rc-number",
      label: "RC Number",
    },
    {
      type: "file",
      name: "certification-of-registration",
      label: "Certificate of Registration",
    },
    {
      type: "email",
      name: "email",
      label: "Email Address",
    },
    {
      type: "number",
      name: "monthly-incom",
      label: "Monthly Income",
    },
    {
      type: "file",
      name: "bank-statement",
      label: "Six(6) months Bank Statement",
      multiple: true,
    },
  ],
  staff: [
    {
      type: "",
      name: "staff-id",
      label: "Staff ID",
    },
  ],
};

const deliveryBranchOptions = [
  { value: "Osun", text: "Osun" },
  { value: "Oyo", text: "Oyo" },
  { value: "Abuja", text: "Abuja" },
];

const creditCardRequestType = [
  { value: "renewal", text: "renewal" },
  { value: "limit-increase", text: "Limit Increase" },
];

export const additionalInformation = [
  {
    type: "text",
    name: "preferred-name-on-card",
    label: "Preferred Name on Card",
  },
  {
    type: "number",
    name: "alternative-acc-number",
    label: "Alternative Account Number",
  },
  // {
  //   type: "file",
  //   name: "valid-nigerian-id",
  //   label: "Valid Nigerian ID",
  // },
  {
    type: "number",
    name: "facility-amount",
    label: "Facility Amount",
  },
  {
    type: "number",
    name: "tenor",
    label: "Tenor (months)",
  },
  {
    type: "dropdown",
    defaultOption: "Lagos",
    name: "delivery-branch",
    label: "Select a Delivery Branch",
    options: deliveryBranchOptions,
  },
  {
    type: "dropdown",
    defaultOption: "new",
    label: "Select Credit Card Request Type",
    name: "credit-card-request-type",
    options: creditCardRequestType,
  },
];
