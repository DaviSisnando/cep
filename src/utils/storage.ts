import { Address } from "../interface/Address";

export const getCachedCep = (cep: string): Address | null => {
  const cache = localStorage.getItem("cepCache");
  if (cache) {
    const parsedCache: Record<string, Address> = JSON.parse(cache);
    return parsedCache[cep] || null;
  }
  return null;
};

export const saveCepToCache = (cep: string, data: Address): void => {
  const cache = localStorage.getItem("cepCache");
  const parsedCache: Record<string, Address> = cache ? JSON.parse(cache) : {};
  parsedCache[cep] = data;
  localStorage.setItem("cepCache", JSON.stringify(parsedCache));
};

export const getSavedAddresses = (): Address[] => {
  return JSON.parse(localStorage.getItem("savedAddresses") || "[]");
};

export const saveAddress = (address: Address): void => {
  const addresses = getSavedAddresses();
  addresses.push(address);
  localStorage.setItem("savedAddresses", JSON.stringify(addresses));
};
