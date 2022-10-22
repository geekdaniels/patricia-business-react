# Patricia Business React

The Patricia Business Checkout provides a simple and convenient way to accept payment.

It enables merchants easily integrate our payment checkout on frontend applications while also giving their customers the ability to make such payments inline (i.e without leaving the merchant’s application).

<!-- <img src="https://media.giphy.com/media/5oJl2JisUuDfc49CJF/giphy.gif" width="800"/> -->

It can be integrated in three easy steps.

> 📘 Before you start
>
> You should create a free [Patricia Business Account](https://business.mypatricia.co/). We'll provide you with keys that you can use to make your integration.

### Install the checkout package

Add the inline checkout to your website using a script tag, it is delivered through a reliable CDN.

```node
npm install patricia-business-react --save
```

or

```node
yarn add patricia-business-react
```

### Collect customer information

To initiate any payment transaction on the Patricia Business Checkout, you'll need to pass information such as email, first name, last name, amount, currency, etc. Here is the full list of parameters you can pass:

| Name           | Type       | Required | Description                                                                                                                                                                                    |
| -------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public_key     | `String`   | true     | Your public key from your Patricia Dashboard (Test / Live).                                                                                                                                    |
| first_name     | `String`   | true     | The customer’s first name.                                                                                                                                                                     |
| last_name      | `String`   | true     | The customer’s last name.                                                                                                                                                                      |
| email          | `String`   | true     | The customer’s email address                                                                                                                                                                   |
| amount         | `Number`   | true     | The amount to be charged the customer (in the fiat currency)                                                                                                                                   |
| currency       | `String`   | true     | The fiat currency associated with the amount. The supported currencies include `"NGN"`, `"GHC"`, `"KES"`, and `"USD"`.                                                                         |
| payment_method | `String`   | true     | The payment method can be one of `crypto_bitcoin`, `crypto_ethereum` , `crypto_tether` , `crypto_ripple` , `crypto_dogecoin` if the merchant intends to charge their client in cryptocurrency. |
| metadata       | `Object`   | false    | Any further information about the transaction the merchant would like to store and retrieve when verifying the transaction.                                                                    |
| onSuccess      | `Function` | false    | Action to perform after widget is successful                                                                                                                                                   |
| onClose        | `Function` | false    | Action to perform if widget is closed                                                                                                                                                          |
| onError        | `Function` | false    | Action to perform on widget Error                                                                                                                                                              |

The customer information can be retrieved from a form like in the example below:

<!-- ![](https://files.readme.io/0d4329b-code.png 'code.png') -->

> ❗️
>
> Never use your secret key in your frontend application.

### Use the checkout hook
When you have all the details needed to initiate the transaction, the next step is to tie them to the javascript function that passes them to Patricia and displays the checkout.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { usePatriciaCheckout } from 'patricia-business-react';

const CheckoutForm = () => {
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

const App = () => (
  <>
    <CheckoutForm />
  </>
);

ReactDOM.render(<App />, document.body);
```


> 📘
>
> To perform a test transaction, switch to test mode in your Patricia dashboard and get the public key from settings.

#### Important Note

1. The `public_key` field here takes your Patricia public_key which can be found in the dashboard.
2. The `onSuccess` method is called when the transaction is successful.
3. The `onClose` method is called if the user closes the modal without completing payment.
4. The `onError` method is called if an error occurs.
