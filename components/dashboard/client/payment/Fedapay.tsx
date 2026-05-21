import { PaymentInfosType } from '@/app/(client)/client/tasks/[id]/payment/page';
import { FedaCheckoutButton, FedaCheckoutContainer } from 'fedapay-reactjs';
import { Dispatch, FC, SetStateAction } from 'react';

 const Fedapay: FC<{amount:number, setPaymentInfos:Dispatch<SetStateAction<PaymentInfosType>>}> = ({amount, setPaymentInfos}) => {

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
      text: `\n`
    },
    onComplete(resp: any) {
      const FedaPay = (window as any).FedaPay;
      if (resp.reason === FedaPay.DIALOG_DISMISSED) {
      } else {
        setPaymentInfos({
          completed:true,
          transaction_id: resp.transaction.id
        });
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
      <div className="w-full h-full">
        <FedaCheckoutButton options={ checkoutButtonOptions } />
        <div className="fedapay-wrapper mt-4">
          <div className="fedapay-embed">
            <FedaCheckoutContainer options={ checkoutEmbedOptions } />
          </div>
        </div>
      </div>
    )
}

export default Fedapay;