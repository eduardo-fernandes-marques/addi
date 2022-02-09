import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet';

export type Props = HelmetProps & {
  lang?: string;
  description?: string;
};

export const Meta: React.FC<Props> = ({ lang, title, children, description, ...props }) => {
  return (
    <Helmet {...props} titleTemplate="%s - Sicredi">
      {lang && <html lang={lang} />}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {children}
    </Helmet>
  );
};
