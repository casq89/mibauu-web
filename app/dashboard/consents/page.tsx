'use client';
import { NoResults } from '@/components/no-results';
import { TableSekeleton } from '@/components/table-skeleton';
import { ToggleSwitch } from '@/components/toggle-switch/indext';
import { useGetConsents } from '@/services/consents/useGetConsents';
import React from 'react';

export default function Page() {
  const { data: consents, isLoading: isLoadingConsent } = useGetConsents();

  if (isLoadingConsent) return <TableSekeleton />;
  return (
    <div className="p-3">
      <div className="flex items-center mb-3">
        <h1 className="text-primary mr-3">Consentimientos</h1>
      </div>
      {!consents?.length ? (
        <NoResults
          message="No hay consentimientos"
          description="Agrega consentimientos para verlos aquí"
        />
      ) : (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Device ID
                  </th>
                  <th
                    colSpan={2}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Opciones de consentimiento
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {consents.map(({ id, device_id, consent_options }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium">
                      <code className="rounded bg-gray-100 px-1 py-0.5 text-xs text-secondary">
                        {id}
                      </code>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-secondary">
                      {device_id}
                    </td>
                    {consent_options.map(({ name, description, enable }) => (
                      <td
                        key={name}
                        className="px-4 py-3 text-sm text-secondary"
                      >
                        <p className="line-clamp-2 max-w-xl">Nombre: {name}</p>
                        <p className="line-clamp-2 max-w-xl">
                          Descripción: {description}
                        </p>
                        <div className="flex items-center">
                          <span className="mr-5">Estado:</span>{' '}
                          <ToggleSwitch enabled={enable} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
