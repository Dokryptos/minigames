import * as React from 'react';
import Button from '@/components/button';
import { Link, useNavigate } from 'react-router-dom';
import useMachine from '@/machine/ciao-bella/use-machine';

const Safe = () => {
  const { send, snapshot } = useMachine();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!snapshot.matches({ FLOW: 'OBJECTIVE_3C' })) {
      navigate('/ciao-bella');
    }
  }, [snapshot, navigate]);

  return (
    <div className="flex h-full grow flex-col items-center justify-center gap-8">
      <h1>Safe</h1>

      <div className="flex gap-4">
        <Link
          to="/ciao-bella"
          onClick={() => {
            send({ type: 'CLOSE_MODAL' });
          }}
        >
          <Button variant="secondary">retour</Button>
        </Link>

        <Link
          to="/ciao-bella"
          onClick={() => {
            send({ type: 'MINIGAME_SAFE_SUCCESS' });
          }}
        >
          <Button>suivant</Button>
        </Link>
      </div>
    </div>
  );
};

export const Component = Safe;

export default Safe;
