import React, { useEffect, useState } from "react";
import { getSavedAddresses } from "../utils/storage";
import { Address } from "../interface/Address";

interface AddressListProps {
  updateTrigger: boolean;
}

const AddressList: React.FC<AddressListProps> = ({ updateTrigger }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    setAddresses(getSavedAddresses());
  }, [updateTrigger]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Endereços Salvos:</h2>
      <ul className="space-y-2">
        {addresses.length === 0 ? (
          <p>Nenhum endereço salvo.</p>
        ) : (
          addresses.map((addr, index) => (
            <li key={index} className="border p-2 rounded">
              {addr.logradouro}, {addr.bairro}, {addr.localidade} - {addr.uf}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AddressList;
