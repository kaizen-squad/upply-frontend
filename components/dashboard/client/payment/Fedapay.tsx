import { PaymentInfosType } from '@/app/(client)/client/tasks/[id]/payment/page';
import { FedaCheckoutButton, FedaCheckoutContainer } from 'fedapay-reactjs';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

type FedaPayCompletion = {
  reason?: string;
  transaction?: {
    id?: string | number;
  };
};

type FedaPayWindow = Window & {
  FedaPay?: {
    DIALOG_DISMISSED?: string;
    DIALOG_CANCELLED?: string;
  };
};

 const Fedapay: FC<{amount:number, setError:Dispatch<SetStateAction<string>>, setPaymentInfos:Dispatch<SetStateAction<PaymentInfosType>>, setShowFedapay: Dispatch<SetStateAction<boolean>>}> = ({amount, setPaymentInfos, setError, setShowFedapay}) => {

  const handleOnComplete = (resp: FedaPayCompletion) => {
    const FedaPay = (window as FedaPayWindow).FedaPay;
    const isDismissed = resp?.reason === FedaPay?.DIALOG_DISMISSED;
    const isCancelled = resp?.reason === FedaPay?.DIALOG_CANCELLED;

    if (isDismissed || isCancelled) {
      setShowFedapay(false);
      setError('Paiement annulé ou interrompu par l’utilisateur.');
      return;
    }

    if (resp?.transaction?.id) {
      setPaymentInfos({
        completed: true,
        transaction_id: String(resp.transaction.id)
      });
    } else {
      setError('Le paiement a été interrompu avant confirmation.');
    }

    setShowFedapay(false);
  };

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
    onComplete: handleOnComplete
  };
  
  const FEDAPAY_KEY = process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY;
  useEffect(() => {
    if (!FEDAPAY_KEY) {
      setError('Le module Fedapay est indisponible!');
      setShowFedapay(false);
    }
  }, [FEDAPAY_KEY, setError, setShowFedapay]);

  const checkoutEmbedOptions = {
    public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY,
    transaction: {
      amount: amount,
      description: 'Airtime'
    },
    currency: {
      iso: 'XOF',
    },
    onComplete: handleOnComplete
  };

  if(FEDAPAY_KEY)
    return (
      <div className="w-full h-full">
        <FedaCheckoutButton options={ checkoutButtonOptions } />
        <div className="w-full h-screen fedapay-container" style={{height:"70vh", margin: 'auto'}}>
          <FedaCheckoutContainer options={ checkoutEmbedOptions }  />
        </div>
      </div>
    )
  else return null;
}

export default Fedapay;