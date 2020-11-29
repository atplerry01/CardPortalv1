export function lookupRoleDropDown(lookups) {
  if (lookups) {
    return lookups.map(lookup => {
      return {
        value: lookup,
        text: lookup
      };
    });
  }
}
