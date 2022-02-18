import _ from 'lodash';

export const isArray = (data) => Array.isArray(data);
export const isObject = (data) => !isArray(data) && _.isObject(data);
export const isNull = (data) => data === null; 
export const isNumber = (data) => _.isNumber(data); 
export const isString = (data) => _.isString(data); 
export const isBoolean = (data) => _.isBoolean(data);
