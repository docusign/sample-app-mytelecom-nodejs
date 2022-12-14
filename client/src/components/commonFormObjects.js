import { useTranslation } from 'react-i18next';

export const useValidation = () => {
  const { t } = useTranslation('Common');
  return {
    emailRegExp:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    formCheckFieldRequired: {
      value: true,
      message: t('RequiredFieldError'),
    },
    formCheckNameMaxLength: {
      value: 50,
      message: t('InputTooLongError'),
    },
  };
};
