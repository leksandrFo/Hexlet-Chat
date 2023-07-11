import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/notFoundImage.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <img alt={t('notFoundPage.notFound')} className="img-fluid h-25" src={notFoundImage} />
        <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
        <p className="text-muted">
          {t('notFoundPage.goTo')}
          {' '}
          <a href="/">{t('notFoundPage.mainLink')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
