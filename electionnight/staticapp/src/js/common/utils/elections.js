
export const sortByParty = (a, b) =>
  a.primary_party < b.primary_party;

export const getHouseDistrict = (name) => {
  const matches = /(\d+)$/g.exec(name);
  return parseInt(matches[0]);
};

export const sortByDistrict = (a, b) =>
  getHouseDistrict(a.label) - getHouseDistrict(b.label);
