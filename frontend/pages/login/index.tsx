import { Toast } from 'components/alerts/toast-alert/Toast';
import Form from 'components/forms/react-hook-form-wrapper/Form';
import TextField from 'components/inputs/textfield/TextField';
import { useState } from 'react';
import Button from '../../components/buttons/button/Button';
import { login } from '../api/auth';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import Home from '../index';
import { NextPageWithLayout } from '../page';

// TODO : reffactor to use React Query and elogin funcitonality to custom hooks

const Login: NextPageWithLayout = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const loginRes = await login(data);
    setLoading(false);
    if (!loginRes?.ok) {
      setError(loginRes?.message);
    }
  };

  return (
    <div className="min-w-full prose flex flex-col px-[15%] pt-8">
      <h1 className="text-white text-center">Munchies</h1>
      <h2 className="ml-4">Login</h2>
      {error && <Toast variant="filled" severity="error" message={error} />}
      <Form onSubmit={onSubmit} className="px-4 flex flex-col gap-6 ">
        <TextField
          name="email"
          label="Email"
          type="text"
          placeholder="me@email.com"
          onChange={() => setError(null)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          placeholder="**********"
          onChange={() => setError(null)}
        />
        <Button type="submit" label="Login" isLoading={loading} />
      </Form>
    </div>
  );
};

export default Login;

Login.getLayout = page => {
  return (
    <PrimaryLayout>
      <div className="px-4">{page}</div>
    </PrimaryLayout>
  );
};
