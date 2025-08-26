'use client';

import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import {
  offerDefaultState,
  offerValidationSchema,
} from '@/utils/validation-schema';
import { hasChanged } from '@/utils/objects';
import { useConfirmAlert } from '@/hooks/use-confirm-alert';
import { MAX_FILE_SIZE, VALID_TYPES_PHOTO } from '@/constants/global';
import { toast } from 'react-toastify';
import { ThinInput } from '@/components/thin-input';
import { ToggleSwitch } from '@/components/toggle-switch/indext';
import { Button } from '@/components/button';
import { CardOfferProps } from '@/types/Offers';
import { useOfferStore } from '@/stores/offers';
import { usePutOffers } from '@/services/offers/usePutOffers';
import { useDeleteOffers } from '@/services/offers/useDeleteOffers';

export const CardOffer = (offer: CardOfferProps) => {
  const { image: imagen_url } = offer;
  const [canUpdate, setCanUpdate] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(imagen_url);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const defaultState = offerDefaultState(offer);
  const { handleConfirmAlert } = useConfirmAlert();
  const deleteOfferState = useOfferStore((state) => state.deleteOffer);
  const updateOfferState = useOfferStore((state) => state.updateOffer);

  const { mutateAsync: updateOffer, isPending: isPendingUpdate } =
    usePutOffers();
  const { mutateAsync: deleteOffer, isPending: isPendingDelete } =
    useDeleteOffers();

  const handleRemoveProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    handleConfirmAlert({
      title: 'Eliminar promoción',
      message: '¿Estas seguro que deseas eliminar esta promoción?',
      onclick: async () => {
        const response = await deleteOffer(offer.id);
        if (response.success === true) {
          deleteOfferState(String(offer.id));
        }
      },
    });
  };

  const formik = useFormik({
    initialValues: defaultState,
    validationSchema: offerValidationSchema,
    onSubmit: async (offerFormData) => {
      const [offer] = await updateOffer(offerFormData);
      if (offer.id) {
        updateOfferState(offer);
      }
    },
  });

  React.useEffect(() => {
    const offerHasChanged = hasChanged(defaultState, formik.values);
    setCanUpdate(offerHasChanged);
  }, [formik.values, offer, defaultState]);

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target?.files?.length) return;

    const file = event.target.files[0];

    if (file) {
      if (!VALID_TYPES_PHOTO.includes(file.type)) {
        toast.error(
          'Formato de archivo no válido. Por favor, suba una imagen .jpeg, .jpg, .png o .webp.'
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          'El archivo es demasiado grande. El tamaño máximo permitido es de 2 MB.'
        );
        return;
      }
      formik.setFieldValue('image', file);
      const tempUrl = URL.createObjectURL(file);
      setImageSrc(tempUrl);
    }
  };

  const isDisabledSubmit = !canUpdate || isPendingUpdate || isPendingDelete;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
      <form onSubmit={formik.handleSubmit}>
        <div className="h-50 cursor-pointer hover:opacity-80">
          <span onClick={handleUploadImage}>
            <Image
              className="mx-auto"
              alt="offer image"
              width={200}
              height={0}
              src={imageSrc}
              priority
            />
          </span>
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .webp"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="p-4 space-y-1">
          <ThinInput
            label="Nombre"
            id="offerName"
            name="offerName"
            maxLength={100}
            onChange={formik.handleChange}
            value={formik.values.offerName}
          />
          <ThinInput
            label="Descripción"
            id="description"
            name="description"
            maxLength={100}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <ThinInput
            label="Precio $"
            id="price"
            name="price"
            type="number"
            max="100000000"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <div className="flex justify-between">
            <p className="text-sm text-secondary">Habilitado:</p>
            <ToggleSwitch
              enabled={formik.values.enable}
              onToggle={(enable) => formik.setFieldValue('enable', enable)}
            />
          </div>
        </div>
        <div className="flex justify-around mb-2">
          <Button
            level={canUpdate ? 'success' : 'disabled'}
            label="Guardar"
            disabled={isDisabledSubmit}
            isLoading={isPendingUpdate}
          />
          <Button
            level="danger"
            label="Eliminar"
            isLoading={isPendingDelete}
            onClick={handleRemoveProduct}
          />
        </div>
      </form>
    </div>
  );
};
