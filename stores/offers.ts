import { Offer } from '@/types/Offers';
import { create } from 'zustand';

type OfferStore = {
  offers: Offer[];
  loadOffers: (categories: Offer[]) => void;
  addOffer: (category: Offer) => void;
  updateOffer: (updatedCategory: Offer) => void;
  deleteOffer: (categoryId: string) => void;
};

export const useOfferStore = create<OfferStore>((set) => ({
  offers: [],
  loadOffers: (offers) => set({ offers }),
  addOffer: (offer) =>
    set((state) => ({
      offers: [offer, ...state.offers],
    })),
  updateOffer: (updatedOffer) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      ),
    })),
  deleteOffer: (offerId) =>
    set((state) => ({
      offers: state.offers.filter((offer) => String(offer.id) !== offerId),
    })),
}));
