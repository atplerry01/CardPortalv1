export function lookupCardDropDown(lookups) {
  if (lookups && lookups.length > 0) {
    return lookups.map(lookup => {
      return {
        value: lookup.bin,
        text: lookup.name,
        isWaivable: lookup.isWaiveable,
        fee: lookup.fee
      };
    });
  }
}
