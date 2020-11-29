export function lookupHotlistCode(lookups) {
    if (lookups && lookups.length > 0) {
      return lookups.map(lookup => {
        return {
          value: lookup.Code + '-' + lookup.Description,
          text: lookup.Description,
        };
      });
    }
  }
  