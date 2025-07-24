'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { InputPassword } from '@/components/input-password';
import { LogoHeader } from '@/components/logo-header';

export default function Page() {
  const handleMock = () => console.debug('Mock');
  const valueMock = 'value';

  return (
    <div className="max-w-sm mx-auto align-middle mt-[100px]  p-5 rounded-xl z-10 bg-white shadow-lg shadow-secondary/50">
      <LogoHeader text="Login 2" />
      <form onSubmit={handleMock}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <Input
            label="Correo electrónico"
            name="user_name"
            id="user_name"
            onChange={handleMock}
            value={valueMock}
            error={valueMock}
          />
          <InputPassword
            label="Contraseña"
            name="password"
            id="password"
            onChange={handleMock}
            value={valueMock}
            error={valueMock}
          />
          <Button label="Iniciar sesión" />
        </div>
      </form>
    </div>
  );
}
