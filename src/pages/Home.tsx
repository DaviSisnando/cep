import React, { useState } from "react";
import CepInput from "../components/CepInput";
import AddressList from "../components/AddressList";
import { useCep } from "../hooks/useCep";
import { saveAddress } from "../utils/storage";

const Home: React.FC = () => {
  const { cep, setCep, address, fetchCep, loading, error } = useCep();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleSaveAddress = () => {
    if (!address) return;
    saveAddress(address);
    setUpdateTrigger((prev) => !prev);
  };

  return (
    <div className="flex items-center flex justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Consulta de CEP</h1>
        <CepInput cep={cep} setCep={setCep} fetchCep={() => fetchCep(cep)} />

        {loading && <p className="text-blue-500 mt-2">Carregando...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {address && (
          <div className="border p-4 rounded mt-4 w-full bg-white shadow-md">
            <p><strong>Logradouro:</strong> {address.logradouro}</p>
            <p><strong>Bairro:</strong> {address.bairro}</p>
            <p><strong>Cidade:</strong> {address.localidade} - {address.uf}</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-700 w-full"
              onClick={handleSaveAddress}
            >
              Salvar Endereço
            </button>
          </div>
        )}
        <AddressList updateTrigger={updateTrigger} />
      </div>
    </div>
  );
};

export default Home;
