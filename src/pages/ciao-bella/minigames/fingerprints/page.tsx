// import Button from "@/components/button";
// import { Link, useNavigate } from "react-router-dom";
// import useMachine from "@/machine/ciao-bella/use-machine";

// const { send, snapshot } = useMachine();
// const navigate = useNavigate();

// React.useEffect(() => {
//   if (!snapshot.matches({ FLOW: 'OBJECTIVE_1B' })) {
//     navigate('/ciao-bella');
//   }
// }, [snapshot, navigate]);

import React, { useState } from "react";
import fingerprint from "@/assets/ciao-bella/fingerprints/fingerprint.png";
import FingerprintData from "@/data/fingerprints/fingerprint";
import SuspectData from "@/data/fingerprints/suspect";
import AnswerData from "@/data/fingerprints/answer";
import LocationData from "@/data/fingerprints/location";

type Room = {
  id: number;
  name: string;
  isSelected: boolean;
  fingerprints: string[];
};

type Suspect = {
  id: number;
  name: string;
  image: string;
  fingerprints: string[];
};
const Fingerprints: React.FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);

  const handleRoomSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = parseInt(event.target.value);
    setSelectedRoomId(roomId);
  };

  const handleSuspectClick = (suspect: Suspect) => {
    setSelectedSuspect(suspect);
  };
  console.log(selectedRoomId);
  return (
    <div className="flex h-full grow flex-col items-center justify-center gap-8">
      <div>
        <h2>OBJECTIF</h2>
        <h1>Relevé d’empreinte</h1>
      </div>

      <div className=" border-l-white">
        <div className="flex ">
          <div>
            <div>
              <h1>EMPREINTES</h1>
              <div>
                <img src={fingerprint} alt="fingerprint" />
              </div>
            </div>
            <div>
              <h1>CORRESPONDANCES</h1>
              <div></div>
            </div>
          </div>
          <div>
            <div>
              <h2>CHOISISSEZ UN LIEU DE PRÉLÈVEMENT</h2>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold  mb-2">
                Sélectionnez une salle :
              </label>
              <select
                onChange={handleRoomSelect}
                className="p-4 bg-gradient-to-r from-[#AA050E] to-[#E7424B]"
                value={selectedRoomId ?? ""}
              >
                <option value="" className="text-black">
                  Choisir une salle
                </option>
                {LocationData.map((room) => (
                  <option key={room.id} value={room.id} className=" text-black">
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <img src={fingerprint} alt="fingerprint" />
          </div>
          <div>
            <h1>CORRESPONDANCES À VÉRIFIER</h1>
            <button className="p-4 bg-[#FFFFFF33]">
              VÉRIFIER LES CORRESPONDANCES
            </button>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-4">
        <Link to="/ciao-bella">
          <Button variant="secondary">retour</Button>
        </Link>

        <Link
          to="/ciao-bella"
          onClick={() => {
            send({ type: "MINIGAME_FINGERPRINTS_SUCCESS" });
          }}
        >
          <Button>valider</Button>
        </Link>
      </div> */}
    </div>
  );
};

export const Component = Fingerprints;

export default Fingerprints;
