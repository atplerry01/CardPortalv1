export function lookupBranchDropDown(lookups) {

  if (lookups && lookups.length > 0) {
    return lookups.map(lookup => {
      return {
        value: lookup.soldId,
        text: lookup.name
      };
    });
  }
}
