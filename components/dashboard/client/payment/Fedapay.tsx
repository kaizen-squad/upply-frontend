import { PaymentInfosType } from '@/app/(client)/client/tasks/[id]/payment/page';
import { FedaCheckoutButton, FedaCheckoutContainer } from 'fedapay-reactjs';
import { Dispatch, FC, SetStateAction } from 'react';

 const Fedapay: FC<{amount:number, setError:Dispatch<SetStateAction<string>>, setPaymentInfos:Dispatch<SetStateAction<PaymentInfosType>>, setShowFedapay: Dispatch<SetStateAction<boolean>>}> = ({amount, setPaymentInfos, setError, setShowFedapay}) => {

  const handleOnComplete = (resp: any) => {
    const FedaPay = (window as any).FedaPay;
    const isDismissed = resp?.reason === FedaPay?.DIALOG_DISMISSED;
    const isCancelled = resp?.reason === FedaPay?.DIALOG_CANCELLED;

    if (isDismissed || isCancelled) {
      setShowFedapay(false);
      setError('Paiement annulé ou interrompu par l’utilisateur.');
      console.log('FedaPay dialog closed or cancelled', resp);
      return;
    }

    if (resp?.transaction?.id) {
      setPaymentInfos({
        completed: true,
        transaction_id: resp.transaction.id
      });
    } else {
      setError('Le paiement a été interrompu avant confirmation.');
    }

    setShowFedapay(false);
    console.log(resp.transaction);
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

    return (
      <div className="w-full h-full">
        <FedaCheckoutButton options={ checkoutButtonOptions } />
        <div className="w-full h-screen fedapay-container">
          <FedaCheckoutContainer options={ checkoutEmbedOptions }  />
        </div>
      </div>
    )
}

export default Fedapay;