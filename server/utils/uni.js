

export const buildName = (nameObj = {}) => Object.keys(nameObj).length > 0 ? `${nameObj.first} ${nameObj.last} ${nameObj.other ?? ''} ` : 'N/A';
export const formatDate = (date) => date.toUTCString()