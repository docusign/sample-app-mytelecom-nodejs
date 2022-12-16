import axios from 'axios';

const api = axios.create();

export const assumptionLiability = async (body) => {
  await login();
  return api.post('/assumptionLiability', body);
};

export const purchaseDevice = async (form) => {
  await login();

  const body = {
    signerName: `${form.firstName} ${form.lastName}`,
    ...form,
  }
  return api.post('/purchaseDevice', body);
}

export const login = async () => {
  const res = await axios.get('/auth/login');
  console.log(res);

  // If user has never logged in before, redirect to consent screen
  if (res.status === 210) {
    window.location = res.data;
  }
};
