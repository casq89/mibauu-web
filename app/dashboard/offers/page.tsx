'use client';

import React from 'react';
import { Button } from '@/components/button';
import { useGetOffers } from '@/services/offers/useGetOffers';
import { useOfferStore } from '@/stores/offers';
import { CardOffer } from './components/card-offer';
import { CardSkeleton } from '@/components/card-skeleton';
import OfferModal from './components/offer-modal';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const {
    data: offers = [],
    isSuccess: isSuccessOffer,
    isLoading: isLoadingOffers,
  } = useGetOffers();
  const loadOffers = useOfferStore((state) => state.loadOffers);

  React.useEffect(() => {
    if (isSuccessOffer && offers) {
      loadOffers(offers);
    }
  }, [isSuccessOffer, offers, loadOffers]);

  const offerList = useOfferStore((state) => state.offers);

  const showProductModal = () => setIsOpenModal(!isOpenModal);

  return (
    <div className="p-3">
      <div className="flex items-center mb-3">
        <h1 className="text-primary mr-3">Promociones</h1>
        <Button label="Crear promoción" onClick={showProductModal} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {isLoadingOffers ? <CardSkeleton long={1} /> : null}
        {offerList?.map(({ name, ...offer }) => (
          <CardOffer key={offer.id} offerName={name} {...offer} />
        ))}
      </div>
      <OfferModal isOpen={isOpenModal} onClose={showProductModal} />
    </div>
  );
}
