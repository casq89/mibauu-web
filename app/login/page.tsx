'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { InputPassword } from '@/components/input-password';
import { LogoHeader } from '@/components/logo-header';
import { useAuth } from '@/hooks/use-auth';
import {
  loginDefaultState,
  loginValidationSchema,
} from '@/utils/validation-schema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { login, isLoadingAuth } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: loginDefaultState,
    validationSchema: loginValidationSchema,
    onSubmit: async (formData) => {
      const wasLogged = await login(formData);

      if (wasLogged) router.push('/dashboard');
    },
  });

  return (
    <div className="max-w-sm mx-auto align-middle mt-[100px]  p-5 rounded-xl z-10 bg-white shadow-lg shadow-secondary/50">
      <LogoHeader text="Login" />
      <form onSubmit={formik.handleSubmit}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <Input
            label="Correo electrónico"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <InputPassword
            label="Contraseña"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Button label="Iniciar sesión" isLoading={isLoadingAuth} />
        </div>
      </form>
    </div>
  );
}
