import { FedaCheckoutButton, FedaCheckoutContainer } from 'fedapay-reactjs';

export default function Fedapay(amount: number) {

  const checkoutButtonOptions = {
    public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY,
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

  const checkoutEmbedOptions = {
    public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY,
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
        <FedaCheckoutButton options={ checkoutButtonOptions } />
        <div style={{ height: 600, width: 600, backgroundColor: '#eee' }}>
          <FedaCheckoutContainer options={ checkoutEmbedOptions } />
        </div>
      </div>
    )
}