import React from "react";

interface CepInputProps {
  cep: string;
  setCep: (cep: string) => void;
  fetchCep: () => void;
}

const CepInput: React.FC<CepInputProps> = ({ cep, setCep, fetchCep }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        onBlur={fetchCep}
        placeholder="Digite o CEP"
        className="border p-2 rounded w-64 text-center"
      />
      <button
        onClick={fetchCep}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Consultar CEP
      </button>
    </div>
  );
};

export default CepInput;