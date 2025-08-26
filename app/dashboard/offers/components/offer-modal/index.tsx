'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { toast } from 'react-toastify';

import {
  createOfferDefatulState,
  createOfferValidationSchema,
} from '@/utils/validation-schema';
import { useFormik } from 'formik';
import React from 'react';
import { MAX_FILE_SIZE, VALID_TYPES_PHOTO } from '@/constants/global';
import { DefaultImage } from '@/components/default-image';
import { usePostOffers } from '@/services/offers/usePostOffers';
import { useOfferStore } from '@/stores/offers';

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OfferModal({ isOpen, onClose }: ProductModalProps) {
  const [imageSrc, setImageSrc] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutateAsync: createOffer, isPending: isPendingOffer } =
    usePostOffers();
  const addOfferState = useOfferStore((state) => state.addOffer);

  const formik = useFormik({
    initialValues: createOfferDefatulState,
    validationSchema: createOfferValidationSchema,
    onSubmit: async (formData) => {
      if (!formData.image) {
        toast.error('Debes seleccionar una imagen para la promoción');
        return;
      }
      const [newOffer] = await createOffer(formData);
      if (newOffer.id) {
        addOfferState(newOffer);
        formik.resetForm();
        onClose();
      }
    },
  });

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  bg-black/60 flex items-center justify-center">
      <div className="bg-white  mx-auto rounded-xl shadow-lg p-6">
        <h2 className="text-xl text-secondary text-center mb-4">
          Crear Promoción
        </h2>
        <form
          id="upload-form"
          className="space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpeg, .jpg, .png, .webp"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <span onClick={handleUploadImage}>
            <DefaultImage imageSrc={imageSrc} />
          </span>
          <Input
            label="Nombre"
            name="offerName"
            id="offerName"
            onChange={formik.handleChange}
            value={formik.values.offerName}
            error={formik.errors.offerName}
          />
          <Input
            label="Descripción"
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.errors.description}
          />
          <div className="flex gap-2">
            <Input
              label="Precio"
              name="price"
              id="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              error={formik.errors.price}
            />
          </div>
          <div className="flex justify-around mb-2">
            <Button label="Guardar" isLoading={isPendingOffer} />
            <Button level="secondary" label="Cerrar" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  );
}
