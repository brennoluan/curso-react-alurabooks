import { useEffect, useState } from 'react';
import TituloPrincipal from '../../componentes/TituloPrincipal';
import { ICategoria } from '../../interfaces/ICategoria';
import http from '../../http';
import { useParams } from 'react-router-dom';
import Loader from '../../componentes/Loader';

const Categoria = () => {
  const [categoria, setCategoria] = useState<ICategoria>();
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    http
      .get<ICategoria[]>('/categorias', {
        params: {
          slug: params.slug,
        },
      })
      .then((response) => {
        setCategoria(response.data[0]);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <TituloPrincipal texto={categoria?.nome ?? ''} />
    </section>
  );
};

export default Categoria;
