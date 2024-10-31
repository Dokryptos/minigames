import Button from './button';

type InventoryProps = {
  boxNumber: number;
  content: string[];
  onClose: () => void;
};
const Inventory = ({ boxNumber, content, onClose }: InventoryProps) => {
  return (
    <div>
      <p className="text-lg">Voici l'inventaire de votre box {boxNumber}.</p>
      <p className="text-lg">
        Un élément semble manquer à votre box ? Contactez-nous à l'adresse{' '}
        <a className="hover:underline" href="mailto:support@detectivebox.fr">
          support@detectivebox.fr
        </a>{' '}
        .
      </p>

      <ul className="my-8 list-outside list-disc space-y-2 pl-5">
        {content.map((item, index) => (
          <li key={index} className="leading-6">
            {item}
          </li>
        ))}
      </ul>

      <Button className="mx-auto" onClick={onClose}>
        Fermer
      </Button>
    </div>
  );
};

export default Inventory;
