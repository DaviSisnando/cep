import { useState } from "react";
import { getCachedCep, saveCepToCache } from "../utils/storage";
import { Address } from "../interface/Address";

export function useCep() {
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCep = async (cep: string) => {
    setError("");
    const sanitizedCep = cep.replace(/\D/g, "");
    if (sanitizedCep.length !== 8) {
      setError("CEP inválido");
      return;
    }

    const cachedData = getCachedCep(sanitizedCep);
    if (cachedData) {
      setAddress(cachedData);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
      const data: Address & { erro?: boolean } = await response.json();
      if (data.erro) {
        setError("CEP não encontrado");
      } else {
        setAddress(data);
        saveCepToCache(sanitizedCep, data);
      }
    } catch {
      setError("Erro ao buscar CEP");
    } finally {
      setLoading(false);
    }
  };

  return { cep, setCep, address, fetchCep, loading, error };
}