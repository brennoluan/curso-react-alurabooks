import { useQuery } from '@tanstack/react-query';
import { obterCategoriaPorCategoria } from '../../http';
import { ICategoria } from '../../interfaces/ICategoria';
import CardLivro from '../CardLivro';
import { ILivro } from '../../interfaces/ILivro';
import './ListaLivros.css';

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const { data: produtos } = useQuery<ILivro[]>({
    queryKey: ['buscaLivrosPorCategoria', categoria],
    queryFn: (): Promise<ILivro[]> => obterCategoriaPorCategoria(categoria),
  });

  return (
    <section className="livros">
      {produtos?.map((livro: ILivro) => (
        <CardLivro livro={livro} key={livro.id} />
      ))}
    </section>
  );
};

export default ListaLivros;
