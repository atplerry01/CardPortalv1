export function lookupUserDropDown(lookups) {
  if (lookups) {
    return lookups.map(lookup => {
      return {
        value: lookup.user.cardId,
        text: lookup.user.firstName + ' ' + lookup.user.lastName + ' - ' + lookup.user.cardId
      };
    });
  }
}
