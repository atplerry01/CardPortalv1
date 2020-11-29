export const formatField = (f, string) => {
  if (f.isNumber === true) {
    string = formatNumber(string);
  } else if (f.isDate === true) {
    string = formatDate(string);
  } else if (f.isCurrency === true) {
    string = formatCurrency(string);
  }
  return string;
};

const formatNumber = string => {
  return Number(string);
};

const formatDate = string => {
  return new Date(string).toDateString();
};

const formatCurrency = string => {
  //return  String.fromCharCode("0x20A6")+formatNumber(string);
  return formatNumber(string);
};

export const formatter = (dataHeader, dataBody) => {
  const headerTitle = dataHeader.map(obj => obj.title);
  const headerName = dataHeader.map(obj => obj.name);

  let tableItems = [];
  if (dataBody && Array.isArray(dataBody)) {
    tableItems = dataBody.map((item, index) => {
      let keys = Object.keys(item);

      keys.forEach(key => {
        let f = dataHeader.find(headerObj => {
          return headerObj.name === key;
        });

        if (f !== undefined) {
          item[key] = formatField(f, item[key]);
        }
      });
      return item;
    });
  }

  return {
    headerTitle,
    headerName,
    dataBody: tableItems
  };
};
