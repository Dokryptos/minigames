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
import Tim from "@/assets/ciao-bella/fingerprints/Tim.png";
import Eric from "@/assets/ciao-bella/fingerprints/eric.png";
import Inconnu from "@/assets/ciao-bella/fingerprints/icnonnu.png";
import Philippe from "@/assets/ciao-bella/fingerprints/philippe.png";
import Simon from "@/assets/ciao-bella/fingerprints/simon.png";
import Sophie from "@/assets/ciao-bella/fingerprints/sophie.png";

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

  const roomsData: Room[] = [
    {
      id: 1,
      name: "Bureau du gestionnaire de fonds (porte P.11)",
      isSelected: false,
      fingerprints: ["Empreinte A1", "Empreinte A2"],
    },
    {
      id: 2,
      name: "Accès à la zone sécurisée (porte P.2)",
      isSelected: false,
      fingerprints: ["Empreinte B1", "Empreinte B2"],
    },
    {
      id: 3,
      name: "Bureau du directeur (porte P.9)",
      isSelected: false,
      fingerprints: [fingerprint, fingerprint, fingerprint],
    },
    {
      id: 4,
      name: "Salle de réunion 1 (porte P.16)",
      isSelected: false,
      fingerprints: [fingerprint, fingerprint, fingerprint],
    },
    {
      id: 5,
      name: "Accès sécurisé de transfert de fonds (porte P.4)",
      isSelected: false,
      fingerprints: [fingerprint, fingerprint, fingerprint],
    },
  ];

  const suspectsData: Suspect[] = [
    {
      id: 1,
      name: "Tim Lombardo",
      image: Tim,
      fingerprints: ["Empreinte A1", "Empreinte B1"],
    },
    {
      id: 2,
      name: "Sophie Palmero",
      image: Sophie,
      fingerprints: ["Empreinte C1", "Empreinte E2"],
    },
    {
      id: 3,
      name: "Simon Berbre",
      image: Simon,
      fingerprints: ["Empreinte C1", "Empreinte E2"],
    },
    {
      id: 4,
      name: "Philippe Pizzio",
      image: Philippe,
      fingerprints: ["Empreinte A2", "Empreinte D1"],
    },
    {
      id: 5,
      name: "Eric Lombardo",
      image: Eric,
      fingerprints: ["Empreinte B2", "Empreinte D2"],
    },
    {
      id: 6,
      name: "Inconnu",
      image: Inconnu,
      fingerprints: ["Empreinte C2", "Empreinte E1"],
    },
  ];

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

      <div>
        <div>
          <h2>CHOISISSEZ UN LIEU DE PRÉLÈVEMENT</h2>
          <div>
            <div>
              <h1>Bureau du gestionnaire de fonds (porte P.11)</h1>
            </div>
            <div>
              <h1>Accès à la zone sécurisée (porte P.2)</h1>
            </div>
            <div>
              <h1>Bureau du directeur (porte P.9)</h1>
            </div>
            <div>
              <h1>Salle de réunion 1 (porte P.16)</h1>
            </div>
            <div>
              <h1>Accès sécurisé de transfert de fonds (porte P.4)</h1>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Sélectionnez une salle :
          </label>
          <select
            onChange={handleRoomSelect}
            className="p-2 border border-gray-300 rounded-md"
            value={selectedRoomId ?? ""}
          >
            <option value="">Choisir une salle</option>
            {roomsData.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex ">
          <div>
            <div>
              <h1>EMPREINTES</h1>
              <div>
                <img src={fingerprint} alt="fingerprint" />
                <img src={fingerprint} alt="fingerprint" />
                <img src={fingerprint} alt="fingerprint" />
              </div>
            </div>
            <div>
              <h1>CORRESPONDANCES</h1>
              <div></div>
            </div>
          </div>
          <div></div>
          <div></div>
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
