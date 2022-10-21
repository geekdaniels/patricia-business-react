import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { usePatriciaCheckout } from '../src/index';

const App = () => {
  const initiateCheckout = usePatriciaCheckout();

  const callback = {
    onSuccess: function(data: any) {
      console.log('transaction success =>', data);
    },
    onClose: function(data: any) {
      console.log('Payment widget was closed', data);
    },
    onError: function(error: any) {
      console.error('error =>', error);
    },
  };

  return (
    <div>
      <button
        onClick={() =>
          initiateCheckout({
            public_key: '',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@yahoo.com',
            amount: '1000',
            currency: 'NGN',
            payment_method: 'crypto_bitcoin',
            metadata: {
              payment_device: 'Iphone 6s',
            },
            ...callback,
          })
        }
      >
        Pay with Patricia
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
