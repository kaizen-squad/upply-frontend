import { Component } from 'react';
import { FedaCheckoutButton, FedaCheckoutContainer } from 'fedapay-reactjs';

export default Fedapay = (amount: number) => {

  checkoutButtonOptions = {
    public_key: proccess.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY,
    transaction: {
      amount: amount,
      description: 'Airtime'
    },
    currency: {
      iso: 'XOF'
    },
    button: {
      class: 'btn btn-primary',
      text: `Payer ${amount} FCFA`
    },
    onComplete(resp: any) {
      const FedaPay = (window as any).FedaPay;
      if (resp.reason === FedaPay.DIALOG_DISMISSED) {
        alert('Vous avez fermé la boite de dialogue');
      } else {
        alert('Transaction terminée: ' + resp.reason);
      }

      console.log(resp.transaction);
    }
  };

  checkoutEmbedOptions = {
    public_key: this.PUBLIC_KEY,
    transaction: {
      amount: amount,
      description: 'Airtime'
    },
    currency: {
      iso: 'XOF',
    }
  };


    return (
      <div>
        <FedaCheckoutButton options={ this.checkoutButtonOptions } />
        <div style={{ height: 600, width: 600, backgroundColor: '#eee' }}>
          <FedaCheckoutContainer options={ this.checkoutEmbedOptions } />
        </div>
      </div>
    )
}