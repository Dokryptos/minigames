import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js';
import Input from './input';

const InputPhone = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Input
      type="tel"
      autoComplete="tel"
      placeholder="06 00 00 00 00"
      {...props}
      onInput={(event) => {
        const input = event.target as HTMLInputElement;
        const formattedValue = new AsYouType('FR').input(input.value);

        input.value = formattedValue;

        if (!isValidPhoneNumber(input.value, 'FR')) {
          input.setCustomValidity('Le numéro de téléphone est invalide');
        } else {
          input.setCustomValidity('');
        }

        if (props.onInput) {
          props.onInput(event);
        }
      }}
    />
  );
};

export default InputPhone;
